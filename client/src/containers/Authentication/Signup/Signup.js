import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../auth.module.css';
import {checkValidity} from '../../../shared/shared';
import * as actions from '../../../store/actions';

const Signup = props => {
    const [formElements, setFromElements] = useState([
        {
            label: 'Your name',
            type: 'text',
            placeholder: 'Enter your name',
            value: '',
            isInvalid: false,
            invalidMsg: 'This field can\'t be empty',
            validationRules: {
                minLength: 1
            }
        },
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            value: '',
            isInvalid: false,
            invalidMsg: 'Please enter a valid email address',
            validationRules: {
                isEmail: true
            }
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            value: '',
            isInvalid: false,
            invalidMsg: 'password must be at least 8 chars long',
            validationRules: {
                minLength: 8
            }
        }
    ])
    const [isFormValid, setFromValid] = useState(false);

    const dispatch = useDispatch()
    const onAuthUser = (userData, isSignup) => dispatch(actions.authUser(userData, isSignup));
    // const error = useSelector(state => state.auth.error);
    // const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const inputChangeHandler = (event, index) => {
        const updatedForm = [...formElements];
        const updatedEl = { ...formElements[index] };
        updatedEl.value = event.target.value;
        updatedEl.isInvalid = checkValidity(updatedEl.validationRules, updatedEl.value);
        updatedForm[index] = updatedEl;

        setFromElements(updatedForm);
        let isValid = true;
        updatedForm.forEach(el => {
            isValid = isValid && !el.isInvalid;
        })
        setFromValid(isValid)
    }
    const signupSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            name: formElements[0].value,
            email: formElements[1].value,
            password: formElements[2].value
        }
        onAuthUser(data, true);
    }
    if(isAuthenticated) {
        return <Redirect to="/create" />
    }
    return (
        <div className={classes.Container}>
            <Card className={classes.Card} >
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontSize: '26px' }}>Sign Up</Card.Title>
                    <Form onSubmit={signupSubmitHandler}>
                        {formElements.map((element, index) => (
                            <Form.Group key={index}>
                                <Form.Label>{element.label}</Form.Label>
                                <Form.Control
                                    isInvalid={element.isInvalid}
                                    type={element.type}
                                    placeholder={element.placeholder}
                                    value={element.value}
                                    onChange={(event) => inputChangeHandler(event, index)}
                                    required></Form.Control>
                                <Form.Control.Feedback type="invalid" style={{color: 'salmon'}}>
                                    {element.invalidMsg}
                                </Form.Control.Feedback>
                            </Form.Group>
                        ))}
                        <Form.Text style={{marginBottom: '5px'}}>
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </Form.Text>
                        <Button disabled={!isFormValid} variant="primary" type="submit" block>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </div>

    );
}

export default Signup;