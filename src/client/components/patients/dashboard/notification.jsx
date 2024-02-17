import React, { useEffect, useState } from 'react';
import { client_01, client_02, client_03, client_04 } from '../../imagepath';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Notification() {
  const userId = localStorage.getItem('token');
  const [docAppointment, setDocAppointment] = useState([]);
  const fetchdoctorappointment = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/mydoctor/${userId}`);
      setDocAppointment(response.data);


    } catch (error) {
      console.error('Error fetching appointments:', error);

    }
  };
  useEffect(() => {
    fetchdoctorappointment()

  }, []);
  return (
    <>
      {/* Notifications */}
      <li className="nav-item dropdown noti-nav me-3 pe-0">
        <Link
          to="#"
          className="dropdown-toggle nav-link p-0"
          data-bs-toggle="dropdown"
        >
          <i className="fa-solid fa-bell text-white" /> <span className="badge">{docAppointment && docAppointment.length}</span>
        </Link>
        <div style={{
          top: "50px"
        }} className="dropdown-menu py-3 px-0   rounded-2 notifications dropdown-menu-end ">
          <div className="topnav-dropdown-header w-100 border-dark-subtle  p-2">
            <span style={{
              color:"gray"
            }} className='fw-bold fs-4 '>Notifications</span>
          </div>
          <div className="noti-content">
            <ul className="notification-list">
              <li className="notification-message px-3 my-1  border-dark-subtle  ">
                <Link to="/patient/dashboard">
                  <div className="media d-flex">
                    <div style={{
                      color: "gray"
                    }} className="d-flex flex-column justify-content-center py-1  align-items-start ">
                      <h6 style={{
                        color: "gray"
                      }} className='w-100  d-flex justify-content-between align-items-center  fs-5 '>
                        Travis Tremble{" "}
                        <span className='p-1 bg-success  rounded-circle '></span>
                      </h6>
                      <p style={{
                        fontWeight: "normal"
                      }} className="fw-light">
                        Sent a amount of $210 for his Appointment{" "}
                        <span className="">Dr.Ruby perin </span>
                      </p>
                      <span className="">18.30 PM</span>
                    </div>
                  </div>
                </Link>
              </li>

              <li className="notification-message px-3 my-1  border-dark-subtle  ">
                <Link to="/patient/dashboard">
                  <div className="media d-flex">
                    <div style={{
                      color: "gray"
                    }} className="d-flex flex-column justify-content-center py-1  align-items-start ">
                      <h6 style={{
                        color: "gray"
                      }} className='w-100  d-flex justify-content-between align-items-center  fs-5 '>
                        Travis Tremble{" "}
                        <span className='p-1 bg-success  rounded-circle '></span>
                      </h6>
                      <p style={{
                        fontWeight: "normal"
                      }} className="fw-light">
                        Sent a amount of $210 for his Appointment{" "}
                        <span className="">Dr.Ruby perin </span>
                      </p>
                      <span className="">18.30 PM</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="notification-message px-3 my-1  border-dark-subtle  ">
                <Link to="/patient/dashboard">
                  <div className="media d-flex">
                    <div style={{
                      color: "gray"
                    }} className="d-flex flex-column justify-content-center py-1  align-items-start ">
                      <h6 style={{
                        color: "gray"
                      }} className='w-100  d-flex justify-content-between align-items-center  fs-5 '>
                        Travis Tremble{" "}
                        <span className='p-1 bg-success  rounded-circle '></span>
                      </h6>
                      <p style={{
                        fontWeight: "normal"
                      }} className="fw-light">
                        Sent a amount of $210 for his Appointment{" "}
                        <span className="">Dr.Ruby perin </span>
                      </p>
                      <span className="">18.30 PM</span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </li>
      {/* /Notifications */}
    </>

  );
}

export default Notification;
