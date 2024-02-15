import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const LoginContainer = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const responseMessage = (response) => {
    console.log(response.credential);
    localStorage.setItem('token', response.credential);
};
const errorMessage = (error) => {
    console.log(error);
};
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("clientlogin", "patientlogin");
        toast.success("Login successful!");
        setEmail("");
        setPassword("");
        history.push("/");
      } else {
        console.error("Login failed");
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  };
  localStorage.removeItem('token');
  localStorage.removeItem('clientlogin');
  localStorage.removeItem('doctorlogin');
  useEffect(() => {
    // Initialize Facebook SDK after component mounts
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: '862482638894435', // Replace with your Facebook App ID
            cookie: true,
            xfbml: true,
            version: 'v10.0',
        });
    };

    // Load Facebook SDK script
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
}, []);
const responseFacebook = (response) => {
  console.log(response);

  // setData({
  //     name: response.name,
  //     email: response.email,
  //     picture: response.picture.data.url,
  // });
  // setPicture(response.picture.data.url);
  // if (response.accessToken) {
  //     setLogins(true);
  //     alert(response.accessToken)
  // } else {
  //     setLogins(false);
  //     alert(response)
  // }
}

  return (
    <>
      <Header {...props} />

      <>
        {/* Page Content */}
        <div className="content content-login-page top-space  ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2  ">
                {/* Login Tab Content */}
                <div className="account-content ">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 col-lg-6 login-right with-shadow">
                      <div className="login-header heading-text-logins">
                        <h3>
                          Login <span>IMDFX</span>
                        </h3>
                      </div>
                      <form onSubmit={handleLogin}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating input-fld"
                            value={email}
                            onChange={handleEmailChange}
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        <div className="form-group form-focus">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control floating input-fld"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <label className="focus-label">Password</label>
                          {/* <span
                            className="field-icon toggle-password"
                            onClick={handleTogglePassword}
                          >
                            {showPassword ? <IoEye /> : <IoIosEyeOff />}
                          </span> */}
                        </div>
                        <div className="text-end">
                          <Link
                            className="forgot-link"
                            to="/pages/forgot-password"
                          >
                            Forgot Password ?
                          </Link>
                        </div>

                        <button
                          className="w-100 login-btn-login"
                          type="submit"
                        >
                          Login
                        </button>
                        <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or">or</span>
                        </div>
                        <div className="row form-row social-login">
                          <div className="col-6">
                            <FacebookLogin
                              appId="1083617942780130"
                              autoLoad={true}
                              fields="name,email,picture"
                              scope="public_profile,email"
                              callback={responseFacebook}
                              // callback={(response) => handleFacebookResponse(response)}
                              icon="fa-facebook"
                              textButton="Sign in with Facebook"
                              cssClass="custom-facebook-button"
                            />
                          </div>
                          <div className="col-6">
                            <GoogleLogin
                              onSuccess={(response) => responseMessage(response)}
                              onError={(error) => errorMessage(error)}
                            />
                          </div>
                        </div>
                        <div className="text-center dont-have">
                          Don’t have an account?{" "}
                          <Link to="/register">Register</Link>
                        </div>
                        <div className="text-center dont-have">
                        Don’t have an account?{" "}
                        <Link to="/doctor/doctor-register"> Doctor</Link>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* /Login Tab Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>

      <Footer {...props} />
      <ToastContainer />
    </>
  );
};

export default LoginContainer;
