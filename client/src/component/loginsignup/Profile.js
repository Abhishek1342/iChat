import React, { useState } from "react";
const Profile = () => {
    const [profile, setProfile] = useState();

    const getLocation = async (e) => {
        e.preventDefault();
        try {
            if (navigator.geolocation) {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                };
                function error(err) {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }
                await navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        var crd = pos.coords;
                        setProfile(crd);

                        const location = await fetch(
                            "http://localhost:5000/api/location",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(profile),
                            }
                        );
                        console.log(location);
                    },
                    error,
                    options
                );
            } else {
                return setProfile("Location is not supported in your browser");
            }
            return console.log(profile);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="container">
                <div className="forgetpass-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="offset-md-4 col-md-4">
                                <div className="signup">
                                    <div className="login-head">Profile</div>
                                    <form className="from">
                                        <div className="form-group">
                                            <div className="image-upload">
                                                <label htmlFor="file-input">
                                                    <span className="upload-file-btn">
                                                        +
                                                    </span>
                                                </label>
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    accept="image/*"
                                                    size="2000000"
                                                    name="profileImage"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="form-control"
                                                name="name"
                                            ></input>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                placeholder="Age"
                                                className="form-control"
                                                name="age"
                                                min="1"
                                                max="100"
                                            ></input>
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="form-select"
                                                name="gender"
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Others</option>
                                            </select>
                                        </div>
                                        <div className="form-group signupbtn">
                                            <input
                                                type="submit"
                                                className="btn btn-primary form-control"
                                                value="Location"
                                                name="location"
                                                onClick={getLocation}
                                            ></input>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="submit"
                                                className="btn btn-primary form-control"
                                                value="Upload"
                                            ></input>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;
