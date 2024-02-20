import React, { useState, useEffect } from "react";

import Header from "../header";
import Footer from "../footer";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TypeAnimation } from "react-type-animation";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const history = useHistory();
  useEffect(() => {
    document.body.classList.add("account-page");

    return () => document.body.classList.remove("account-page");
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatientRegistration = async (e) => {
    e.preventDefault();
    console.log("formData", formData)
    try {
      const response = await axios.post("http://localhost:3005/api/signup", formData);

      if (response.status === 200) {
        // Registration successful, handle redirection or show a success message
        // alert("register successfully")
        history.push("/login");
        console.log("Patient registration successful");
      } else {
        console.error("Patient registration failed");
        alert("register failed")
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during patient registration:", error);
    }
  };

  return (
    <>
      <>
        <Header {...props} />

        <>
          {/* Page Content */}
          <div
            style={{
              height:"100vh"
            }}
          className="content content-login-page fixed-top  top-space  ">
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
                            Patient Register
                          </h3>
                        </div>
                        <form onSubmit={handlePatientRegistration}>
                          <div className="d-flex flex-column gap-2 my-1 ">
                            <label className="focus-label">Username</label>
                            <input
                              type="text"
                              style={{
                                outline: "none"
                              }}
                              placeholder="John Smith"
                              name="username"
                              className="border-bottom border-0  border-secondary  w-100 py-3 px-2 "
                              value={formData.username}
                              onChange={handleInputChange}
                              required

                            />
                          </div>
                          <div className="d-flex flex-column gap-2 my-1 ">
                            <label className="focus-label">Email</label>
                            <input
                              type="email"
                              style={{
                                outline: "none"
                              }}
                              placeholder="infoabc@gmail.com"
                              name="email"
                              className="border-bottom border-0  border-secondary  w-100 py-3 px-2 "
                              value={formData.email}
                              onChange={handleInputChange}
                              required

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
                              placeholder="******"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              required
                            />
                            <span
                                style={{
                                  bottom:"10px",
                                  right:"5px"
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
                              to="/login"
                            >
                              Already have an account?
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
                              Signup
                            </button>
                          </div>
                          <div className="login-or">
                            <span className="span-or text-black ">or</span>
                          </div>

                          <div className="social-login mb-4 my-1 d-flex justify-content-center align-items-center gap-2 ">
                            <button className="facebook px-4 py-2 bg-white  d-flex justify-content-center align-items-center border gap-3 ">
                              <FaFacebook size={20} color="#0E82FD" />
                              <span>Facebook</span>
                            </button>
                            <button className="google px-4 py-2 bg-white  d-flex justify-content-center align-items-center border gap-3">
                              <FcGoogle size={20} />
                              <span>Google</span>
                            </button>
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
    </>
  );
};

export default Register;
