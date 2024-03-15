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

import DoctorSidebar from "../sidebar/OfficeSidebar";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import Header from "../../header";
import axios from "axios";

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
const Mydoctor = (props) => {

  const [appointmentRequest, setAppointmentRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const Hos_Id = localStorage.getItem('token');
  const [show, setshow] = useState();
  
  const [count, setCount] = useState(1);
  const fetchAppointments = async () => {
    try {
      // const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/office-doctor-request-details/${Hos_Id}`);
      setAppointmentRequest(response.data);
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
  }, [count]);
  const handleAcceptChange = async (DoctorRequestDetails) => {
    // console.log("appo",DoctorRequestDetails)
    try {
      const response = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/office-accept-doctor-req/${Hos_Id}`, { DoctorRequestDetails });
      // setAppointments(response.data);
      console.log("booking", response)
      toast.success('Accepted successful!');
      setCount(count + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
      toast.error("Error While Accepting");
    }
  }
  const handleClose = () => {
    setshow(false);
  };

  const handleShow = () => {
    setshow(true);
  };

  const handleCencelChange = async (id) => {

    try {
      const response = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/cancel-doctor-request/${id}`);
      console.log("cancel", response)
      setCount(count + 1);
      toast.success('Requst Cancel successful!');
      setLoading(false);
    } catch (error) {
      console.error('Error Cancel Request:', error);
      setLoading(false);
      toast.error("Error While Accepting");
    }
  }
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
        <div className="container">
          <div className="row mt-5">
            {/* <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div> */}
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DoctorSidebar />
              </StickyBox>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="appointments">
                {
                  appointmentRequest && appointmentRequest.length > 0 ?
                    appointmentRequest.map((item, index) => (
                      <div className="appointment-list">
                        <div className="profile-info-widget">
                          <Link
                            to="/doctor/patient-profile"
                            className="booking-doc-img"
                          >
                            <img src={IMG01} alt="User" />
                          </Link>
                          <div className="">
                            <h3>
                              {item.DoctorDetails.name}
                              {/* <Link to="/doctor/patient-profile">{item.username}</Link> */}
                            </h3>
                            <div className="patient-details">
                              <h5>
                                <i className="fas fa-envelope"></i>{" "}
                                {item.DoctorDetails.email}
                              </h5>
                              <h5>
                                <i className="far fa-clock"></i> {item.DoctorDetails.education}
                              </h5>
                              <h5>
                                <i className="far fa-clock"></i> {item.DoctorDetails.specialization}
                              </h5>
                              <h5>
                                <i className="far fa-clock"></i>{item.DoctorDetails.yearofexperience} years
                              </h5>
                              {/* <h5>
                                <i className="fas fa-map-marker-alt"></i> Newyork,
                                United States
                              </h5> */}

                              {/* <h5 className="mb-0">
                                <i className="fas fa-phone"></i> +1 923 782 4575
                              </h5> */}
                            </div>
                          </div>
                        </div>
                        <div className="appointment-action">
                          {/* <Link
                            to="#0"
                            className="btn btn-sm bg-info-light"
                            onClick={handleShow}
                          >
                            <i className="far fa-eye"></i> View
                          </Link> */}
                          <button className="btn btn-sm bg-success-light" onClick={() => handleAcceptChange(item.DoctorRequestDetails)}>
                            <i className="fas fa-check"></i> Accept
                          </button>
                          <button to="#0" className="btn btn-sm bg-danger-light" onClick={() => handleCencelChange(item.DoctorRequestDetails._id)}>
                            <i className="fas fa-times"></i> Cancel
                          </button>
                        </div>
                      </div>
                    ))
                    : 'No Request Yet!'
                }




              </div>
            </div>
            {/* <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div> */}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer {...props} />
    </div>
  );
};

export default Mydoctor;
