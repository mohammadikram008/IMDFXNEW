import React, { useEffect, useState } from "react";
import DashboardSidebar from "../../doctors/sidebar/index.jsx";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Tab, Tabs, Modal } from "react-bootstrap";
// import DoctorThumb01 from "../../../assets/images/doctors/doctor-thumb-01.jpg";
// import DoctorThumb02 from "../../../assets/images/doctors/doctor-thumb-02.jpg";
// import DoctorThumb03 from "../../../assets/images/doctors/doctor-thumb-03.jpg";
// import DoctorThumb04 from "../../../assets/images/doctors/doctor-thumb-04.jpg";
// import DoctorThumb05 from "../../../assets/images/doctors/doctor-thumb-05.jpg";
// import DoctorThumb06 from "../../../assets/images/doctors/doctor-thumb-06.jpg";
import Header from "../../header";
import Footer from "../../footer";
import Tablerecords from "./tabledocrecord.jsx";

const DoctorMedicalReport = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const docId = localStorage.getItem('token');
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
      setAppointments(response.data);
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
                <DashboardSidebar />{" "}
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <Tablerecords />
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
          </div>
        </div>
      </div>

      <Footer {...props} />
    </div>
  )
}

export default DoctorMedicalReport