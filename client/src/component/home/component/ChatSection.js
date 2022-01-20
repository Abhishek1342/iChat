import React, { useState, useEffect } from "react";
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
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getConversation();
    }, [props.conversation]);
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
                <div className="chatViewer">
                    <Mymessage
                        message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                        status="seen"
                    />
                    <Friendmessage
                        message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage
                        message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage message="hi fdghs  " time="13:40" />
                    <Friendmessage
                        message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage
                        message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Mymessage
                        message="hi hi fdghs dfdgfdg "
                        time="13:40"
                        status="Received"
                    />
                    <Mymessage
                        message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                        status="Sent"
                    />
                    <Mymessage
                        message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Mymessage
                        message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Mymessage
                        message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfddddddddddddddddddddddddddddddkjkjkj  jkdjfkdjfkd fjdkkkkkkkkkdkdjfkjd kfjd fkjdkf dkfjdkfjd kfjdkfjdkjf dkfjdkfjkdjfkd fjdf dkjfkdjfkdjfkd djf kd kd fkjdkf kdjfkdjfdjfkdjhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage
                        message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage
                        message="hi fdghs hsdfhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage
                        message="hi fdghs hsdfghsdg dshfgkdhfg dfhds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                        time="13:40"
                    />
                    <Friendmessage
                        message="hi fdghs hsdffhk khdfkdkfgkdgfg dfdgabhishekdg "
                        time="13:40"
                    />
                </div>
                <div className="bottomMessageTyper">
                    <input
                        className="messageField"
                        type="text"
                        name="chat"
                        placeholder="Write message"
                    />
                    <button type="button" className="btn btn-primary">
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
