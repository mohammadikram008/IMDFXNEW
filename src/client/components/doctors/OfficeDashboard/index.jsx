import React, { useState, useEffect } from "react";
import DoctorSidebar from "../sidebar/OfficeSidebar";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import ProgressBar from "react-customizable-progressbar";
import StickyBox from "react-sticky-box";
import { Icon01, Icon02, Icon03 } from "./img";
import Breadcrumbs from "../../breadcrumb";
import axios from "axios";
import Header from "../../header";
import UpcomingTab from "./upcomimgtab";
import AppointmentTab from "./appoitmenttab";
const DoctorDashboard = (props) => {
  const [Doctor, setDoctor] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [mypatient, setMyPatient] = useState([]);
  const [offices, setOffices] = useState([]);

  const [todayappointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const docId = localStorage.getItem('token');
  // const fetchAppointments = async () => {
  //   try {


  //     const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/doc_appointments/${docId}`);
  //     setAppointments(response.data);
  //     // console.log("setAppointments",response.data);

  //   } catch (error) {
  //     console.error('Error fetching doc_appointments:', error);
  //     setLoading(false);
  //   }
  // };
  // const fetchmypatient = async () => {
  //   try {


  //     const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
  //     setMyPatient(response.data);
  //     // console.log("setMyPatient",response.data);

  //   } catch (error) {
  //     console.error('Error fetching mypatient:', error);
  //     setLoading(false);
  //   }
  // };
  // const fetchpatientdata = async () => {

  //   try {
  //     const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getDoctorDetail/${docId}`);
  //     setDoctor(response.data);
  //     // console.log("setDoctor", response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching getDoctorDetail:', error);
  //     setLoading(false);
  //   }
  // };
  // const fetchTodayAppointments = async () => {
  //   try {
  //     // const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/gettodayappointments/${userId}`);
  //     const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/gettodayappointments/${userId}`);
  //     setTodayAppointments(response.data);
  //     console.log("setTodayAppointments", response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //     setLoading(false);
  //   }
  // };
  const fetchHospital = async () => {
    try {


      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getallOffice`);
      setOffices(response.data);
      console.log("Office", response.data);

    } catch (error) {
      console.error('Error fetching mypatient:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    // fetchAppointments();
    // fetchpatientdata();
    // fetchmypatient();
    // fetchTodayAppointments();
    fetchHospital();
  }, []);
  console.log("appointments", appointments);
  // Get current date in the format "DD, MMM YYYY"
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const todayAppointmentsFiltered = todayappointments.filter(item => item.selectedDate === currentDate);
  return (
    <div>
      <Header {...props} />
      {/* <Breadcrumbs /> */}
      <div className="content">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DoctorSidebar props={Doctor} />
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="card dash-card">
                    <div className="card-body">
                      <div className="row">

                        <div className="col-md-8 col-sm-12">
                          <div className="doc-info-left">
                            {
                              offices && offices.map((item, index) => (
                                <div className="doc-info-cont">

                                  <div className="d-flex premium-div">
                                    <h4 className="doc-name">{item.officename}</h4>

                                    {/* <MdStars size={32} className="star" />
                                    <div className="gold-gradient badge-bg">
                                      <div className="text-div">
                                        <p className="">PLATINUM PROVIDER</p>
                                      </div>
                                    </div> */}
                                  </div>
                                  <p className="doc-speciality">
                                  {item.officespecialty}
                                  </p>
                                  <p className="doc-department">
                                    {/* <img src={IMG02} className="img-fluid" alt="Speciality" /> */}
                                    {/* {doctorDetail.conditionstreated} */}
                                  </p>
                                  <div className="rating">
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star filled" />
                                    <i className="fas fa-star" />
                                    <span className="d-inline-block average-rating ms-1">
                                      (35)
                                    </span>
                                  </div>
                                  <div className="clinic-details">
                                    <p className="doc-location">
                                      <i className="fas fa-map-marker-alt"></i>{item.street}, {item.city} , {item.country}
                                    </p>
                                    <p className="doc-location">
                                      <i className="fas fa-envelope"></i> {item.officeemail}
                                    </p>
                                    <p className="doc-location">
                                      <i className="fas fa-phone"></i> {item.officephone}
                                    </p>
                                    <p className="doc-location">
                                      <i className="fas fa-web"></i> {item.officewebsite}
                                    </p>
                                    {/* <p className="doc-location">
                                      <i className="fas fa-web"></i> {item.street}
                                    </p> */}
                                    {/* <p className="doc-location">
                                      <i className="fas fa-web"></i> {item.zipcode}
                                    </p> */}
                                    {/* <p className="doc-location">
                                      <i className="fas fa-web"></i> {item.officewebsite}
                                    </p>
                                    <p className="doc-location">
                                      <i className="fas fa-web"></i> {item.officewebsite}
                                    </p> */}
                                  </div>
                                  
                                  <div className="clinic-services">
                                    <span>Cardiologist</span>
                                    <span>Ophthalmologist</span>
                                    <span>Neurology</span>
                                  </div>
                                </div>
                              ))
                            }

                          </div>
                        </div>
                        {/* <div className="col-md-12 col-lg-4">
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
                              <h6>Total Patient</h6>
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
                              <h6>Today Patient</h6>
                              <h3>
                                {todayAppointmentsFiltered ? todayAppointmentsFiltered.length : "0"}
                              </h3>
                              <p className="text-muted"> {todayAppointmentsFiltered ? todayAppointmentsFiltered : "12 mar 2019"}</p>
                              <p className="text-muted"> {currentDate}</p>
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
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-12">
                  <h4 className="mb-4">Patient Appoinment</h4>
                  <div className="appointment-tab">
                    Appointment Tab
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          to="#upcoming-appointments"
                          data-bs-toggle="tab"
                        >
                          Upcoming
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="#today-appointments"
                          data-bs-toggle="tab"
                        >
                          Today
                        </Link>
                      </li>
                    </ul>
                    /Appointment Tab
                    <div className="tab-content">
                      Upcoming Appointment Tab
                      <UpcomingTab />
                      Today Appointment Tab
                      <AppointmentTab />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default DoctorDashboard;
