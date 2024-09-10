import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { Title, Divider } from "../heading/heading.component"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from "../validation-message/validation-message.component"
import { ButtonComponent } from "../button/button.component"


const CropCureForm = ({submitHandler, loading=false})=>{
    const cropSchema = Yup.object({
      
       nitrogen: Yup.number()
       .required('Nitrogen value is required')
    .typeError('Nitrogen must be a number') 
    .min(0, 'Nitrogen value must be at least 0')
    .max(200, 'Nitrogen value must be at most 200')
    , 

  phosphorous: Yup.number()
    .typeError('Phosphorous must be a number')
    .min(0, 'Phosphorous value must be at least 0')
    .max(200, 'Phosphorous value must be at most 200')
    .required('Phosphorous value is required')
    .nullable(false),

  potassium: Yup.number()
    .typeError('Potassium must be a number')
    .min(0, 'Potassium value must be at least 0')
    .max(300, 'Potassium value must be at most 300')
    .required('Potassium value is required')
    .nullable(false),

  cropname: Yup.string()
    .required('Crop name is required')
    .typeError('Nitrogen must be a number') 
    .trim('Crop name cannot include leading or trailing spaces')
    .min(2, 'Crop name must be at least 2 characters')
    .max(50, 'Crop name must be at most 50 characters'),
    })

    const {register, handleSubmit, formState: {errors}} =useForm({
        resolver: yupResolver(cropSchema)
    })
    const submitForm =(data) => {
        // mapping 
        console.log(data)
        submitHandler(data);
    }
    return (<>
        <Container className="my-5">
            <Row>
                <Col sm={12} md={{ offset: 3, span: 6 }}>
                    <Title>Cure Recommendation</Title>
                </Col>
            </Row>
            <Divider />
            <Row className="my-3 pb-5">
                <Col sm={12} md={{ offset: 2, span: 8 }}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Crop
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Enter cropname" {...register("cropname", {required: true, disabled: loading})} />
                                <span className="text-danger">
                                    <em>{errors?.cropname?.message}</em>
                                </span>                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Nitrogen
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter nitrogen content of soil" {...register("nitrogen", {required: true})} />
                                <span className="text-danger">
                                    <em>{errors?.nitrogen?.message}</em>
                                </span>                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Phosphorous
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter phosphorous content of soil" {...register("phosphorous", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.phosphorous?.message}</em>
                                </span>                            
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>
                                Potassium
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Enter potassium content of soil" {...register("potassium", {required: true})}/>
                                <span className="text-danger">
                                    <em>{errors?.potassium?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group className="row mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <ButtonComponent label="Get Cure" type="submit" className="btn-success"/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default CropCureForm