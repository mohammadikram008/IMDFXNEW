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
                <Link to="/doctor/doctor-dashboard">
                  <i className="fas fa-columns" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/appointments") ? "active bg" : ""
                }
              >
                <Link to="/doctor/appointments">
                  <i className="fas fa-calendar-check" />
                  <span>Appointments</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/my-patients") ? "active bg" : ""
                }
              >
                <Link to="/doctor/my-patients">
                  <i className="fas fa-user-injured" />
                  <span>My Patients</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/account") ? "active bg" : ""
                }
              >
                <Link to="/doctor/account">
                  <i className="fas fa-wallet" />
                  <span>Wallet</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/schedule-timing") ? "active bg" : ""
                }
              >
                <Link to="/doctor/schedule-timing">
                  <i className="fas fa-hourglass-start" />
                  <span>Schedule Timings</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/available-timing") ? "active bg" : ""
                }
              >
                <Link to="/doctor/available-timing">
                  <i className="fas fa-clock" />
                  <span>Available Timings</span>
                </Link>
              </li>
              {/* <li
                className={pathnames.includes("/pages/invoice") ? "active" : ""}
              >
                <Link to="/pages/invoice">
                  <i className="fas fa-file-invoice" />
                  <span>Invoices</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/account") ? "active" : ""
                }
              >
                <Link to="/doctor/account">
                  <i className="fas fa-file-invoice-dollar" />
                  <span>Accounts</span>
                </Link>
              </li> */}
              {/* <li
                className={pathnames.includes("/doctor/review") ? "active" : ""}
              >
                <Link to="/doctor/review">
                  <i className="fas fa-star" />
                  <span>Reviews</span>
                </Link>
              </li> */}
              <li
                className={
                  pathnames.includes("/doctor/chat-doctor") ? "active bg" : ""
                }
              >
                <Link to="/doctor/chat-doctor">
                  <i className="fas fa-comments" />
                  <span>Message</span>
                  <small className="unread-msg">23</small>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/profile-setting") ? "active bg" : ""
                }
              >
                <Link to="/doctor/profile-setting">
                  <i className="fas fa-user-cog" />
                  <span>Profile Settings</span>
                </Link>
              </li>
              {/* <li
                className={
                  pathnames.includes("/doctor/social-media") ? "active" : ""
                }
              >
                <Link to="/doctor/social-media">
                  <i className="fas fa-share-alt" />
                  <span>Social Media</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/doctor-change-password")
                    ? "active"
                    : ""
                }
              >
                <Link to="/doctor/doctor-change-password">
                  <i className="fas fa-lock" />
                  <span>Change Password</span>
                </Link>
              </li> */}
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
