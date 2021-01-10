import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';



const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/sockets/chat")
    .build();



const Message = ({ msg }) => {

    return (
        <div className="msg p-3">
            <div>
                <span className="d-inline mr-2 tuser"> { getUser() } </span>
                <span className="tdate d-inline"> { new Date(msg.date).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ") } </span>
            </div>
            <div>
                <img className="timg d-inline" src="https://octagram.ro/wp-content/themes/octagram/img/author_dummy.jpg" alt="Paris" width="300" height="300" />
                <span className="tmsg mt-2 d-inline"> { msg.content } </span>
            </div>
        </div>
    );

};


const MessageBox = () => {

    const [value, setValue] = useState("");

    const postMessage = async (event) => {
        event.preventDefault();

        if (!value) return;

        console.log("tryina send this", value);

        try {
            await connection.invoke("SendMessage", {
                "content": value,
            });
        } catch (err) {
            console.log(err);
        }

        // add messages in a buffer until they all recv confirmation

        setValue("");
    };

    return (
        <form onSubmit={ postMessage }>
            <input type="text" className="input bgg3" placeholder="message"
                   value={ value } onChange={ e => setValue(e.target.value) }
            />
        </form>
    );

};

const getUser = () => {
    const userStr = sessionStorage.getItem('user');

    if (userStr) {
        console.log(userStr)
        return userStr;
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


const Chat = () => {

    const [messages, setMessages] = useState([]);

    const [loggedIn, setLoggedIn] = useState(true);

    const addMessage = (msg) => {
        setMessages(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg.reverse() : [msg])]);
    };

    const handleLogout = () => {    
        removeUserSession();
        setLoggedIn(false);
    }

    useEffect(()=> {

        const token = getToken();

        if (!token) {
            setLoggedIn(false);
            return;
        }

        console.log(token)

        const headers = { Authorization: `Bearer ${token}` };

        axios.post('https://localhost:5001/api/users/login/verifyToken', {}, {
            headers
        }).then(response => {
            if (response.status != 200) {
                setLoggedIn(false);
                return;
            }
        });



        connection.on("LatestMessages", (data) => {
            addMessage(data);
        });

        connection.on("ReceiveMessage", (message) => {
            addMessage(message);
        });

        const connect = async () => {
            try {
                await connection.start();
                console.log("Subscribed to socket.")
            } catch (err) {
                console.log(err);
                console.log("Reattempting connection...");
                setTimeout(connect, 5000);
            }
        };

        connection.onclose(connect);
        connect();

    }, []);

    if (!loggedIn) {
        return <Redirect to='/'/>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="position-absolute h-100 end-0" style={{"paddingRight": "50px", "paddingTop": "20px"}}>
                <input type="button" onClick={handleLogout} value="Logout" />
            </div>
            <div className="position-absolute h-100 start-0 bgg2d" style={{"width": "10px", "margin-left": "50px"}}></div>
            <div className="position-absolute h-100 start-0 bgg2d" style={{"width": "10px", "margin-left": "80px"}}></div>
            <div>
                <div id = "msgBox" className="bgg3">
                    { messages.map((msg, index) => <Message msg={msg} />) }
                </div>
                <MessageBox />
            </div>
        </div>
    );

};



export default Chat;