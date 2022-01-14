import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setProfileAPI } from "../../api/AccountApi";
import { toast } from "react-toastify";
const baseUrl = "http://localhost:5000";
const token = localStorage.getItem("token");

const Profile = () => {
    let history = useHistory();
    if (!token) {
        history.push("/");
    }
    const [profile, setProfile] = useState();
    const [file, setFile] = useState();
    // for previewing selected picture;
    const loadFile = function (event) {
        var image = document.getElementById("output");
        const buttonFileUpload = document.getElementById("buttonFileUpload");
        if (event.target.files[0] || event.target.file) {
            setFile(event.target.files[0]);
            console.log(file);
            buttonFileUpload.style.display = "none";
            image.style.display = "block";
            image.src = URL.createObjectURL(event.target.files[0]);
        }
    };
    const onchange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setProfile({ ...profile, [name]: value });
    };

    const getLocation = async (e) => {
        e.preventDefault();
        try {
            if (navigator.geolocation) {
                e.target.innerHTML = "Getting location";
                e.target.disabled = true;
                document.getElementById("submitProfile").disabled = true;
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
                        setProfile({ ...profile, longitude, latitude });
                        e.target.innerHTML = "Got location";
                        e.target.disabled = false;
                        document.getElementById(
                            "submitProfile"
                        ).disabled = false;
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

    const submitSetProfile = async (e) => {
        e.preventDefault();
        e.target.innerHTML = "Submitting...";
        const formData = new FormData();

        if (
            !profile.name ||
            !profile.age ||
            profile.gender === 0 ||
            !profile.gender
        ) {
            return toast.warn("Fill all fields");
        }
        if (!file) {
            return toast.warn("Select profile Image");
        }
        formData.append("name", profile.name);
        formData.append("age", profile.age);
        formData.append("gender", profile.gender);
        formData.append("longitude", profile.longitude);
        formData.append("latitude", profile.latitude);
        formData.append("profileImage", file);

        try {
            const res = await setProfileAPI(formData);
            if (res.data.success) {
                history.push("/home");
                toast.success("Profile Completed Successfully");
            }
        } catch (err) {
            console.log(err);
            toast.error("Profile Completed Successfully");
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
                                    <form
                                        className="from"
                                        encType="multipart/form-data"
                                    >
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
                                                        alt="profile"
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
                                                onChange={onchange}
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
                                                onChange={onchange}
                                            ></input>
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="form-select"
                                                name="gender"
                                                onChange={onchange}
                                            >
                                                <option value="0">
                                                    Select Gender
                                                </option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Others</option>
                                            </select>
                                        </div>
                                        <div className="form-group signupbtn">
                                            <button
                                                type="button"
                                                className="btn btn-primary form-control"
                                                name="location"
                                                onClick={getLocation}
                                            >
                                                Location
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="btn btn-primary form-control"
                                                onClick={submitSetProfile}
                                                id="submitProfile"
                                            >
                                                Submit Profile
                                            </button>
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
