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
import WalletPaypal from "../checkout/WalletPaypal.jsx";
import Transaction from "./Transaction/index.jsx";

const Dashboard = (props) => {
  const userId = localStorage.getItem('token');

  const [count, setCount] = useState(1, 2, 3, 4);
  const [appointments, setAppointments] = useState([]);
  const [todayappointments, setTodayAppointments] = useState([]);
  const [payment, setPayments] = useState([]);
  const [patient, setPatient] = useState([]);
  const [docAppointment, setDocAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mypatient, setMyPatient] = useState([]);
  const [patientStatus, setPatientStatus] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [medicalrecords, setMedicalRecord] = useState([]);
  
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

      setLoading(true);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/appointments/${userId}`);
      setAppointments(response.data);
      console.log("Appointment", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  const fetchTodayAppointments = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/gettodayappointments/${userId}`);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/gettodayappointments/${userId}`);
      setTodayAppointments(response.data);
      console.log("setTodayAppointments", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  const fetchpatientdata = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getpatient/${userId}`);
      setPatient(response.data);
      // console.log("patient", response.data);
      const pateintdata = response.data
      console.log("status", pateintdata.status);
      setPatientStatus(pateintdata.status);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  localStorage.setItem("status", patientStatus)

  const fetchdoctorappointment = async () => {

    try {
      setLoading(true);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mydoctor/${userId}`);
      setDocAppointment(response.data);
      console.log("setDocAppointment", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  const fetchpaymet = async () => {

    try {
      setLoading(true);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypayments/${userId}`);
      setPayments(response.data);
      console.log("payment", response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  const fetchmedical = async () => {

    try {
      setLoading(true);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getmedicaldetails/${userId}`);
      setMedicalRecord(response.data);
      console.log("setMedicalRecord", response.data);
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
    fetchpaymet();
    fetchmedical();
    fetchTodayAppointments();
  }, []);
  // Calculate total fees and update each entry
  const totalFees = payment.reduce((total, entry) => {
    // Parse the fee amount as a number and add it to the total
    const fees = Number(entry.Amount);
    total += fees;

    // Add the fees property to each entry
    entry.totalFees = fees;

    return total;
  }, 0);

  // console.log('Updated Data:', dataArray);
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
  console.log("loading", loading);
  console.log("patientStatus", patientStatus);
  // Get current date in the format "DD, MMM YYYY"
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const todayAppointmentsFiltered = todayappointments.filter(item => item.selectedDate === currentDate);

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
          {loading && loading ? "Loading...." :
            <>
              {patientStatus && patientStatus ?
                <>
                  <div className="row">
                    <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5">

                    </div>
                    <div style={{
                      height: "80vh",
                      // backgroundColor: "#e9eae7",
                      marginTop: "3rem"

                    }} className="col-md-2 col-lg-2 rounded-5  col-xl-2 theiaStickySidebar pt-5">
                      <StickyBox offsetTop={20} offsetBottom={20}>
                        <DashboardSidebar props={patient} />
                      </StickyBox>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6 mt-5">
                      <div>

                        <div className="card-body  d-flex justify-content-between align-items-center gap-3 mb-0 py-0">
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
                                <h3>{appointments && appointments.length}</h3>
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
                                <h3>
                                  {todayAppointmentsFiltered ? todayAppointmentsFiltered.length : "0"}
                                </h3>
                                {/* <p className="text-muted"> { todayAppointmentsFiltered ? todayAppointmentsFiltered : "12 mar 2019"}</p> */}
                                <p className="text-muted"> {currentDate}</p>

                                {/* {todayappointments ? todayappointments.map((item, index) => (
                          <>

                            <p className="text-muted">{item.selectedDate}</p>

                          </>
                        )) : "0"} */}
                                {/* <p className="text-muted">06, Nov 2019</p> */}
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
                                <h6>Total Appoinments</h6>
                                <h3>{appointments && appointments.length}</h3>
                                <p className="text-muted">{currentDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {
                          medicalrecords.map((item, indx) => (
                            <div className="row  " >
                              <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                                <div className="card">
                                  <div className="card-body text-start ">
                                    <div className="mb-3">
                                      <img src={Dashboard1} width={55} />
                                    </div>
                                    <h5>Heart Rate</h5>
                                    <h6>
                                      {item.hr}<sub>bpm</sub>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                                <div className="card">
                                  <div className="card-body text-start ">
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
                                  <div className="card-body text-start ">
                                    <div className="mb-3">
                                      <img src={Dashboard3} width={55} />
                                    </div>
                                    <h5>Glucose Level</h5>
                                    <h6>{item.bmi}</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                                <div className="card">
                                  <div className="card-body text-start ">
                                    <div className="mb-3">
                                      <img src={Dashboard4} width={55} />
                                    </div>
                                    <h5>Blood Pressure</h5>
                                    <h6>
                                      {item.Fbc}<sub>mg/dl</sub>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }

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
                          <h4 className="h5 text-danger  fw-medium ">{totalFees}$</h4>
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
                        {selectedAmount && (
                          <div className="row patient-graph-col">
                            <div className="col-12">
                              <div className="card">
                                <div className="card-header">
                                  <h4 className="card-title text-uppercase">Payments Methods</h4>
                                </div>
                                <div className="d-flex justify-content-center align-items-center w-100">
                                  <WalletPaypal pricing={selectedAmount} setSelectedAmount={setSelectedAmount} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* <div className="row patient-graph-col">
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
                </div> */}
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
                                  Confirmed Appoinments
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
                                                    to={{
                                                      pathname: `/patient/doctor-profile`,
                                                      state: {
                                                        id: appointment.doctorDetails._id
                                                      }
                                                    }}
                                                    // to={`/patient/doctor-profile/${appointment.doctorDetails._id}`}
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
                                                    to={{
                                                      pathname: `/patient/doctor-profile`,
                                                      state: {
                                                        id: appointment.doctorDetails._id
                                                      }
                                                    }}
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
                                                    // to={`/patient/invoice-view`}
                                                    to={{
                                                      pathname: `/patient/invoice-view`,
                                                      state: { id: appointment.appointmentDetails.doc_id }
                                                    }}
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
                                                    // to="#"

                                                    to={{
                                                      pathname: `/patient/invoice-view`,
                                                      state: { id: item.appointmentDetails.docId }
                                                    }}
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
                      <div>
                        <Transaction/>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
                  </div>
                </>
                :
                loading ? "Loading...." :
                  <>
                    <div className="row">
                      <div className="col-md-1 col-lg-2 col-xl-2 theiaStickySidebar mt-5">

                      </div>

                      <div className="col-md-10 col-lg-10 col-xl-10 mt-5">
                        <h2>Your Account has been suspended Please Contact Admin,Thank You!</h2>
                      </div>
                      <div className="col-md-1 col-lg-2 col-xl-2 theiaStickySidebar mt-5">

                      </div>
                    </div>
                  </>

              }
            </>


          }
        </div>
      </div>
      <Footer {...props} />
    </>
  );
};

export default Dashboard;
