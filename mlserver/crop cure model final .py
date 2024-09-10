import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

# Load the dataset
df = pd.read_csv('Crop_Recommendation.csv')

# Check for missing values
print("Missing values in each column:\n", df.isnull().sum())

# Prepare the features and labels
X = df.iloc[:, 0:-1]
y = df.iloc[:, -1]

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33)

# Encode the labels
le = LabelEncoder()
y_train = le.fit_transform(y_train)
y_test = le.transform(y_test)

# Initialize and train the Random Forest model without hyperparameter tuning
rf = RandomForestClassifier()
rf.fit(X_train, y_train)

# Make predictions and evaluate accuracy
y_pred = rf.predict(X_test)
print("Initial Model Accuracy:", accuracy_score(y_test, y_pred))

# Define hyperparameter grid for tuning
param_grid = {
    'n_estimators': [10, 20, 30, 50],
    'max_features': [0.2, 0.4, 0.6, 1.0],
    'max_depth': [4, 8, 10, None],
    'max_samples': [0.5, 0.75, 1.0]
}

# Perform Grid Search CV for hyperparameter tuning
rf_grid = GridSearchCV(estimator=rf, param_grid=param_grid, cv=10, verbose=2, n_jobs=-1)
rf_grid.fit(X_train, y_train)

# Display the best parameters and accuracy
print("Best Parameters:", rf_grid.best_params_)
print("Best Score:", rf_grid.best_score_)

# Define recommendation function using the tuned model
def recommendation(N, P, K, temperature, humidity, pH_value, rainfall):
    features = np.array([[N, P, K, temperature, humidity, pH_value, rainfall]])
    prediction = rf_grid.predict(features)
    print("Predicted Crop:", prediction)
    return prediction[0]

# Test the recommendation function
N = 10
P = 20
K = 10
temperature = 60
humidity = 80
pH_value = 20
rainfall = 20

# Predict the crop using the recommendation function
predicted_crop = recommendation(N, P, K, temperature, humidity, pH_value, rainfall)

# Map the predicted label to crop names
crop_dict = {
    0: 'Apple', 1: 'Banana', 2: 'Blackgram', 3: 'ChickPea', 4: 'Coconut', 5: 'Coffee', 6: 'Cotton',
    7: 'Grapes', 8: 'Jute', 9: 'KidneyBeans', 10: 'Lentil', 11: 'Maize', 12: 'Mango',
    13: 'MothBeans', 14: 'MungBean', 15: 'Muskmelon', 16: 'Orange', 17: 'Papaya',
    18: 'PigeonPeas', 19: 'Pomegranate', 20: 'Rice', 21: 'Watermelon'
}

# Output the recommended crop
if predicted_crop in crop_dict:
    crop = crop_dict[predicted_crop]
    print("{} is the best crop to be cultivated.".format(crop))
else:
    print("Sorry, we could not find any suitable crop for this environment.")

# Save the tuned model
with open('model.pkl', 'wb') as f:
    pickle.dump(rf_grid, f)