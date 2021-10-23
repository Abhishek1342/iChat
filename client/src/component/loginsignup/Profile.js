import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
    let history = useHistory();
    if (!localStorage.getItem("token")) {
        history.push("/");
    }

    const [profile, setProfile] = useState();
    const getLocation = async (e) => {
        e.preventDefault();
        try {
            if (navigator.geolocation) {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 1000,
                };
                function error(err) {
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        var longitude = pos.coords.longitude;
                        var latitude = pos.coords.latitude;
                        console.log({ longitude, latitude });
                        setProfile({ longitude, latitude });
                    },
                    error,
                    options
                );
            } else {
                return setProfile("Location is not supported in your browser");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const sendData = async (e) => {
        e.preventDefault();
        try {
            const location = await fetch("http://localhost:5000/api/location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profile),
            });

            console.log(location);
        } catch (err) {
            console.log(err);
        }
    };

    var loadFile = function (event) {
        var image = document.getElementById("output");
        const buttonFileUpload = document.getElementById("buttonFileUpload");
        if (event.target.files[0] || event.target.file) {
            buttonFileUpload.style.display = "none";
            image.style.display = "block";
            image.src = URL.createObjectURL(event.target.files[0]);
        }
        console.log(event.target.files[0]);
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
                                                    <span
                                                        className="upload-file-btn"
                                                        id="buttonFileUpload"
                                                    >
                                                        +
                                                    </span>
                                                    <img
                                                        id="output"
                                                        width="120px"
                                                        height="120px"
                                                        alt="image"
                                                        title="Click to change picture"
                                                        style={{
                                                            display: "none",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            transition:
                                                                "all 0.3s ease",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </label>
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    accept="image/*"
                                                    size="2000000"
                                                    name="profileImage"
                                                    onChange={loadFile}
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
                                                onClick={sendData}
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
