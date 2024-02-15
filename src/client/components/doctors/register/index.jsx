import React, { useState, useEffect } from "react";
import { Link ,useHistory} from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import axios from 'axios';

const DoctorRegister = (props) => {
  const history = useHistory();
  const config = "/";
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = "account-page";

    return () => (document.getElementsByTagName("body")[0].className = "");
  }, []);

  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDoctorRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/api/doctorlogin", formData);

      if (response.status === 200) {
        // Registration successful, handle redirection or show a success message
        const token = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("doctorlogin", "doctorlogin");
        // console.log("Doctor registration successful");
        history.push("/");
      } else {
        console.error("Doctor registration failed");
      }
    } catch (error) {
      console.error("Error during doctor registration:", error);
    }
  };

  return (
    <>
      <Header {...props} />
      <div className="content top-space content-login-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header heading-text-logins">
                      <h3>Doctor Login</h3>
                    </div>

                    <form onSubmit={handleDoctorRegistration}>
                      {/* <div className="form-group form-focus">
                        <input
                          type="text"
                          className="form-control floating input-fld"
                          placeholder="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="focus-label">Username</label>
                      </div> */}
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          className="form-control floating input-fld"
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
                          className="form-control floating input-fld"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="focus-label">Password</label>
                      </div>
                      <div className="text-end">
                        <Link to="/registerdoctor" className="forgot-link">
                          Register with us?
                        </Link>
                      </div>
                      <button className="login-btn-login" type="submit">
                        login
                      </button>
                      <div className="login-or">
                        <span className="or-line"></span>
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

export default DoctorRegister;
