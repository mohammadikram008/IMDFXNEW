import React, { useState } from "react";
import DashboardSidebar from "../sidebar/sidebar.jsx";
import IMG01 from "../../../../assets/images/patient.jpg";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import Footer from "../../../footer.jsx";
import Header from "../../../header.jsx";
import axios from "axios";
const Profile = (props) => {
  const userId = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    image: null, // Add an image field to the form data
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("fom",formData);
    // Create FormData object
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // Make API request using axios
      const response = await axios.post(
        `http://localhost:3005/api/update-patient-profile/${userId}`, data,
       
      );

      console.log("API response:", response.data);
      alert("updated")
      // Handle success, e.g., show a success message
    } catch (error) {
      alert(error)
      console.error("Error making API request:", error);
      // Handle error, e.g., show an error message
    }
  };
  return (
    <div>
      <Header {...props} />
      {/* <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Profile Settings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile Settings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>

            <div className="col-md-6 col-lg-6 col-xl-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row form-row">
                      <div className="col-12 col-md-12">
                        <div className="form-group">
                          <div className="change-avatar">
                            <div className="profile-img">
                              <img src={IMG01} alt="User" />
                            </div>
                            <div className="upload-img">
                              <div className="change-photo-btn">
                                <span>
                                  <i className="fa fa-upload"></i> Upload Photo
                                </span>
                                <input type="file" className="upload" name="image" onChange={handleImageChange} />
                              </div>
                              <small className="form-text text-muted">
                                Allowed JPG, GIF or PNG. Max size of 2MB
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Richard"
                            name="firstName" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Wilson"
                            name="lastName" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Date of Birth</label>
                          <div className="cal-icon">
                            <input
                              type="text"
                              className="form-control datetimepicker"
                              defaultValue="24-07-1983"
                              name="dateOfBirth" onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                     {/* <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Blood Group</label>
                          <select className="form-select form-control">
                            <option>A-</option>
                            <option>A+</option>
                            <option>B-</option>
                            <option>B+</option>
                            <option>AB-</option>
                            <option>AB+</option>
                            <option>O-</option>
                            <option>O+</option>
                          </select>
                        </div>
                      </div>
    */}
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Email ID</label>
                          <input
                            type="email"
                            className="form-control"
                            defaultValue="richard@example.com"
                            name="email" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Mobile</label>
                          <input
                            type="text"
                            defaultValue="+1 202-555-0125"
                            className="form-control"
                            name="mobile" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="806 Twin Willow Lane"
                            name="address" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Old Forge"
                            name="city" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="Newyork"
                            name="state" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="13420"
                            name="zipCode" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="United States"
                            name="country" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                    
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Save Changes
                      </button>
                    </div>
                    <div className="submit-section mx-3">
                    <Link
                      to="/patient/change-password"
                      className="btn btn-primary submit-btn"
                    >
                       Change Password
                    </Link>
                  </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Profile;
