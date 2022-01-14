import React, { useEffect, useState } from "react";
import "./commonStyle.css";
// import profile from "";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { currentUserAPI } from "../../../api/AccountApi";

//redux -----------------------------------------------

import { useDispatch, useSelector } from "react-redux";
import hi from "../../../redux/actions/action";

//material ui components ------------------------------

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

// material ui dialog------------------------------------------

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//#######################################################

const useStyles = makeStyles((theme) => ({
    dropdown: {
        zIndex: "2000",
    },
}));

//#######################################################

const HeaderLeft = () => {
    const baseUrl = "http://localhost:5000";
    const token = localStorage.getItem("token");

    const history = useHistory();
    const classes = useStyles();

    // const [reduxState, setRedeuxState] = useState();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

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
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/");
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

    //################## material ui dialog states start #######################################

    const [openDialog, setOpenDialog] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");

    const handleClickOpenDialog = (scrollType) => () => {
        setOpenDialog(true);
        setScroll(scrollType);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openDialog) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openDialog]);

    // API for fetching current user ----------------------------------

    const [fetchedUser, setFetchedUser] = useState();
    const fetchUser = async () => {
        try {
            const res = await currentUserAPI();
            if (res.data.success === true) {
                setFetchedUser({ currentUser: res.data.user });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // API for fetching friend Requests -------------------------------

    const [friendRequest, setFriendRequest] = useState([]);
    const friendRequests = async () => {
        try {
            dispatch(hi(2));
            const res = await axios(`${baseUrl}/api/friendrequest`, {
                headers: { "auth-token": token },
            });
            if (res.data.success === true) {
                setFriendRequest(res.data.friendRequests);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const acceptRequest = async (id) => {
        const accept = await axios.post(
            `${baseUrl}/api/acceptrequest`,
            { friend: id },
            {
                headers: { "auth-token": token },
            }
        );
        if (accept.data.status === 200) {
            console.log(accept.data);
            await friendRequests();
        }
    };
    const cancelRequest = async (id) => {
        const cancel = await axios.post(
            `${baseUrl}/api/cancelrequest`,
            { rejected: id },
            {
                headers: { "auth-token": token },
            }
        );
        if (cancel.data.status === 200) {
            console.log(cancel.data);
            await friendRequests();
        }
    };
    useEffect(() => {
        fetchUser();
        friendRequests();
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="headerContainer">
            <img
                src={fetchedUser?.currentUser?.profileImage}
                className="userProfileImageHeader"
                alt="profile"
            />
            {state?.state}
            {console.log(state)}
            <div className="leftHeaderRightContainer">
                <Button onClick={handleClickOpenDialog("paper")}>
                    <Badge
                        badgeContent={friendRequest.length}
                        color="primary"
                        max={9}
                    >
                        <i className="fas fa-bell iconColor "></i>
                    </Badge>
                </Button>

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
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <i className="fas fa-user-circle iconColor me-3"></i>
                                            My account
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt iconColor me-3"></i>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                {/*-------------------------material ui component end -------------------------*/}
            </div>
            {/*-------------------------material ui DIALOG component START -------------------------*/}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                scroll={scroll}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Notification</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    {friendRequest.map((item) => {
                        console.log(item._id);
                        return (
                            <div
                                className="notificationContainer"
                                key={item._id}
                            >
                                <div className="notificationDetail">
                                    <img
                                        className="userProfileImageHeader"
                                        src={item.profileImage}
                                        alt="profile"
                                    />

                                    <h5 className="notificationName">
                                        {item.name}
                                    </h5>
                                    <p className="notificationType">
                                        sent you friend request
                                    </p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            cancelRequest(item._id);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            acceptRequest(item._id);
                                        }}
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/*-------------------------material ui DIALOG component END -------------------------*/}
        </div>
    );
};

export default HeaderLeft;
