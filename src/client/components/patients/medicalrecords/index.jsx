import React ,{useEffect,useState}from "react";
import DashboardSidebar from "../dashboard/sidebar/sidebar.jsx";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import axios from "axios";
import Tablerecords from "./tablerecords.jsx";

const MedicalRecords = (props) => {
  // const [ setDate] = useState(new Date());

  // const handleChange = (date) => {
  //     setDate(date)
  // }
  const userId = localStorage.getItem('token');
  const [patient, setPatient] = useState([]);
  const fetchpatientdata = async () => {

      try {
  
  
        const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getpatient/${userId}`);
        setPatient(response.data);
       
      } catch (error) {
        console.error('Error fetching appointments:', error);
     
      }
    };
 ;
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
              <DashboardSidebar props={patient} />
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
