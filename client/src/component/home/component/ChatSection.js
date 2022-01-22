import React, { useState, useEffect, useRef } from "react";
import "./commonStyle.css";
import axios from "axios";
import { getUserById } from "../../../api/AccountApi";
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
                <p>{props.time}</p>
                <p>{props.status}</p>
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

// scroll to bottom-------------------------------------

const ChatSection = (props) => {
    const classes = useStyles();
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
    const [myMessage, setMyMessage] = useState([
        { message: "hi", time: "13:04" },
    ]);
    const submitMessage = (e) => {
        e.preventDefault();
        const time = new Date();
        const messageTime = time.getTime();
        setMyMessage([...myMessage, { message, time: messageTime }]);
        console.log(myMessage);
        setMessage("");
    };

    const chatView = useRef(null);
    const scrollToBottom = () => {
        chatView.current.scrollTop = chatView.current.scrollHeight;
    };

    useEffect(() => {
        getConversation();
    }, [props.conversation]);

    useEffect(() => {
        scrollToBottom();
    }, [myMessage]);
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
                    {myMessage?.map((item, index) => {
                        return (
                            <Mymessage
                                key={index}
                                message={item.message}
                                time={item.time}
                            />
                        );
                    })}
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
