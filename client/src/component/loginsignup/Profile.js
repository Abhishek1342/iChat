import React from "react";
const Profile = ()=>{
    return(
        <>
        <div className="container">
           <div className="forgetpass-container">
             <div className="row">
               <div className="col-md-12">
                <div className="offset-md-4 col-md-4">
                 <div className="signup">
                    <div className="login-head">
                        Profile
                    </div>
                 <form className="from">
                    <div className="form-group">
                        <div class="image-upload">
                            <label for="file-input">
                              <img 
                               src="pro-img.jpg" 
                               id="file-img"
                              />
                            </label>
                            <input 
                               id="file-input" 
                               type="file"
                            />
                        </div>
                    </div> 
                    <div className="form-group">
                            <input 
                            type='text'
                             placeholder='Name' 
                             className="form-control">
                            </input>
                    </div> 
                    <div className='form-group'>
                           <input 
                           type='number' 
                           placeholder='Age' 
                           className="form-control">
                           </input>
                    </div>                      
                    <div className="form-group">
                            <select className="form-select">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                    </div>
                    <div className="form-group signupbtn">
                            <input 
                            type='submit' 
                            className="btn btn-primary form-control" 
                            value="Location">
                            </input>
                    </div>
                    <div className="form-group">
                            <input 
                            type='submit'
                            className="btn btn-primary form-control" 
                            value="Upload">
                            </input>
                    </div>
                 </form>
              </div>
          </div>
      </div>
    </div>
 </div>
</div>
        </>
    )
}
export default Profile;