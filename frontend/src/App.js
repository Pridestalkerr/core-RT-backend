import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Chat from './Chat';
import Home from './Home';
import Login from './Login';
import Register from './Register';



export default () => {
    return (
        <Router>
            <div className="h-100 w-100">
                <Switch>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}