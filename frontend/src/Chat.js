import React, { useState, useEffect } from "react";

import { HubConnectionBuilder } from '@microsoft/signalr';



const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/sockets/chat")
    .build();



const Message = ({ msg }) => {

    return (
        <div className="msg">
            <span> { new Date(msg.date).toLocaleDateString() } </span>
            <span> { msg.content } </span>
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
                id: "21332",
                "content": value,
                "date": "ASdasdsa"
            });
        } catch (err) {
            console.log(err);
        }

        // add messages in a buffer until they all recv confirmation

        setValue("");
    };

    return (
        <form onSubmit={ postMessage }>
            <input type="text" className="input" placeholder="message"
                   value={ value } onChange={ e => setValue(e.target.value) }
            />
        </form>
    );

};


const Chat = () => {

    const [messages, setMessages] = useState([]);

    const addMessage = (msg) => {
        setMessages(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg.reverse() : [msg])]);
    };

    useEffect(()=> {

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

    return (
        <div>
            <div id = "msgBox">
                { messages.map((msg, index) => <Message msg={msg} />) }
            </div>
            <MessageBox />
        </div>
    );

};



export default Chat;