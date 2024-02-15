import React, { useState, useEffect } from "react";

import Header from "../header";
import Footer from "../footer";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = (props) => {
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
console.log("formData",formData)
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
      <Header {...props} />

      <div className="content content-login-page top-space ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header heading-text-logins">
                      <h3>Patient Register</h3>
                    </div>

                    <form onSubmit={handlePatientRegistration}>
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          className="form-control input-fld floating"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="focus-label">Username</label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          className="form-control input-fld floating"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="focus-label">Email</label>
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          className="form-control input-fld floating"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="focus-label">Password</label>
                      </div>
                      <div className="text-end">
                        <Link className="forgot-link" to="/login">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="login-btn-login"
                        type="submit"
                      >
                        Signup
                      </button>
                      <div className="login-or">
                        <span className="or-line" />
                        <span className="span-or">or</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer {...props} />
    </>
  );
};

export default Register;
