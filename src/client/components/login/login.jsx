import React, { useState, useEffect } from "react";
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
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
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
    console.log("cliock");
    // "https://imdfx-newserver-production.up.railway.app/login",
    try {
      const response = await axios.post(
        "https://imdfx-newserver-production.up.railway.app/api/login",
        { email, password },


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
  localStorage.removeItem('officelogin');
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
    console.log("CLICK");
    console.log(response);

    setData({
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogins(true);
      alert(response.accessToken)
    } else {
      setLogins(false);
      alert(response)
    }
  }

  return (
    <>
      <Header {...props} />

      <>
        {/* Page Content */}
        <div
          style={{
            height: "100vh"
          }}
          className="content content-login-page fixed-top top-space  ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2  ">
                {/* Login Tab Content */}
                <div className="account-content ">
                  <div className="row align-items-center justify-content-center">
                    <div style={{
                      padding: "60px 80px",
                      borderRadius: "40px"
                    }} className="col-md-12 col-lg-6 login-right with-shadow">
                      <div className="login-header flex-column gap-2   justify-content-start align-items-start heading-text-logins">
                        <span className="fs-5 fw-medium ">Welcome Back</span>
                        <h3 className="fs-2 fw-bold ">
                          Login <span>IMDFX</span>
                        </h3>
                      </div>
                      <form onSubmit={handleLogin}>
                        <div className="d-flex flex-column gap-2 my-1 ">
                          <label className="focus-label">Email</label>
                          <input
                            type="email"
                            style={{
                              outline: "none"
                            }}
                            className="border-bottom border-0  border-secondary  w-100 py-3 px-2 "
                            value={email}
                            onChange={handleEmailChange}
                          />
                        </div>
                        <div className="d-flex flex-column position-relative  gap-2 my-1 ">
                          <label className="focus-label">Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            style={{
                              outline: "none"
                            }}
                            className="border-bottom border-0  border-secondary  w-100 py-3 px-2 "
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <span
                            style={{
                              bottom: "10px",
                              right: "5px"
                            }}
                            className="field-icon position-absolute toggle-password"
                            onClick={handleTogglePassword}
                          >
                            {showPassword ? <IoEye /> : <IoIosEyeOff />}
                          </span>
                        </div>
                        <div className="text-end my-1">
                          <Link
                            className="forgot-link text-black "
                            to="/pages/forgot-password"
                          >
                            Forgot Password ?
                          </Link>
                        </div>

                        <div className="d-flex justify-content-center my-1  align-items-center ">
                          <button
                            style={{
                              borderRadius: "10px"
                            }}
                            className="login-btn-login w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div className="login-or">
                          <span className="span-or text-black ">or</span>
                        </div>
                        {/* <div className="row form-row social-login">
                          <div className="col-6">
                            <FacebookLogin
                              appId="1083617942780130"
                              autoLoad={true}
                              fields="name,email,picture"
                              scope="public_profile,email"
                              callback={responseFacebook}
                              // callback={(response) => handleFacebookResponse(response)}
                              icon="fa-facebook"
                              // textButton="Sign in with Facebook"
                              cssClass="custom-facebook-button"
                            />
                          </div>
                          <div className="col-6">
                            <GoogleLogin
                              onSuccess={(response) => responseMessage(response)}
                              onError={(error) => errorMessage(error)}
                            />
                          </div>
                        </div> */}
                        <div className="social-login mb-4 my-1 d-flex justify-content-center align-items-center gap-2 ">
                          {/* <button className="facebook px-4 py-2 bg-white  d-flex justify-content-center align-items-center border gap-3 "> */}
                          {/* <FaFacebook size={20} color="#0E82FD" />
                            <span>Facebook</span> */}
                          {/* <FacebookLogin
                              appId="1083617942780130"
                              autoLoad={true}
                              fields="name,email,picture"
                              scope="public_profile,email"
                             callback={responseFacebook}
                              // callback={(response) => handleFacebookResponse(response)}
                              icon="fa-facebook"
                              // textButton="Sign in with Facebook"
                              cssClass="custom-facebook-button"
                            /> */}
                          <FacebookLogin
                            appId="862482638894435"
                            autoLoad={true}
                            fields="name,email,picture"
                            scope="public_profile,email"
                            callback={responseFacebook}
                            icon="fa-facebook"
                            cssClass="custom-facebook-button"
                          />
                          {/* </button> */}
                          {/* <button className="google px-4 py-2 bg-white  d-flex justify-content-center align-items-center border gap-3"> */}
                          {/* <FcGoogle size={20} />
                            <span>Google</span> */}
                          <GoogleLogin
                            onSuccess={(response) => responseMessage(response)}
                            onError={(error) => errorMessage(error)}
                          />
                          {/* </button> */}
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
                    <div style={{
                      padding: "80px",
                      borderRadius: "40px"
                    }} className="col-md-12 col-lg-6 bg-transparent  border-0 login-right with-shadow">
                      <TypeAnimation
                        sequence={[
                          // Same substring at the start will only be typed out once, initially
                          'Find the best Doctors',
                          1000, // wait 1s before replacing "Mice" with "Hamsters"
                          'Find the best Cardiology',
                          1000,
                          'Find the best Dentist',
                          1000,
                          'Find the best Neurologist',
                          1000
                        ]}
                        wrapper="span"
                        speed={10}
                        style={{ fontSize: '5em', display: 'inline-block', color: "white" }}
                        repeat={Infinity}
                      />
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

      <ToastContainer />
    </>
  );
};

export default LoginContainer;
