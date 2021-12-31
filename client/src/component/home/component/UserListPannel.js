import React, { useState, useEffect } from "react";
import profile from "../../../media/profile.webp";
import axios from "axios";
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

//################################################################

const baseUrl = "http://localhost:5000";
let token = localStorage.getItem("token");

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
    const [searchTerm, setSearchTerm] = useState({ search: "" });
    const [searchResult, setSearchResult] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const onChangeSearch = (e) => {
        let searchValue = e.target.value;
        setSearchTerm({ search: searchValue });
    };

    useEffect(() => {
        const searchUser = async () => {
            try {
                const people = await axios.post(
                    `${baseUrl}/api/searchuser`,
                    searchTerm,
                    {
                        headers: { "auth-token": token },
                    }
                );
                setSearchResult(people.data.user);
            } catch (err) {
                console.log(err);
            }
        };
        searchUser();
    }, [searchTerm]);

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

    const sendFriendRequest = async (id) => {
        try {
            const toUser = { toUser: id };
            const frindrequest = await axios.post(
                `${baseUrl}/api/friendrequest`,
                toUser,
                {
                    headers: {
                        "auth-token": token,
                    },
                }
            );
            console.log(frindrequest);
        } catch (err) {
            console.log(err);
        }
    };
    const friends = async () => {
        try {
            const friends = await axios.get(`${baseUrl}/api/friends`, {
                headers: {
                    "auth-token": token,
                },
            });
            console.log(friends.data.friendList);
            if (friends.data.success === 200) {
                if (friends.data.friendList.length() > 0) {
                    setFriendList(friends.data.friendList);
                } else {
                    console.log("No friends");
                }
            } else {
                console.log("Some error in fetching the data");
            }
        } catch (error) {
            console.log(err);
        }
    };
    useEffect(() => {
        friends();
    }, []);
    console.log(friendList);

    const filterFriendRequest = async (item) => {
        try {
            const friendRequest = await axios.get(
                `${baseUrl}/api/friendrequest`,
                {
                    headers: {
                        "auth-token": token,
                    },
                }
            );
            console.log(friendRequest);
        } catch (error) {
            console.log(error);
        }
    };

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

                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <div className="searchContainer">
                                <input
                                    className="searchBox"
                                    type="text"
                                    placeholder="Search Friend"
                                    name="search"
                                    value={searchTerm.search}
                                    onChange={onChangeSearch}
                                />
                            </div>
                            <div className="userListContainer">
                                {searchResult.map((item) => {
                                    return (
                                        <div
                                            className="userListCard"
                                            key={item._id}
                                        >
                                            <img
                                                src={profile}
                                                className="userProfileImage"
                                                alt="user profile"
                                            />
                                            <span className="position-relative top-1 start-1 p-1 bg-success border border-light rounded-circle activeStatus">
                                                <span className="visually-hidden">
                                                    New alerts
                                                </span>
                                            </span>
                                            <div className="userDetailContainer">
                                                <div className="userNameandMessage">
                                                    <h4 className="usersNameHeading">
                                                        {item.name}
                                                    </h4>
                                                    <p className="userMessageAndTime userMessage text-truncate">
                                                        Message sdfkhkjd
                                                        fshkfsdf hdfsdfkd
                                                        dsfhbksdfh dsfhksdh
                                                    </p>
                                                </div>
                                                <div className="MessageTimeAndCount">
                                                    <p className="userMessageAndTime">
                                                        13:40
                                                    </p>
                                                    <span className="mt-1 badge bg-success">
                                                        99
                                                        <span className="visually-hidden">
                                                            unread messages
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <div className="searchContainer">
                                <input
                                    className="searchBox"
                                    type="text"
                                    placeholder="Search Friend"
                                    name="global user search"
                                    value={searchTerm.search}
                                    onChange={onChangeSearch}
                                />
                            </div>
                            <h5 className="peopleAroundYou">
                                People around you
                            </h5>
                            <div className="FriendListContainer">
                                {searchResult
                                    .filter(filterFriendRequest)
                                    .map((item) => {
                                        return (
                                            <div
                                                className="userListCard"
                                                key={item._id}
                                            >
                                                <img
                                                    src={item.profileImage}
                                                    className="userProfileImage"
                                                    alt="user profile"
                                                />
                                                <div className="userDetailContainer">
                                                    <div className="userNameandMessage">
                                                        <h4 className="usersNameHeading findFriendUsersName">
                                                            {item.name}
                                                        </h4>
                                                    </div>
                                                    <div className="MessageTimeAndCount">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                sendFriendRequest(
                                                                    item._id
                                                                );
                                                            }}
                                                        >
                                                            Add Friend
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default UserListPannel;
