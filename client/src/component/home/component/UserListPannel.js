import React, { useState, useEffect } from "react";
import {
    getFilteredUserAPI,
    friendRequestAPI,
    getFriendsAPI,
} from "../../../api/AccountApi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
    filteredUserAction,
    friendsAction,
} from "../../../redux/actions/action";

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
    const [friendList, setFriendList] = useState([]);
    const [friendSearchTerm, setFriendSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const onChangeSearch = (e) => {
        let searchValue = e.target.value;
        setSearchTerm({ search: searchValue });
    };
    const onChangeFriendSearch = (e) => {
        let searchValue = e.target.value;
        setFriendSearchTerm(searchValue);
    };
    // redux ---------------------------------
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

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
            const res = await friendRequestAPI(toUser);
            if (res.data.success === true) {
                toast.success("Successfully send friend request");
            } else {
                toast.warn(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error("Unable to send friend request");
        }
    };

    // API for feaching friend list ---------------------------

    const friends = async () => {
        try {
            let count = 0;
            if (state.friend.length === 0 && count < 2) {
                const res = await getFriendsAPI();
                if (res.data.success === true) {
                    count++;
                    if (res.data.friendList.length > 0) {
                        dispatch(friendsAction(res.data.friendList));
                        setFriendList(res.data.friendList);
                    } else {
                        console.log("No friends");
                    }
                } else {
                    toast.error("Unable to fetch friends");
                    console.log("Some error in fetching the data");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch friends");
        }
    };

    // API for feaching filtered user ---------------------------

    const filterUser = async () => {
        try {
            let count = 0;
            if (state.filteredUser.length === 0 && count < 2) {
                const res = await getFilteredUserAPI();
                if (res.data.success === true) {
                    count++;
                    if (res.data.filteredUser.length > 0) {
                        dispatch(filteredUserAction(res.data.filteredUser));
                        setFilteredUsers(res.data.filteredUser);
                    } else {
                        console.log("No user found");
                    }
                } else {
                    toast.error("Unable to fetch user");
                    console.log("Error in fetching user");
                }
            } else {
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch user");
        }
    };

    useEffect(() => {
        friends();
        filterUser();
    }, []);
    console.log(state);
    // useEffect(() => {
    //     const searchUser = async () => {
    //         try {
    //             const people = await axios.post(
    //                 `${baseUrl}/api/searchuser`,
    //                 searchTerm,
    //                 {
    //                     headers: { "auth-token": token },
    //                 }
    //             );
    //             setSearchResult(people.data.user);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     searchUser();
    // }, [searchTerm]);

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
                                    value={friendSearchTerm}
                                    onChange={onChangeFriendSearch}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="userListContainer">
                                {state.friend
                                    .filter((item) => {
                                        if (item === "") {
                                            return item;
                                        } else if (
                                            item.name
                                                .toLowerCase()
                                                .includes(
                                                    friendSearchTerm.toLowerCase()
                                                )
                                        ) {
                                            return item;
                                        }
                                    })
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
                                {state.filteredUser
                                    .filter((item) => {
                                        if (item === "") {
                                            return item;
                                        } else if (
                                            item.name
                                                .toLowerCase()
                                                .includes(
                                                    searchTerm.search.toLowerCase()
                                                )
                                        ) {
                                            return item;
                                        }
                                    })
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
