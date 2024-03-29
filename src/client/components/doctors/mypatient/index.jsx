import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {

  IMG02,
  IMG03,
  IMG04,
  IMG05,
  IMG06,
  IMG07,
  IMG08,
  IMG012,
} from "./img";
import IMG01 from "../../../assets/images/profileavatr.png";

import DoctorSidebar from "../sidebar";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import Header from "../../header";
import axios from "axios";

const MypPatient = (props) => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const docId = localStorage.getItem('token');
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
      setAppointments(response.data);
      console.log("mypatient", response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchAppointments();
    // fetchpatientdata();
  }, []);
  return (
    <div>
      <Header {...props} />
      <>
        {/* Breadcrumb */}
        {/* <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">My Patients</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-2">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      My Patients
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div> */}
        {/* /Breadcrumb */}
      </>

      <div className="content">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DoctorSidebar />
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="row row-grid">
                {
                  appointments.map((item, index) => (
                    <div className="col-md-6 col-lg-4 col-xl-3">
                      <div className="card widget-profile pat-widget-profile">
                        <div className="card-body mypatient-card">
                          <div className="pro-widget-content">
                            <div className="profile-info-widget">
                              <Link
                                to="/doctor/patient-profile"
                                className="booking-doc-img"
                              >
                                <img src={IMG01} alt="User" />
                              </Link>
                              <div className="profile-det-info">
                                <h3>
                               
                                  {
                                    item.PatietnDetails.username
                                  }
                                </h3>

                                {/* <div className="patient-details">
                                  <h5>
                                    <b>Patient ID :</b> P0016
                                  </h5>
                                  <h5 className="mb-0">
                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                    Alabama, USA
                                  </h5>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="patient-info">
                            <ul>
                              <li>
                                Phone <span>+1 952 001 8563</span>
                              </li>
                              <li>
                                Age <span>38 Years, Male</span>
                              </li>
                              <li>
                                Blood Group <span>AB+</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }

                {/* 
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG02} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Charlene Reed
                              </Link>
                            </h3>

                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> P0001
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i> North
                                Carolina, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 828 632 9170</span>
                          </li>
                          <li>
                            Age <span>29 Years, Female</span>
                          </li>
                          <li>
                            Blood Group <span>O+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG03} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Travis Trimble
                              </Link>
                            </h3>

                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0002
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i> Maine,
                                USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 207 729 9974</span>
                          </li>
                          <li>
                            Age <span>23 Years, Male</span>
                          </li>
                          <li>
                            Blood Group <span>B+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG012} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Travis Trimble
                              </Link>
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0003
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                Indiana, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 260 724 7769</span>
                          </li>
                          <li>
                            Age <span>32 Years, Male</span>
                          </li>
                          <li>
                            Blood Group <span>A+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG04} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Michelle Fairfax
                              </Link>
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0004
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                Indiana, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 504 368 6874</span>
                          </li>
                          <li>
                            Age <span>25 Years, Female</span>
                          </li>
                          <li>
                            Blood Group <span>B+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG05} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Gina Moore
                              </Link>
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0005
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                Florida, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 954 820 7887</span>
                          </li>
                          <li>
                            Age <span>25 Years, Female</span>
                          </li>
                          <li>
                            Blood Group <span>AB-</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG06} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Gina Moore
                              </Link>
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0006
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                Kentucky, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 315 384 4562</span>
                          </li>
                          <li>
                            Age <span>14 Years, Female</span>
                          </li>
                          <li>
                            Blood Group <span>O-</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG07} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Joan Gardner
                              </Link>
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0007
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                California, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 707 2202 603</span>
                          </li>
                          <li>
                            Age <span>25 Years, Female</span>
                          </li>
                          <li>
                            Blood Group <span>A-</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card widget-profile pat-widget-profile">
                    <div className="card-body">
                      <div className="pro-widget-content">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG08} alt="User" />
                          </Link>
                          <div className="profile-det-info">
                            <h3>
                              <Link to="/doctor/patient-profile">
                                Joan Gardner
                              </Link>
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <b>Patient ID :</b> PT0007
                              </h5>
                              <h5 className="mb-0">
                                <i className="fas fa-map-marker-alt"></i> New
                                Jersey, USA
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="patient-info">
                        <ul>
                          <li>
                            Phone <span>+1 973 773 9497</span>
                          </li>
                          <li>
                            Age <span>28 Years, Male</span>
                          </li>
                          <li>
                            Blood Group <span>O+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default MypPatient;
