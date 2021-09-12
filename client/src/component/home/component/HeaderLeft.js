import React from "react";
import "./commonStyle.css";
import profile from "../../../media/profile.webp";

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
        zIndex: "2000",
    },
}));

//#######################################################
const HeaderLeft = () => {
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

    return (
        <div className="headerContainer">
            <img
                src={profile}
                className="userProfileImageHeader"
                alt="profile"
            />
            <div className="leftHeaderRightContainer">
                <Button>
                    <i className="fas fa-bell iconColor "></i>
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
                                        <MenuItem onClick={handleClose}>
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
        </div>
    );
};

export default HeaderLeft;
