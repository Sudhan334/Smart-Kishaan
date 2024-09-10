import pickle
from flask import Flask, request, json
from flask_cors import CORS
import numpy as np
import requests
import pandas as pd
from markupsafe import Markup
import config
from utils.fertilizer import fertilizer_dic 

# Load model for crop recommendation
crop_recommendation_model_path = './model/model.pkl'
crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))

# OpenWeatherMap API for fetching weather data
def weather_fetch(city):
    key = config.open_weather_key
    base_url = "https://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "appid=" + key + "&q=" + city

    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]
        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

app = Flask(__name__)
CORS(app, resources={r"/crop-predict": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/fertilizer-predict": {"origins": "http://localhost:5173"}})

# Route for crop prediction
@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    if request.method == 'POST':
        try:
            # Get data from form
            N = int(request.form['nitrogen'])
            P = int(request.form['phosphorous'])
            K = int(request.form['potassium'])
            ph = float(request.form['ph'])
            rainfall = float(request.form['rainfall'])
            city = request.form.get("city")

            # Fetch weather data if city is provided
            temperature, humidity = None, None
            if city:
                weather = weather_fetch(city)
                if weather:
                    temperature, humidity = weather
                else:
                    return json.dumps({
                        "result": "Error: Unable to fetch weather data for the given city.",
                        "message": "City not found or OpenWeatherMap API error."
                    })

            # Check if temperature and humidity are available
            if temperature is None or humidity is None:
                return json.dumps({
                    "result": "Error: Missing temperature or humidity data.",
                    "message": "Failed to fetch weather data."
                })

            # Create feature list
            feature_list = [N, P, K, temperature, humidity, ph, rainfall]

            # Predict crop
            predict = np.array(feature_list).reshape(1, -1)
            prediction = crop_recommendation_model.predict(predict)

            # Crop dictionary
            crop_dict = {
                0: 'Apple', 1: 'Banana', 2: 'Blackgram', 3: 'ChickPea', 4: 'Coconut', 5: 'Coffee', 6: 'Cotton',
                7: 'Grapes', 8: 'Jute', 9: 'KidneyBeans', 10: 'Lentil', 11: 'Maize', 12: 'Mango', 13: 'MothBeans',
                14: 'MungBean', 15: 'Muskmelon', 16: 'Orange', 17: 'Papaya', 18: 'PigeonPeas', 19: 'Pomegranate',
                20: 'Rice', 21: 'Watermelon'
            }

            # Determine result
            if prediction[0] in crop_dict:
                crop = crop_dict[prediction[0]]
                result = "{}".format(crop)
            else:
                result = "Sorry, we could not find any suitable crop for this environment."

            # Response data
            response = {
                "result": result,
                "feature_list": feature_list,
                "message": "Crop Predicted"
            }

            return json.dumps(response)

        except Exception as e:
            return json.dumps({
                "result": "Error: " + str(e),
                "message": "An error occurred during prediction."
            })


    
@ app.route('/fertilizer-predict', methods=['POST'])
def fert_recommend():
    title = 'Fertilizer Suggestion'

    crop_name = str(request.form['cropname'])
    N = int(request.form['nitrogen'])
    P = int(request.form['phosphorous'])
    K = int(request.form['potassium'])
    # ph = float(request.form['ph'])

    df = pd.read_csv('Data/fertilizer.csv')

    nr = df[df['Crop'] == crop_name]['N'].iloc[0]
    pr = df[df['Crop'] == crop_name]['P'].iloc[0]
    kr = df[df['Crop'] == crop_name]['K'].iloc[0]

    n = nr - N
    p = pr - P
    k = kr - K
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]
    if max_value == "N":
        if n < 0:
            key = 'NHigh'
        else:
            key = "Nlow"
    elif max_value == "P":
        if p < 0:
            key = 'PHigh'
        else:
            key = "Plow"
    else:
        if k < 0:
            key = 'KHigh'
        else:
            key = "Klow"

    response = Markup(str(fertilizer_dic[key]))
    res = {
            "result": response,
            "message": "Recommended cure"
        }

    return json.dumps(res)

    
if __name__ == "__main__":
    app.run(debug=True,port=8000)


