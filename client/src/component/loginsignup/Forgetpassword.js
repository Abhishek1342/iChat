import React from "react";
import { NavLink } from "react-router-dom";
const Forgetpassword = ()=>{
    return(
        <>
        <div className="container">
            <div className="row">
            <div className="col-md-12">
             <div className="offset-md-4 col-md-4">
            <div className="signup">
                    <div className="login-head">
                        Forget Password
                    </div>
                    <form className="from">
                        <div className="form-group">
                            <input type='text' placeholder='Email' className="form-control"></input>
                        </div>  
                        <div className='form-group'>
                        <p className=''>E-mail will be sent to your registered e-mail address</p>
                        </div>                      
                        <div className="form-group">
                            <NavLink to='' className="forgetpassword">Resend-email</NavLink>
                        </div>
                        <div className="form-group loginbtn">
                            <div className='text-center my-1'>
                            <NavLink to="/" className='forgetpassword'>Login/Signup</NavLink>
                            </div>
                            <input type='submit'className="btn btn-primary form-control" value="Send Email"></input>
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
export default Forgetpassword;