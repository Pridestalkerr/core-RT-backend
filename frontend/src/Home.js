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
            <div className="position-absolute h-100 start-0 bgg2d" style={{"width": "10px", "margin-left": "50px"}}></div>
            <div className="position-absolute h-100 start-0 bgg2d" style={{"width": "10px", "margin-left": "80px"}}></div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="titleText tc1">
                    CORE CHAT
                </h1>
                <Link to="/login" className="mt-3 d-block w-100">
                    <button type="button" className="btn btn-light w-100 bgg2 bord1">Login</button>
                </Link>
            </div>
        </div>
    );
}