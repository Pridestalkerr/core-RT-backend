import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import axios from 'axios';


// some utils

const getUser = () => {
    const userStr = sessionStorage.getItem('user');

    if (userStr) {
        return JSON.parse(userStr);
    } else {
        return null;
    }
}
 
const getToken = () => {
    return sessionStorage.getItem('token') || null;
}
 
const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}
 
const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
}

const useSignUpForm = (initialValues, callback) => {
    const [inputs, setInputs] = useState(initialValues);
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    }
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}


    
export default () => {

    const register = () => {
        axios.post('https://localhost:5001/api/users/register', {
            email: inputs.email,
            username: inputs.username,
            password: inputs.password
        }).then(response => {
            setUserSession(response.data.token, response.data.username);
            console.log(response, "?????");
            setLoggedIn(true);
        }).catch(error => alert("something went wrong..."));
    };

    const {inputs, handleInputChange, handleSubmit} = useSignUpForm({email: '', username: '', password1: ''}, register);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        const token = getToken();
        if (!token) return;

        console.log(token)

        const headers = { Authorization: `Bearer ${token}` };

        axios.post('https://localhost:5001/api/users/login/verifyToken', {}, {
            headers
        }).then(response => {
            if (response.status != 200) return;
        });

        setLoggedIn(true);

    }, []);

    if (loggedIn) {
        return <Redirect to='/chat'/>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="position-absolute h-100 start-0 bgg2d" style={{"margin-left": "50px"}}></div>
            <div className="position-absolute h-100 start-0 bgg2d" style={{"margin-left": "80px"}}></div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="titleText tc1">
                    Register
                </h1>
                <br/>
                <form className="tc2" onSubmit={handleSubmit}>
                    <label className="d-block">
                        <input type="text" name="email" placeholder="email" className="bgg2 bord1 text-dark" onChange={handleInputChange} />
                    </label>
                    <br/>
                    <label className="d-block">
                        <input type="text" name="username" placeholder="username" className="bgg2 bord1 text-dark" onChange={handleInputChange} />
                    </label>
                    <br/>
                    <label className="d-block">
                        <input type="password" name="password" placeholder="password" className="bgg2 bord1 text-dark" onChange={handleInputChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" className="bgg2 bord1 text-dark lighten" />
                </form>

                <Link to="/login" className="mt-3 d-block w-100 text-decoration-none lighten">
                    <span className="w-100 center tc2"> Login instead </span>
                </Link>
            </div>
        </div>
    );
}