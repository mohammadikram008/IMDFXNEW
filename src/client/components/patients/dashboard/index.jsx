/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DashboardSidebar } from "./sidebar/sidebar.jsx";
// import { Tab, Tabs } from "react-bootstrap";
import StickyBox from "react-sticky-box";
import { Icon01, Icon02, Icon03 } from "./img";
import {
  IMG01,
  IMG02,
  IMG03,
  IMG04,
  IMG05,
  IMG06,
  IMG07,
  IMG08,
  IMG09,
  IMG10,
  doc_1
} from "./img";
import ProgressBar from "react-customizable-progressbar";
import Dashboard1 from "../../../assets/images/specialities/pt-dashboard-01.png";
import Dashboard2 from "../../../assets/images/specialities/pt-dashboard-02.png";
import Dashboard3 from "../../../assets/images/specialities/pt-dashboard-03.png";
import Dashboard4 from "../../../assets/images/specialities/pt-dashboard-04.png";
import Graph1 from "../../../assets/images/shapes/graph-01.png";
import Graph2 from "../../../assets/images/shapes/graph-02.png";
import Graph3 from "../../../assets/images/shapes/graph-03.png";
import Graph4 from "../../../assets/images/shapes/graph-04.png";

import Footer from "../../footer";
import Header from "../../header.jsx";

const Dashboard = (props) => {
  const [count, setCount] = useState(1, 2, 3, 4);
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState([]);
  const [docAppointment, setDocAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mypatient, setMyPatient] = useState([]);
  const userId = localStorage.getItem('token');
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const handleCardClick = (index, price) => {
    setSelectedCard(index);
    setSelectedAmount(price);
  };
  const paymentsCards = [
    {
      id: 1,
      price: 200,
    },
    {
      id: 2,
      price: 300,
    },
    {
      id: 3,
      price: 400,
    },
    {
      id: 4,
      price: 500,
    },
    {
      id: 5,
      price: 600,
    },
    {
      id: 6,
      price: 800,
    },
    {
      id: 7,
      price: 1000,
    },
    {
      id: 8,
      price: 1200,
    },
  ];
  const fetchAppointments = async () => {
    try {


      const response = await axios.get(`http://localhost:3005/api/appointments/${userId}`);
      setAppointments(response.data);
      console.log("Appointment", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  const fetchpatientdata = async () => {

    try {


      const response = await axios.get(`http://localhost:3005/api/getpatient/${userId}`);
      setPatient(response.data);
      console.log("patient", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  const fetchdoctorappointment = async () => {

    try {
      const response = await axios.get(`http://localhost:3005/api/mydoctor/${userId}`);
      setDocAppointment(response.data);
      console.log("setDocAppointment", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchdoctorappointment()
    fetchAppointments();
    fetchpatientdata();
  }, []);

  // if (loading) {
  //   // You can add a loading indicator here if needed
  //   return <p>Loading...</p>;
  // }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     key: 1,
  //   };
  //   this.handleSelect = this.handleSelect.bind(this);
  // }

  return (
    <>
      <Header {...props} />
      {/* <!-- Breadcrumb --> */}
      {/* <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Dashboard</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- /Breadcrumb -->     */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5">

            </div>
            <div style={{
              height: "80vh",
              // backgroundColor: "#e9eae7",
<<<<<<< Updated upstream
              marginTop:"3rem"
=======
              marginTop: "3rem"
>>>>>>> Stashed changes

            }} className="col-md-2 col-lg-2 rounded-5  col-xl-2 theiaStickySidebar pt-5">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar props={patient} />
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 mt-5">
              <div>
                {/* <div className="row">
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img src={Dashboard1} width={55} />
                        </div>
                        <h5>Heart Rate</h5>
                        <h6>
                          12 <sub>bpm</sub>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img src={Dashboard2} width={55} />
                        </div>
                        <h5>Body Temperature</h5>
                        <h6>
                          18 <sub>C</sub>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img src={Dashboard3} width={55} />
                        </div>
                        <h5>Glucose Level</h5>
                        <h6>70 - 90</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img src={Dashboard4} width={55} />
                        </div>
                        <h5>Blood Pressure</h5>
                        <h6>
                          202/90 <sub>mg/dl</sub>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="card-body d-flex align-items-center gap-3 mb-0  py-0">
                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget dct-border-rht">
                      <ProgressBar
                        width={8}
                        radius={40}
                        progress={75}
                        rotate={-183}
                        strokeWidth={6}
                        strokeColor="#da3f81"
                        strokeLinecap="square"
                        trackStrokeWidth={8}
                        trackStrokeColor="#e6e6e6"
                        trackStrokeLinecap="square"
                        pointerRadius={0}
                        initialAnimation={true}
                        transition="1.5s ease 0.5s"
                        trackTransition="0s ease"
                      >
                        <div className="indicator-volume">
                          <img
                            src={Icon01}
                            className="img-fluid "
                            alt="Patient"
                            style={{
                              position: "relative",
                              top: "-83px",
                              left: "45px",
                            }}
                          />
                        </div>
                      </ProgressBar>
                      <div
                        className="dash-widget-info"
                        style={{ position: "relative", top: "-18px" }}
                      >
                        <h6>Pending Appointments</h6>
                        <h3>{mypatient && mypatient.length}</h3>
                        <p className="text-muted">Till Today</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget dct-border-rht">
                      <ProgressBar
                        width={8}
                        radius={40}
                        progress={65}
                        rotate={-183}
                        strokeWidth={6}
                        strokeColor="#68dda9"
                        strokeLinecap="square"
                        trackStrokeWidth={8}
                        trackStrokeColor="#e6e6e6"
                        trackStrokeLinecap="square"
                        pointerRadius={0}
                        initialAnimation={true}
                        transition="1.5s ease 0.5s"
                        trackTransition="0s ease"
                      >
                        <div className="indicator-volume">
                          <img
                            src={Icon02}
                            className="img-fluid"
                            alt="Patient"
                            style={{
                              position: "relative",
                              top: "-83px",
                              left: "45px",
                            }}
                          />
                        </div>
                      </ProgressBar>
                      <div
                        className="dash-widget-info"
                        style={{ position: "relative", top: "-18px" }}
                      >
                        <h6>Today Appoinments</h6>
                        <h3>160</h3>
                        <p className="text-muted">06, Nov 2019</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="dash-widget">
                      <ProgressBar
                        width={8}
                        radius={40}
                        progress={50}
                        rotate={-183}
                        strokeWidth={6}
                        strokeColor="#1b5a90"
                        strokeLinecap="square"
                        trackStrokeWidth={8}
                        trackStrokeColor="#e6e6e6"
                        trackStrokeLinecap="square"
                        pointerRadius={0}
                        initialAnimation={true}
                        transition="1.5s ease 0.5s"
                        trackTransition="0s ease"
                      >
                        <div className="indicator-volume">
                          <img
                            src={Icon03}
                            className="img-fluid"
                            alt="Patient"
                            style={{
                              position: "relative",
                              top: "-83px",
                              left: "45px",
                            }}
                          />
                        </div>
                      </ProgressBar>
                      <div
                        className="dash-widget-info"
                        style={{ position: "relative", top: "-18px" }}
                      >
                        <h6>Appoinments</h6>
                        <h3>{appointments && appointments.length}</h3>
                        <p className="text-muted">06, Apr 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
                {  /*  <div className="row patient-graph-col">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Graph Status</h4>
                      </div>
                      <div className="card-body pt-2 pb-2 mt-1 mb-1">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                            <Link
                              to="#"
                              className="graph-box"
                              data-bs-target="#graph1"
                            >
                              <div>
                                <h4>BMI Status</h4>
                              </div>
                              <div className="graph-img">
                                <img src={Graph1} />
                              </div>
                              <div className="graph-status-result mt-3">
                                <span className="graph-update-date">
                                  Last Update 6d
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                            <Link
                              to="#"
                              className="graph-box pink-graph"
                              data-bs-target="#graph2"
                            >
                              <div>
                                <h4>Heart Rate Status</h4>
                              </div>
                              <div className="graph-img">
                                <img src={Graph2} />
                              </div>
                              <div className="graph-status-result mt-3">
                                <span className="graph-update-date">
                                  Last Update 2d
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                            <Link
                              to="#"
                              className="graph-box sky-blue-graph"
                              data-bs-target="#graph3"
                            >
                              <div>
                                <h4>FBC Status</h4>
                              </div>
                              <div className="graph-img">
                                <img src={Graph3} />
                              </div>
                              <div className="graph-status-result mt-3">
                                <span className="graph-update-date">
                                  Last Update 5d
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-graph-box">
                            <Link
                              to="#"
                              className="graph-box orange-graph"
                              data-bs-target="#graph4"
                            >
                              <div>
                                <h4>Weight Status</h4>
                              </div>
                              <div className="graph-img">
                                <img src={Graph4} />
                              </div>
                              <div className="graph-status-result mt-3">
                                <span className="graph-update-date">
                                  Last Update 3d
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    */}
              </div>
              <div className="container  my-0  ard px-4">
                <h4 className="h3 my-3 text-primary-emphasis fw-bolder">
                  Buy Credits
                </h4>
                <div
                  style={{
                    backgroundColor: "#FEBEBE",
                  }}
                  className="container my-3 d-flex  rounded-4 justify-content-between  align-items-center  p-4 "
                >
                  <h4 className="h5 text-danger  fw-medium ">Your balance</h4>
                  <h4 className="h5 text-danger  fw-medium ">0.0$</h4>
                </div>
                <div className="row card-body gap-0 row-gap-4">
                  {paymentsCards.map((item, index) => {
                    const isSelected = selectedCard === index;
                    return (
                      <>
                        <div
                          className=""
                          style={{
                            width: "20%",
                            cursor: "pointer",
                          }}
                          key={index}
                        >
                          <div
                            onClick={() =>
                              handleCardClick(index, item.price)
                            }
                          >
                            <div
                              className="d-flex btn-lg justify-content-around align-items-center"
                              style={{
                                textAlign: "center",
                                backgroundColor: isSelected
                                  ? "#0E82FD"
                                  : "#FFF",
                                transform: isSelected
                                  ? "scale(1.1)"
                                  : "scale(1)",
                                zIndex: isSelected ? 2 : 1,
                                borderRadius: "25px",
                                boxShadow: !isSelected
                                  ? "0px 0px 10px rgba(0, 0, 0, 0.25)"
                                  : "none", // Add box shadow based on isSelected state
                                transition:
                                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Add a transition for the transform and box-shadow properties
                              }}
                            >
                              <h5
                                style={{
                                  textAlign: "center",
                                  color: isSelected
                                    ? "#FFFFFF"
                                    : "#000",
                                  fontSize: "1rem",
                                  fontWeight: "500",
                                }}
                                className="m-0"
                              >
                                ${item.price}
                              </h5>
                              <img
                                src="/payment-success.png"
                                className="img-fluid rounded-circle "
                                width={"30px"}
                                height={"30px"}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="row patient-graph-col">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header p-0 ">
                        <h4 className="card-title text-uppercase">
                          ENTER PROMO CODE
                        </h4>
                      </div>
                      <div className="card-body p-0 ">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex justify-content-between  align-items-center w-50 column-gap-3 ">
                            <input
                              type="name"
                              className="form-control"
                              aria-describedby="PromeCode"
                            />
                            <button className="btn-primary btn-lg">
                              Apply
                            </button>
                          </div>
                          <div className="d-flex justify-content-end  align-items-center column-gap-3 rounded-2  py-3 bg-light ">
                            <h4>Top-up amount:</h4>
                            <h4 className="h3 fw-bold ">
                              ${selectedAmount ? selectedAmount : "00"}.00
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body pt-0">
                  {/* <!-- Tab Menu --> */}
                  <nav className="user-tabs mb-4">
                    <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          to="#pat_appointments"
                          data-bs-toggle="tab"
                        >
                          Appointments
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="#pat_prescriptions"
                          data-bs-toggle="tab"
                        >
                          My Appointments
                        </Link>
                      </li>

                    </ul>
                  </nav>

                  <div className="tab-content pt-0">
                    <div
                      id="pat_appointments"
                      className="tab-pane fade show active"
                    >
                      <div className="card card-table mb-0">
                        <div className="card-body">
                          <div className="table-responsive">
                            {/* <table className="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Doctor</th>
                                  <th>Appt Date</th>
                                  <th>Booking Date</th>
                                  <th>Amount</th>
                              
                                  <th>Status</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to="/patient/doctor-profile"
                                        className="avatar avatar-sm me-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={IMG01}
                                          alt="User"
                                        />
                                      </Link>
                                      <Link to="/patient/doctor-profile">
                                        Dr. Ruby Perrin <span>Dental</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    14 Nov 2019{" "}
                                    <span className="d-block text-info">
                                      10.00 AM
                                    </span>
                                  </td>
                                  <td>12 Nov 2019</td>
                                  <td>$160</td>
                                
                                  <td>
                                    <span className="badge rounded-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <div className="table-action">
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Print
                                      </Link>
                                      &nbsp;
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-info-light"
                                      >
                                        <i className="far fa-eye"></i> View
                                      </Link>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to="/patient/doctor-profile"
                                        className="avatar avatar-sm me-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={IMG07}
                                          alt="User"
                                        />
                                      </Link>
                                      <Link to="/patient/doctor-profile">
                                        Dr. Linda Tobin <span>Neurology</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    8 Nov 2019{" "}
                                    <span className="d-block text-info">
                                      6.00 PM
                                    </span>
                                  </td>
                                  <td>6 Nov 2019</td>
                                  <td>$450</td>
                                 
                                  <td>
                                    <span className="badge rounded-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <div className="table-action">
                                      <Link
                                        className="btn btn-sm bg-primary-light"
                                        to="#0"
                                      >
                                        <i className="fas fa-print"></i> Print
                                      </Link>
                                      &nbsp;
                                      <Link
                                        className="btn btn-sm bg-info-light"
                                        to="#0"
                                      >
                                        <i className="far fa-eye"></i> View
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to="/patient/doctor-profile"
                                        className="avatar avatar-sm me-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={IMG08}
                                          alt="User"
                                        />
                                      </Link>
                                      <Link to="/patient/doctor-profile">
                                        Dr. Paul Richard{" "}
                                        <span>Dermatology</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    7 Nov 2019{" "}
                                    <span className="d-block text-info">
                                      9.00 PM
                                    </span>
                                  </td>
                                  <td>7 Nov 2019</td>
                                  <td>$275</td>
                                
                                  <td>
                                    <span className="badge rounded-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <div className="table-action">
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Print
                                      </Link>
                                      &nbsp;
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-info-light"
                                      >
                                        <i className="far fa-eye"></i> View
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to="/patient/doctor-profile"
                                        className="avatar avatar-sm me-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={IMG09}
                                          alt="User"
                                        />
                                      </Link>
                                      <Link to="/patient/doctor-profile">
                                        Dr. John Gibbs <span>Dental</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    6 Nov 2019{" "}
                                    <span className="d-block text-info">
                                      8.00 PM
                                    </span>
                                  </td>
                                  <td>4 Nov 2019</td>
                                  <td>$600</td>
                                 
                                  <td>
                                    <span className="badge rounded-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <div className="table-action">
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Print
                                      </Link>
                                      &nbsp;
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-info-light"
                                      >
                                        <i className="far fa-eye"></i> View
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to="/patient/doctor-profile"
                                        className="avatar avatar-sm me-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={IMG10}
                                          alt="User "
                                        />
                                      </Link>
                                      <Link to="/patient/doctor-profile">
                                        Dr. Olga Barlow <span>Dental</span>
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>
                                    5 Nov 2019{" "}
                                    <span className="d-block text-info">
                                      5.00 PM
                                    </span>
                                  </td>
                                  <td>1 Nov 2019</td>
                                  <td>$100</td>
                                
                                  <td>
                                    <span className="badge rounded-pill bg-success-light">
                                      Confirm
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <div className="table-action">
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-primary-light"
                                      >
                                        <i className="fas fa-print"></i> Print
                                      </Link>
                                      &nbsp;
                                      <Link
                                        to="#0"
                                        className="btn btn-sm bg-info-light"
                                      >
                                        <i className="far fa-eye"></i> View
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                            <table className="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Doctor</th>
                                  <th>Appt Date</th>
                                  <th>Booking Date</th>
                                  <th>Amount</th>
                                  {/*<th>Status</th>*/}
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {loading ? <div><h4>Loading...</h4></div> :
                                  appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                      <td>
                                        <h2 className="table-avatar">
                                          <Link
                                            to={`/patient/doctor-profile/${appointment.doctorDetails._id}`}
                                            className="avatar avatar-sm me-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={doc_1}
                                            // src={`your-base-url/${appointment.doctorDetails.image}`} // Replace 'your-base-url' with the actual base URL for the images
                                            // alt="Doctor"
                                            />
                                          </Link>
                                          <Link
                                            to={`/patient/doctor-profile/${appointment.doctorDetails._id}`}
                                          >
                                            {appointment.doctorDetails.name}{' '}
                                            <span>{appointment.doctorDetails.specialization}</span>
                                          </Link>
                                        </h2>
                                      </td>
                                      <td>
                                        {appointment.appointmentDetails.selectedDate}{' '}
                                        <span className="d-block text-info">
                                          {appointment.selectedTimeSlot}
                                        </span>
                                      </td>
                                      <td>{appointment.appointmentDetails.bookingDate}</td>
                                      <td>$108</td>
                                      {/* <td>
                                        <span className={`badge rounded-pill ${appointment.status === 'Confirm' ? 'bg-success-light' : 'bg-danger-light'}`}>
                                        
                                         {
                                         docAppointment.map((item)=>(
                                         
                                          appointment.appointmentDetails.doc_id === item.doctorDetails._id?"confim":"pending..."
                                          
                                          ))
                                         } 
                                        </span>
                                        </td>*/}
                                      <td className="text-end">
                                        <div className="table-action">
                                          <Link
                                            to={`#0`}
                                            className="btn btn-sm bg-primary-light"
                                          >
                                            <i className="fas fa-print"></i> Print
                                          </Link>
                                          &nbsp;
                                          <Link
                                            to={`#0`}
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye"></i> View
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="pat_prescriptions">
                      <div className="card card-table mb-0">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover table-center mb-0">
                              <thead>
                                <tr>

                                  <th>Name</th>
                                  <th>Specialization</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  docAppointment && docAppointment.map((item, index) => (
                                    <tr>


                                      <td>
                                        <h2 className="table-avatar">
                                          <Link
                                            to="/patient/doctor-profile"
                                            className="avatar avatar-sm me-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={IMG06}
                                              alt="User "
                                            />
                                          </Link>
                                          <Link to="/patient/doctor-profile">
                                            Dr. {item.doctorDetails.name}{" "}
                                            <span>{item.doctorDetails.specialization}</span>
                                          </Link>
                                        </h2>
                                      </td>
                                      <td>{
                                        item.doctorDetails.specialization}</td>
                                      <td className="text-end">
                                        <div className="table-action">
                                          <Link
                                            to="#"
                                            className="btn btn-sm bg-primary-light"
                                          >
                                            <i className="fas fa-print"></i> Print
                                          </Link>
                                          &nbsp;
                                          <Link
                                            to="#"
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye"></i> View
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  ))

                                }

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5">

            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </>
  );
};

export default Dashboard;
