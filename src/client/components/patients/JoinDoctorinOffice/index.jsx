import React, { useState,useEffect } from "react";
import DashboardSidebar from "../../doctors/sidebar/index.jsx";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../header";
import Footer from "../../footer";
import Tablerecords from "./tablerecords.jsx";

const JoinOffice = (props) => {
const office="offices"
const [Doctor, setDoctor] = useState([]);
const fetchpatientdata = async () => {
  try {
   
    const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getDoctorDetail/${docId}`);
    setDoctor(response.data);
    const doctordata = response.data
    // setDoctorStatus(doctordata.status);
    // console.log("status", doctordata.status);

  } catch (error) {
    console.error('Error fetching getDoctorDetail:', error);

  }
};

useEffect(() => {
  fetchpatientdata()


}, []);
  return (
    <div>
      <Header {...props} />
   
      <div className="content">
        <div className="container-fluid mt-5">
          <div className="row">
          <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar props={Doctor} />{" "}
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <Tablerecords  />
              <Tablerecords office={office}/>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
          </div>
        </div>
      </div>

      <Footer {...props} />
    </div>
  );
};

export default JoinOffice;
