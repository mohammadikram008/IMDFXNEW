import React, { useState, useEffect } from "react";
import DoctorSidebar from "../sidebar/OfficeSidebar";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import Header from "../../header";
import ProgressBar from "react-customizable-progressbar";
import StickyBox from "react-sticky-box";
import Breadcrumbs from "../../breadcrumb";
import axios from "axios";
import UpcomingTab from "./upcomimgtab";
import AppointmentTab from "./appoitmenttab";
import { Icon01, Icon02, Icon03 } from "./img";

const DoctorDashboard = (props) => {
  const [Doctor, setDoctor] = useState({});
  const [offices, setOffices] = useState({});
  const [loading, setLoading] = useState(true);
  const officeId = localStorage.getItem('token');

  const fetchHospital = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getofficeDetail/${officeId}`);
      setOffices(response.data);
    } catch (error) {
      console.error('Error fetching office details:', error);
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
                            <div className="doc-info-cont">
                              <div className="d-flex premium-div">
                                <h4 className="doc-name">{offices.officename}</h4>
                              </div>
                              <p className="doc-speciality">
                                {offices.officespecialty}
                              </p>
                              <div className="rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                                <span className="d-inline-block average-rating ms-1">
                                  (13)
                                </span>
                              </div>
                              <div className="clinic-details">
                                <p className="doc-location">
                                  <i className="fas fa-map-marker-alt"></i>{offices.street}, {offices.city} , {offices.country}
                                </p>
                                <p className="doc-location">
                                  <i className="fas fa-envelope"></i> {offices.email}
                                </p>
                                <p className="doc-location">
                                  <i className="fas fa-phone"></i> {offices.officephone}
                                </p>
                                <p className="doc-location">
                                  <i className="fas fa-web"></i> {offices.officewebsite}
                                </p>
                              </div>
                              <div className="clinic-services">
                                <span>Dentist</span>
                                <span>Ophthalmologist</span>
                                <span>Neurology</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default DoctorDashboard;
