import React from "react";
import { Link } from "react-router-dom";
import { doctor_thumb_02, doc_01, doc_02, doc_03 } from "../../imagepath";
import doc1 from '../../../assets/images/doc1.jpg'
const DoctorSidebar = ({ props }) => {
    let pathnames = window.location.pathname;
    return (
        <>
            {/* Profile Sidebar */}
            <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                        <Link to="#" className="booking-doc-img">
                            <img src={doc1} alt="User Image" />
                        </Link>
                        <div className="profile-det-info">
                            <h3>{props && props.name}</h3>
                            {/* John Creister */}
                            <div className="patient-details">
                                <h5 className="text-success">
                                    active
                                </h5>
                                {/* <h5 className="mb-0">
                <i className="fas fa-map-marker-alt"></i> Newyork, USA
              </h5> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                        <style>
                            {`
          .dashboard-menu li:hover{
            background-color:#e9e9e9;
          }
          .bg{
            background-color:#e9e9e9;
          }
          `}
                        </style>
                        <ul>
                            <li
                                className={
                                    pathnames.includes("/doctor/doctor-dashboard") ? "active bg" : ""
                                }
                            >
                                <Link to="/office/office-dashboard">
                                    <i className="fas fa-columns" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li
                                className={
                                    pathnames.includes("/office/appointments") ? "active bg" : ""
                                }
                            >
                                <Link to="/office/appointments">
                                    <i className="fas fa-calendar-check" />
                                    <span>Appointments</span>
                                </Link>
                            </li>
                            <li
                                className={
                                    pathnames.includes("/office/officedoctorrequest") ? "active bg" : ""
                                }
                            >
                                <Link to="/office/officedoctorrequest">
                                    <i className="fas fa-user" />
                                    <span>Doctor Request </span>
                                </Link>
                            </li>
                            <li
                                className={
                                    pathnames.includes("/office/officedoctor") ? "active bg" : ""
                                }
                            >
                                <Link to="/office/officedoctor">
                                    <i className="fas fa-user-injured" />
                                    <span>All Doctors</span>
                                </Link>
                            </li>
                            <li
                                className={
                                    pathnames.includes("/office/account") ? "active bg" : ""
                                }
                            >
                                <Link to="/office/account">
                                    <i className="fas fa-wallet" />
                                    <span>Wallet</span>
                                </Link>
                            </li>


                            <li
                                className={
                                    pathnames.includes("/office/profile")
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link to="/office/profile">
                                    <i className="fas fa-lock" />
                                    <span>Profile Setting</span>
                                </Link>
                            </li>
                            <li className={pathnames.includes("/index-2") ? "active bg" : ""}>
                                <Link to="/login">
                                    <i className="fas fa-sign-out-alt" />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* /Profile Sidebar */}
        </>
    );
};

export default DoctorSidebar;
