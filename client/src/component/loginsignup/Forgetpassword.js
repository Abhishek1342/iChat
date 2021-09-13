import React from "react";
import { NavLink } from "react-router-dom";
const Forgetpassword = ()=>{
    return(
        <>
        <div className="container">
           <div className="forgetpass-container">
            <div className="row">
             <div className="offst-md-4 col-md-6">
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