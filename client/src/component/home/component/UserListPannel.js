import React from "react";
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
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
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
                    <AppBar position="static" color="se">
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
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            Item Two
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default UserListPannel;
