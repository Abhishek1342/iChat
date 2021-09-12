import React from "react";
import profile from "../../../media/profile.webp";
//material ui components -----------------------------------------

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
    makeStyles,
    ThemeProvider,
    createTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import SearchUser from "./SearchUser";

//################################################################

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#4D80E4",
        },
        secondary: {
            main: "#f9f9f9",
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffffff",
    },
}));

//################################################################

const UserListPannel = () => {
    //material ui states -----------------------------------------
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    //################################################################

    return (
        <div className="usersContainer">
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Friends" {...a11yProps(0)} />
                            <Tab label="Find Friends" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SearchUser />
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className="userListContainer">
                                <div className="userListCard">
                                    <img
                                        src={profile}
                                        className="userProfileImage"
                                        alt="user profile"
                                    />
                                    <span class="position-absolute top-1 start-1 p-1 bg-success border border-light rounded-circle activeStatus">
                                        <span class="visually-hidden">
                                            New alerts
                                        </span>
                                    </span>
                                    <div className="userDetailContainer">
                                        <div className="userNameandMessage">
                                            <h4 className="usersNameHeading">
                                                Abhishek kumar
                                            </h4>
                                            <p className="userMessageAndTime userMessage text-truncate">
                                                Message sdfkhkjd fshkfsdf
                                                hdfsdfkd dsfhbksdfh dsfhksdh
                                            </p>
                                        </div>
                                        <div className="MessageTimeAndCount">
                                            <p className="userMessageAndTime">
                                                13:40
                                            </p>
                                            <span class="mt-1 badge bg-success">
                                                99
                                                <span class="visually-hidden">
                                                    unread messages
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <h5 className="peopleAroundYou">
                                People around you
                            </h5>
                            <div className="FriendListContainer">
                                <div className="userListCard">
                                    <img
                                        src={profile}
                                        className="userProfileImage"
                                        alt="user profile"
                                    />
                                    <div className="userDetailContainer">
                                        <div className="userNameandMessage">
                                            <h4 className="usersNameHeading findFriendUsersName">
                                                Abhishek kumar
                                            </h4>
                                        </div>
                                        <div className="MessageTimeAndCount">
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                            >
                                                Add Friend
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default UserListPannel;
