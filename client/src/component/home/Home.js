import React, { useState, useEffect } from "react";
import ChatSection from "./component/ChatSection";
import HeaderLeft from "./component/HeaderLeft";
import UserListPannel from "./component/UserListPannel";
import { useHistory } from "react-router-dom";
import openSocket from "socket.io-client";

const Home = () => {
    const history = useHistory();
    if (!localStorage.getItem("token")) {
        history.push("/");
    }

    const [selectedConversation, setSelectedConversation] = useState();
    const selectConversation = (id) => {
        setSelectedConversation(id);
    };
    useEffect(() => {
        openSocket("http://localhost:5000/");
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <HeaderLeft />
                    <UserListPannel setConversation={selectConversation} />
                </div>
                <div className="col-9">
                    <ChatSection conversation={selectedConversation} />
                </div>
            </div>
        </div>
    );
};

export default Home;
