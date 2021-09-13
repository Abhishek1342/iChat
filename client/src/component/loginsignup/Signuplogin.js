import React from 'react';
import {NavLink} from 'react-router-dom';
import "./loginsignup.css";
const Signuplogin=()=>{
    return(
        <>
        <div className="container">
        <div className='loginsignup'>
            <div className="row">
            <div className="col-md-5">
            <div className="signup">
                    <div className="login-head">
                        Login
                    </div>
                    <form className="from">
                        <div className="form-group">
                            <input type='text' placeholder='Username/Email' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <input type='password' placeholder='Password' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <NavLink to='/forgetpassword' className="forgetpassword">Forget password</NavLink>
                        </div>
                        <div className="form-group loginbtn">
                            <input type='submit'className="btn btn-primary form-control" value="Login"></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="offset-md-2 col-md-5">
                <div className="signup">
                <div className="login-head">
                        Signup
                    </div>
                    <form className="from">
                        <div className="form-group">
                            <input type='text' placeholder='Username' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <input type='email' placeholder='Email' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <input type='password' placeholder='Password' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <input type='password' placeholder='Confirm Password' className="form-control"></input>
                        </div>
                        <div className="form-group signupbtn">
                            <input type='submit'className="btn btn-primary form-control" value="Signup"></input>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}
export default Signuplogin;