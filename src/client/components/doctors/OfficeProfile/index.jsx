import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorSidebar from "../sidebar/OfficeSidebar";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import Header from "../../header";
import axios from "axios";
import IMG01 from "../../../assets/images/profileavatr.png";

const Profile = (props) => {
  const [offices, setOffices] = useState([]);
  const [formData, setFormData] = useState({
    name: offices.name,
    email: offices.email,
    phone: offices.phone,
    password: offices.password,
    officename: offices.officename,
    officeemail: offices.officeemail,
    officephone: offices.officephone,
    officephone: offices.officewebsite,
    officewebsite: offices.officewebsite,
    officespecialty: offices.officespecialty,
    country: offices.country,
    street: offices.street,
    city: offices.city,
    state: offices.state,
    zipcode: offices.zipcode,
    image: null,
  });
  const officeId = localStorage.getItem('token');

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
    console.log("fom", formData);
    // Create FormData object
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // Make API request using axios
      const response = await axios.post(
        `http://localhost:3005/api/update-office-profile/${officeId}`, data,

      );
      console.log("API response:", response.data);
      // alert("updated")
      // Handle success, e.g., show a success message
    } catch (error) {
      alert(error)
      console.error("Error making API request:", error);
      // Handle error, e.g., show an error message
    }
  };

  const fetchHospital = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/getofficeDetail/${officeId}`);
      setOffices(response.data);
      console.log("Office", response.data);

    } catch (error) {
      console.error('Error fetching mypatient:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHospital();
  }, []);

  return (
    <div>
      <Header {...props} />

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DoctorSidebar />
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
                          <label>Office Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Office name"
                            name="officename"
                            value={formData.officename}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Email ID</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="abc@example.com"
                            value={formData.email}
                            name="email" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Office Phone</label>
                          <input
                            type="text"
                            placeholder="+92 34545566"
                            className="form-control"
                            value={formData.officephone}
                            name="officephone" onChange={handleInputChange}
                          />

                        </div>
                        <div className="form-group">
                          <label>Office Website</label>
                          <input
                            type="text"
                            placeholder="example.com"
                            className="form-control"
                            value={formData.officewebsite}
                            name="officewebsite" onChange={handleInputChange}
                          />

                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>officespecialty</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Operations"
                            value={formData.officespecialty}
                            name="officespecialty" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="city"
                            value={formData.city}
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
                            placeholder="state"
                            value={formData.state}
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
                            placeholder="zipCode"
                            value={formData.zipcode}
                            name="zipcode" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Pakistan"
                            value={formData.country}
                            name="country" onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">

                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn btn-primary login-btn-login"
                        >
                          Save Changes
                        </button>
                      </div>
                      <div className="submit-section mx-3">
                        <Link
                          to="/office/password"
                          className="btn btn-primary login-btn-login"
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
