import React, { useState } from 'react';
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
    sessionStorage.setItem('user', JSON.stringify(user));
}

    
export default () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const submit = (event) => {
        event.persist();

        const val = event.target.value

        axios.post('https://localhost:5001/login', {
            username: val ? event.target.value.username : "",
            password: val ? event.target.value.password : ""
        }).then(response => {
            setUserSession(response.data.token, response.data.user);
            console.log(response, "?????");
            setLoggedIn(true);
        }).catch(error => alert("something went wrong..."));

        event.preventDefault();
    };

    if (loggedIn) {
        return <Redirect to='/chat'/>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="titleText text-light">
                    Login
                </h1>
                <h5 className="text-light">
                    An account will automatically be created for you if provided credentials do not exist.
                </h5>
                <br/>
                <form className="text-light" onSubmit={submit}>
                    <label className="d-block">
                        username:
                        <input type="text" name="name" />
                    </label>
                    <label className="d-block">
                        password:
                        <input type="password" name="password" />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}