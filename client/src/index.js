import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
    //<React.StrictMode>
    //<App/>
    //</React.StrictMode>,
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
