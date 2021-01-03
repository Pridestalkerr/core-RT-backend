import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



export default () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="titleText text-light">
                    CORE CHAT
                </h1>
                <Link to="/login">
                    <button type="button" className="btn btn-light">Login</button>
                </Link>
            </div>
        </div>
    );
}