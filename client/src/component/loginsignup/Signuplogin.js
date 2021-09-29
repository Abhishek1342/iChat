import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./loginsignup.css";
const Signuplogin = () => {
    let history = useHistory();
    const [login, setLogin] = useState({
        usernameEmail: "",
        password: "",
    });

    const [signup, setSignup] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLogin({ ...login, [name]: value });
    };

    const onChangeSignup = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSignup({ ...signup, [name]: value });
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
            });
            const json = await res.json();
            if (!json) {
                console.log("Something wnet wrong");
            }
            if (json.success === true) {
                localStorage.setItem("token", json.authToken);
                history.push("/home");
            } else {
                history.push("/");
                setLogin({ usernameEmail: "", password: "" });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const submitSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signup),
            });
            const json = await res.json();
            if (!json) {
                console.log("Something wnet wrong");
            }
            if (json.success === true) {
                localStorage.setItem("token", json.authToken);
                history.push("/home");
            } else {
                history.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="container">
                <div className="loginsignup">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="signup">
                                <div className="login-head">Login</div>
                                <form className="from">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Username/Email"
                                            className="form-control"
                                            name="usernameEmail"
                                            value={login.usernameEmail}
                                            onChange={onChange}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form-control"
                                            name="password"
                                            value={login.password}
                                            onChange={onChange}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <Link
                                            to="/forgetpassword"
                                            className="forgetpassword"
                                        >
                                            Forget password
                                        </Link>
                                    </div>
                                    <div className="form-group loginbtn">
                                        <input
                                            type="submit"
                                            className="btn btn-primary form-control"
                                            value="Login"
                                            onClick={submitLogin}
                                        ></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="offset-md-2 col-md-5">
                            <div className="signup">
                                <div className="login-head">Signup</div>
                                <form className="from">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            className="form-control"
                                            name="username"
                                            value={signup.username}
                                            onChange={onChangeSignup}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                            name="email"
                                            value={signup.email}
                                            onChange={onChangeSignup}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form-control"
                                            name="password"
                                            value={signup.password}
                                            onChange={onChangeSignup}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            name="cpassword"
                                            value={signup.cpassword}
                                            onChange={onChangeSignup}
                                        ></input>
                                    </div>
                                    <div className="form-group signupbtn">
                                        <input
                                            type="submit"
                                            className="btn btn-primary form-control"
                                            value="Signup"
                                            onClick={submitSignup}
                                        ></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signuplogin;
