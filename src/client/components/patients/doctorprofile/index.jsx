/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
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

import { ToastContainer, toast } from "react-toastify";
const DoctorProfile = (props) => {
  const { id } = props.location.state;
  console.log("iddd", id);
  const docId = id;
  localStorage.setItem("docId",docId)
  const loginId = localStorage.getItem('token');
  const status = localStorage.getItem('status');
  const [show, setShow] = useState(false);
  const [videocall, setvideocall] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [state, setState] = useState(false);
  const [photoIndex, setphotoIndex] = useState(false);

  const [TimePop, setTimePop] = useState(false);
  const doctorlogin = localStorage.getItem("doctorlogin")

  console.log("d", doctorlogin);
  const handleToggleModal = () => {
    if (doctorlogin || !loginId) {

      toast.error("Login as a patient");
      // alert("Login as a patient");
    } else {
      if (status==="false") {
        toast.error("Your Account has been suspended");
      } else {
        setTimePop(!TimePop);

      }
    }
  };
  const handleModalClose = () => {
    setTimePop(false);
  };
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [doctorTimeDetail, setDoctorTimeDetail] = useState([]);
  const fetchDoctorDetail = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getDoctorDetail/${id}`);
      setDoctorDetail(response.data);
      console.log("profile",response.data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };
  const fetchDoctorAvaibleTimeDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/doctorAvailableTimings/${docId}`);
      setDoctorTimeDetail(response.data);
      console.log("Time", response.data);
    } catch (error) {
      console.error('Error fetching doctor Time details:', error);
    }
  };
  useEffect(() => {

    fetchDoctorAvaibleTimeDetail();
    fetchDoctorDetail();
  }, [id]);

  return (
    <Fragment>
      <Header {...props} />
      <div className={`col-md-12 col-12 ${TimePop ? 'modal-overlay' : ''}`}>
        <div className="content">
          <div className="container mt-5">
            <Pagecontent toggleModal={handleToggleModal} TimePop={TimePop} doctorDetail={doctorDetail} />
          </div>
        </div>
      </div>
      <TimeModel doctorDetail={doctorDetail} TimePop={TimePop} setTimePop={setTimePop} doctorTimeDetails={doctorTimeDetail.doctorAvailability} />
      <Footer {...props} />
      <ToastContainer />
    </Fragment>
  );
};

export default DoctorProfile;
