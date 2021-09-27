import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginsignup.css";
const Signuplogin = () => {
    const [login, setLogin] = useState({
        usernameEmail: "",
        password: "",
    });
    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLogin({ ...login, [name]: value });
    };
    console.log(login);
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
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form-control"
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                        ></input>
                                    </div>
                                    <div className="form-group signupbtn">
                                        <input
                                            type="submit"
                                            className="btn btn-primary form-control"
                                            value="Signup"
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
