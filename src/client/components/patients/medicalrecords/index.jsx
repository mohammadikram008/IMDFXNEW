import React from "react";
import DashboardSidebar from "../dashboard/sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
// import { Tab, Tabs, Modal } from "react-bootstrap";
// import DoctorThumb01 from "../../../assets/images/doctors/doctor-thumb-01.jpg";
// import DoctorThumb02 from "../../../assets/images/doctors/doctor-thumb-02.jpg";
// import DoctorThumb03 from "../../../assets/images/doctors/doctor-thumb-03.jpg";
// import DoctorThumb04 from "../../../assets/images/doctors/doctor-thumb-04.jpg";
// import DoctorThumb05 from "../../../assets/images/doctors/doctor-thumb-05.jpg";
// import DoctorThumb06 from "../../../assets/images/doctors/doctor-thumb-06.jpg";
import Header from "../../header";
import Footer from "../../footer";
import Tablerecords from "./tablerecords.jsx";

const MedicalRecords = (props) => {
  // const [ setDate] = useState(new Date());

  // const handleChange = (date) => {
  //     setDate(date)
  // }

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
  );
};

export default MedicalRecords;
