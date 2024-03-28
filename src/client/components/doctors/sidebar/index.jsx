import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { doctor_thumb_02, doc_01, doc_02, doc_03 } from "../../imagepath";
import doc1 from '../../../assets/images/doc1.jpg'
const DoctorSidebar = ({ props }) => {
  let pathnames = window.location.pathname;
  console.log("proDoc",props);

  const [Doctor, setDoctor] = useState([]);
  const doc_id = localStorage.getItem('token');
  const fetchTodayAppointments = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/gettodayappointments/${userId}`);
      const res = await axios.get(`http://localhost:3005/api/check-doctor-office/${doc_id}`);
      setDoctor(response.data);
      
    } catch (error) {
      console.error('Error fetching appointments:', error);
     
    }
  };
  useEffect(() => {
    fetchTodayAppointments();
  }, []);
  const imageUrl = `https://imdfx-newserver-production.up.railway.app/api`;
  // const imageUrl = `https://imdfx-newserver-production.up.railway.app/api/`;
  // const imageUrl = props.image ? `https://imdfx-newserver-production.up.railway.app/${props.image.replace(/\\/g, '/')}` : '';
  console.log("img",imageUrl);
  return (
    <>
      {/* Profile Sidebar */}
      <div className="profile-sidebar">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link to="#" className="booking-doc-img">
              <img src={doc1} alt="User Image" />
              {/* {props.image && <img src={imageUrl} alt="User Image" />} */}
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
                  pathnames.includes("/doctor/schedule-timing") ? "active bg" : ""
                }
              >
                <Link to="/doctor/schedule-timing">
                  <i className="fas fa-hourglass-start" />
                  <span>Booking Timing</span>
                </Link>
              </li>
              <li
                className={
                  pathnames.includes("/doctor/available-timing") ? "active bg" : ""
                }
              >
                <Link to="/doctor/available-timing">
                  <i className="fas fa-clock" />
                  <span>Timing Slot</span>
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
              {/* <li
                className={
                  pathnames.includes("/doctor/chat-doctor") ? "active bg" : ""
                }
              >
                <Link to="/doctor/chat-doctor">
                  <i className="fas fa-comments" />
                  <span>Message</span>
                  <small className="unread-msg">23</small>
                </Link>
              </li> */}
              {/* <li
                className={pathnames.includes("/medicalrecords") ? "active bg" : ""}
              >
                <Link
                  to="/doctor/medicalrecords"
                >
                  <i className="fas fa-file-medical-alt"></i>
                  <span>Medical Report</span>
                </Link>
              </li> */}
              <li
                className={pathnames.includes("/joindoctorinoffice") ? "active bg" : ""}
              >
                <Link
                  to="/doctor/joindoctorinoffice"
                >
                  <i className="fas fa-user"></i>
                  <span>Join as Office</span>
                </Link>
              </li>
              {
                Doctor && Doctor?"": <li
                className={
                  pathnames.includes("/doctor/account") ? "active bg" : ""
                }
              >
                <Link to="/doctor/account">
                  <i className="fas fa-wallet" />
                  <span>Wallet</span>
                </Link>
              </li>
              }
             
              {/* <li
                className={
                  pathnames.includes("/doctor/profile-setting") ? "active bg" : ""
                }
              >
                <Link to="/doctor/profile-setting">
                  <i className="fas fa-user-cog" />
                  <span>Profile Settings</span>
                </Link>
              </li> */}
              {/* <li
                className={
                  pathnames.includes("/doctor/social-media") ? "active" : ""
                }
              >
                <Link to="/doctor/social-media">
                  <i className="fas fa-share-alt" />
                  <span>Social Media</span>
                </Link>
              </li> */}
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
