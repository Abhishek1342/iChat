import React, { useState, useEffect, useRef } from "react";
import "./commonStyle.css";
import { getUserById } from "../../../api/AccountApi";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import openSocket from "socket.io-client";
import { startConversation } from "../../../conversation";
import { base } from "../../../api/EndPoints";
import { useSelector } from "react-redux";

import { newMessageAPI, getMessageAPI } from "../../../api/MessageApi";

//material ui components ------------------------------

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

//#######################################################
const useStyles = makeStyles((theme) => ({
    dropdown: {
        left: "-20px !important",
        top: "15px !important",
        zIndex: "2000",
    },
}));

//######################################################

// My message ----------------

const Mymessage = (props) => {
    return (
        <div className="myMessageContainer">
            <p className="message">{props.message}</p>
            <div className=" timeStamp">
                <p>{props.status}</p>
                <p>{props.time}</p>
            </div>
        </div>
    );
};
// message of friend ----------------
const Friendmessage = (props) => {
    return (
        <div className="friendMessageContainer">
            <p className="message">{props.message}</p>
            <p className=" timeStamp">{props.time}</p>
        </div>
    );
};

const ChatSection = (props) => {
    const classes = useStyles();

    const state = useSelector((state) => state);
    // material ui states -------------------------------------

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    //#########################################################
    const [conversation, setConversation] = useState({});
    const getConversation = async () => {
        try {
            const res = await getUserById(props.conversation);
            if (res.data.success === true) {
                setConversation(res.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [message, setMessage] = useState("");
    const handleMessage = (e) => {
        setMessage(e.target.value);
    };
    const [myMessage, setMyMessage] = useState([{}]);

    //Api call for sending message -------------------------------------

    const submitMessage = async (e) => {
        e.preventDefault();
        const time = new Date();
        setMyMessage([
            ...myMessage,
            {
                text: message,
                date: time,
                receiver: props.conversation,
                status: "sent",
            },
        ]);
        const data = {
            receiver: props.conversation,
            text: message,
        };
        try {
            await newMessageAPI(data);
            socket.current.emit("sendMessage", {
                senderId: state?.currentUser._id,
                recieverId: props.conversation,
                text: message,
            });
        } catch (error) {
            console.log(error);
            toast.error("Unable to send message");
        }
        setMessage("");
    };

    //Api call for fetching all message -------------------------------------

    const getMessage = async () => {
        try {
            const allMessages = await getMessageAPI(props?.conversation);
            if (allMessages.data.success === true) {
                setMyMessage(allMessages.data.messages);
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to get message");
        }
    };
    // console.log(myMessage);
    const chatView = useRef(null);
    const scrollToBottom = () => {
        chatView.current.scrollTop = chatView.current.scrollHeight;
    };

    const [starter, setStarter] = useState();
    const spinStarter = () => {
        const random = Math.floor(Math.random() * startConversation.length);

        setStarter(startConversation[random].text);
    };

    useEffect(() => {
        getConversation();
        getMessage();
        spinStarter();
    }, [props?.conversation]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        scrollToBottom();
    }, [myMessage]);

    //################### SOCKET IO ##################
    const socket = useRef();
    const [arrivedMessage, setArrivedMessage] = useState({});
    useEffect(() => {
        socket.current = openSocket(base);
        socket.current.on("getMessage", (data) => {
            setArrivedMessage({
                text: data.text,
                date: Date.now(),
                receiver: state?.currentUser._id,
            });
        });
    }, []);

    useEffect(() => {
        arrivedMessage && setMyMessage((prev) => [...prev, arrivedMessage]);
    }, [arrivedMessage]);

    useEffect(() => {
        socket.current.emit("newUser", state?.currentUser._id);
        socket.current.on("getUser", (users) => {
            // console.log(users);
        });
    }, [state?.currentUser._id]);

    return (
        <div>
            <div className="headerContainer">
                <div className="d-flex flex-row align-items-center">
                    {/* <i className="fas fa-user-circle iconColor avtar"></i> */}
                    <img
                        className="conversationProfileImage"
                        src={conversation.profileImage}
                        alt={conversation.name}
                    />
                    <h4 className="usersName">{conversation.name}</h4>
                </div>
                <div className="leftHeaderRightContainer">
                    {/*-----------------material ui components-------------------------*/}
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <i className="fas fa-ellipsis-v iconColor"></i>
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        className={classes.dropdown}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom"
                                            ? "center top"
                                            : "center bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                Clear Chat
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                Delete Chat
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                Unfriend
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                Block
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    {/*-------------------------material ui component end -------------------------*/}
                </div>
            </div>

            <div className="chatContainer">
                <div className="chatViewer" ref={chatView}>
                    {myMessage.length > 0 ? (
                        myMessage.map((item, index) => {
                            if (item.receiver === props.conversation) {
                                return (
                                    <Mymessage
                                        key={index}
                                        message={item.text}
                                        time={format(item.date)}
                                        status={item.status}
                                    />
                                );
                            } else {
                                return (
                                    <Friendmessage
                                        key={index}
                                        message={item.text}
                                        time={format(item.date)}
                                    />
                                );
                            }
                        })
                    ) : (
                        <div className="noMessageContainer">
                            <p>Start conversation by asking {starter}</p>
                        </div>
                    )}
                </div>
                <form className="bottomMessageTyper">
                    <input
                        className="messageField"
                        type="text"
                        name="chat"
                        placeholder="Write message"
                        onChange={handleMessage}
                        value={message}
                    />
                    <button
                        type="submit"
                        onClick={submitMessage}
                        className="btn btn-primary"
                    >
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatSection;
