/* eslint-disable no-unused-vars */
import React, { Fragment, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import axios from "axios";
import Footer from "../../footer";
import Content from "./content";
import Pagecontent from "./pagecontent";
import BookingModal from "../Model/TimeModel";
import IMG01 from "../../../assets/images/doc1.jpg";
import doc_cover from '../../../assets/images/doccover.png'
import TimeModel from "../Model/TimeModel";
const DoctorProfile = (props) => {
  const {  id} = props.location.state;
  console.log("iddd",id);
  const [show, setShow] = useState(false);
  const [videocall, setvideocall] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [state, setState] = useState(false);
  const [photoIndex, setphotoIndex] = useState(false);

  const [TimePop, setTimePop] = useState(false);
  const doctorlogin = localStorage.getItem("doctorlogin")
  const handleToggleModal = () => {
    if(doctorlogin){
alert("Login as a patient");
    }else{

      setTimePop(!TimePop);
    }
  };
  const handleModalClose = () => {
    setTimePop(false);
  };
  const [doctorDetail, setDoctorDetail] = useState(null);

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/getDoctorDetail/${id}`);
        setDoctorDetail(response.data);
       
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetail();
  }, [id]);
  
  return (
    <Fragment>
 

      <Header {...props} />

      <div className={`col-md-12 col-12 ${TimePop ? 'modal-overlay' : ''}`}>

        {/* <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row heading-book align-items-center inner-banner">
              <div className="col-md-12 col-12 ">
                <div
                  className="cover-image mt-2"
                  style={{
                    width: "100%",
                    backgroundImage: `url(${doc_cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
              </div>
          
            </div>
          </div>
        </div> */}
        <div className="content">
          <div className="container mt-5">
            <Pagecontent toggleModal={handleToggleModal} TimePop={TimePop} doctorDetail={doctorDetail} />
            {/* <div className="content-div">

              <Content />
            </div> */}


          </div>
        </div>


      </div>
      {/* {TimePop && (
        <BookingModal
          TimePop={TimePop}
          handleModalClose={handleModalClose}
          doctorDetail={doctorDetail}
        />
      )} */}
      <TimeModel TimePop={TimePop} setTimePop={setTimePop}/>
      <Footer {...props} />
    </Fragment>
  );
};

export default DoctorProfile;
