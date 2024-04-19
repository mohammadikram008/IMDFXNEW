import React, { useState,useEffect } from "react";
import DashboardSidebar from "../sidebar/index";
import { Link } from "react-router-dom";
import Header from "../../header";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
const Password = (props) => {
  const doc_Id = localStorage.getItem('token');

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request using axios
      const response = await axios.post(
        `https://imdfx-newserver-production.up.railway.app/api/change-doctor-password/${doc_Id}`, // Replace with your actual backend URL
        passwordData
      );

      console.log("API response:", response.data);
      toast.success("Password change successful!");
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error("Error making API request:", error);
      toast.error("change password failed. Please try again.");
      // Handle error, e.g., show an error message
    }
  };
  const [Doctor, setDoctor] = useState([]);
  const fetchpatientdata = async () => {
    try {
     
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getDoctorDetail/${docId}`);
      setDoctor(response.data);
      const doctordata = response.data
      // setDoctorStatus(doctordata.status);
      // console.log("status", doctordata.status);

    } catch (error) {
      console.error('Error fetching getDoctorDetail:', error);
  
    }
  };

  useEffect(() => {
    fetchpatientdata()


  }, []);
  return (
    <div>
      <Header {...props} />
      <ToastContainer />
      <div className="content">
        <div className="container-fluid mt-5">
          <div className="row mt-5">
            <div className="col-md-2 col-lg-2 col-xl-2"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <DashboardSidebar props={Doctor} />
            </div>

            <div className="col-md-6 col-lg-6 col-xl-6 mt-5">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="oldPassword"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
