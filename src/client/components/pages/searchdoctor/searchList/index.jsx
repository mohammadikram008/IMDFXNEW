import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdStars } from "react-icons/md";
import MyComponent from "./mycomponent";
import { doc_1 } from "./img";
import { FaHeart } from "react-icons/fa6"; import { AiOutlineCheckCircle } from "react-icons/ai";
import TimeModel from "../../../patients/Model/TimeModel";

import { ToastContainer, toast } from "react-toastify";
const SearchList = (props) => {
  const history = useHistory()
  const imageUrl = `http://localhost:3005`;
  const doctorsData = [
    // Existing data remains unchanged
  ];
  console.log("props.props", props.props);
  const [doctorsApiData, setDoctorsApiData] = useState(props.props);
  const [TimePop, setTimePop] = useState(false);
  const [docDetail, setDocDetail] = useState();
  const [officeDetails, setOfficeDetails] = useState({});
  console.log("doctorsApiData", doctorsApiData);

  const [doctorTimeDetail, setDoctorTimeDetail] = useState([]);
  const [combinedData, setCombinedData] = useState(props.props);

  const loginId = localStorage.getItem('token');
  const status = localStorage.getItem('status');
  console.log("status", status);
  const fetchDoctorAvaibleTimeDetail = async (docId) => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/get-doc_avaibletime/${docId}`);
      setDoctorTimeDetail(response.data);
      console.log("Time", response.data);
    } catch (error) {
      console.error('Error fetching doctor Time details:', error);
    }
  };


  const fetchCombinedData = async () => {
    try {
      const doc_id_list = doctorsApiData.map((doctor) => doctor._id);
      const officeDetailsResponse = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/office-accept-request`, { doc_id: doc_id_list });
      const combined = doctorsApiData.map((doctor) => {
        const officeDetail = officeDetailsResponse.data.find((office) => office.doc_id === doctor._id);
        if (officeDetail) {
          return { ...doctor, officeDetail };
        } else {
          return doctor;
        }
      });
      setCombinedData(combined);
      console.log("Combined Data:", combined);
    } catch (error) {
      console.error("Error fetching combined data:", error);
    }
  };


  useEffect(() => {
    fetchCombinedData();
    // fetchDoctorAvaibleTimeDetail();
  }, [doctorsApiData]);

  // useEffect(() => {
  //   // Combine doctorsApiData and officeDetails
  //   const combined = doctorsApiData.map(doctor => {
  //     const officeDetail = officeDetails[doctor.doc_id];
  //     return {
  //       ...doctor,
  //       officeDetail: officeDetail ? officeDetail : null
  //     };
  //   });

  //   // Set the combined data state
  //   setCombinedData(combined);
  //   console.log("combined",combined);
  // }, [doctorsApiData, officeDetails]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://imdfx-newserver-production.up.railway.app/api/doctorpersnoldetails");
  //       setDoctorsApiData(response.data);
  //       console.log("response data", response.data);
  //     } catch (error) {
  //       console.error("Error fetching data from API:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Check if data is already available in state
  //       if (!props.props.length<0) {
  //         const response = await axios.get("https://imdfx-newserver-production.up.railway.app/api/doctorpersnoldetails");
  //         setDoctorsApiData(response.data);
  //         console.log("response data111", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data from API:", error);
  //     }
  //   };

  //   fetchData();
  // }, [props]);
  const handleChangeViewProfile = (props) => {

    const id = props
    history.push({
      pathname: "/patient/doctor-profile",
      state: { id }
    });

  }
  const handleTimePop = (id) => {
    console.log("i", id);
    if (loginId) {
      if (status ==="false") {
        toast.error("Your Account has been suspended");
      } else {

        setDocDetail(doctorsApiData.filter((item) => item._id === id)[0])
        setTimePop(!TimePop)
        fetchDoctorAvaibleTimeDetail(id)
      }
    } else {
      history.push({
        pathname: "/login",
      });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <style>
        {`
                  .btn-effect {
                    border: none;
                    border-radius: 1px;
                    padding: 5px 20px;
                    background: #00ffb3;
                    position: relative;
                    overflow: hidden;
                }
                .btn-effect:before {
                  content: '';
                  position: absolute;
                  width: 100px;
                  height: 100%;
                  background-image: linear-gradient(
                      120deg,
                      rgba(255,255,255, 0) 30%,
                      rgba(255,255,255, .8),
                      rgba(255,255,255, 0) 70%
                  );
                  top: 0;
                  left: -100px;
              }
              @keyframes shine {
                0% {left: -100px}
                20% {left: 100%}
                100% {left: 100%}
            }
            .btn-effect:before {
              content: '';
              position: absolute;
              width: 100px;
              height: 100%;
              background-image: linear-gradient(
                  120deg,
                  rgba(255,255,255, 0) 30%,
                  rgba(255,255,255, .5),
                  rgba(255,255,255, 0) 70%
              );
              top: 0;
              left: -100px;
              animation: shine 3s infinite linear; /* Animation */
          } 
          .background-box {
            box-shadow: 0 0 10px 5px rgba(128, 128, 128, 0.5); /* Adjust the shadow properties as needed */
          }
                  `}
        {/* alldoctor-profiles */}
      </style>
      {combinedData && combinedData.length > 0 ?
        (combinedData.map((doctor, index) => (
          <div key={index} className="h-auto p-5  background-box mb-4  alldoctor-profiles ">
            <div className="card-body d-flex flex-column  justify-content-center align-items-center gap-5">
              <div className="doctor-widget justify-content-between  ">
                <div className="doc-info-left">
                  <div className="doctor-img rounded-circle position-relative ">

                    {/* <img src={`http://localhost:3005/uploads//dafb82ac1615a4fcec977ac6db88bb61`} className="img-fluid" alt="User" /> */}
                    {/* <img src={`${imageUrl}/${doctor.image}`} className="img-fluid" alt="User" /> */}
                    <img src={doc_1} className="img-fluid rounded-circle" alt="User" />


                  </div>
                  <div className="basic-data">
                    <div className="d-flex gap-2 justify-content-start align-items-center  premium-div">
                      <h2 className=" mb-1">{doctor.name}
                      </h2>
                      <div className="text-success d-flex gap-1 ">

                        Active
                      </div>
                      <MdStars size={32} className="star" />
                      <div className="gold-gradient badge-bg">
                        <div className="text-div">
                          <p className="">PLATINUM PROVIDER</p>
                        </div>
                      </div>
                    </div>
                    <p className="">Specialization: {doctor.specialization}</p>
                    <h5 className="">{doctor.education}</h5>
                    {/* Rating Stars */}
                    <div className="rating">
                      {/* Include your rating stars here */}
                    </div>

                    <div className="d-flex gap-3   text-gray-600 doctor-information">
                      <div className=" d-flex flex-column align-items-start gap-1" >
                        <h1 style={{
                          fontSize: "15px"
                        }} className="  fw-medium text-secondary">Under 15 minutes</h1>
                        <h5>WAIT TIME</h5>
                      </div>
                      <div
                        style={{
                          borderLeft: '1px solid gray', // Adjust the width and color of the line as needed
                        }}
                      ></div>
                      <div className=" d-flex flex-column align-items-start gap-1 ">
                        <h1 style={{
                          fontSize: "15px"
                        }} className="   fw-medium text-secondary">
                          {doctor.yearofexperience} years
                        </h1>
                        <h5>EXPERIENCE</h5>
                      </div>
                      <div
                        style={{
                          borderLeft: '1px solid gray', // Adjust the width and color of the line as needed
                        }}
                      ></div>
                      <div className=" d-flex flex-column align-items-start gap-1 ">
                        <h1 style={{
                          fontSize: "15px"
                        }} className=" fw-medium text-secondary">
                          98% (542)
                        </h1>
                        <h5>SATISFIED</h5>
                      </div>
                    </div>

                    {/* <div className="d-flex items-center justify-between mx-3 border-t border-b mt-2 border-success">
                    <div className="d-flex items-center justify-center">
                      <h1 className="text-success">Available:</h1>
                      <h5 className="mx-2">Mon, 31 August</h5>
                    </div>
                    <div className="d-flex items-center justify-center">
                      <h1 className="text-success">Fees:</h1>
                      <h5>${doctor.fee}</h5>
                    </div>
                  </div> */}
                  </div>
                </div>
                {/* Right Section */}
                <div className="doc-info-right">
                  <div className="clini-infos">
                    {/* ... clinic info details ... */}
                  </div>
                  <div className="clinic-booking">
                    <button className="view-pro-btn"
                      // onclick={() => handleChangeViewProfile(doctor)}
                      onClick={() => handleChangeViewProfile(doctor._id)}

                    >

                      View Profile

                    </button>
                    {/* <Link to="/patient/doctor-profile" className="view-pro-btn">
                    View Profile
                  </Link> */}
                    <button style={{
                      borderRadius: "10px"
                    }} onClick={() => handleTimePop(doctor._id)} className="login-btn-login">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
              {doctor.officeDetail && doctor.officeDetail ?
                <>
                  <div className="inetgrate-card-main">
                    <div className="  inetgrate-card ">
                      {/* Inner Card */}
                      <div className="position-relative border border-secondary  rounded-2 d-flex flex-column justify-content-center align-items-center  rounded-md px-3 py-2 ">
                        <h4 className="fs-5 fw-normal ">
                          {/* Inetgrate medical Hospital DHA */}
                          Employee at {doctor.officeDetail.officename} Hospital
                        </h4>
                        <div className="d-flex my-4 justify-content-center align-items-center">
                          <p className="text-gray-600">  <i className="fas fa-map-marker-alt"></i> <span className="mx-1">{doctor.officeDetail.city}, {doctor.officeDetail.country} {""}</span></p>
                          {/* <p className="mx-4">   <i className="fas fa-envelope"></i>{doctor.officeDetail.email}</p> */}
                          <p className="mx-2">Fees:{doctor.once.map((item, i) => (item.consultationfees))}</p>
                        </div>
                        <div style={{
                          backgroundColor: "blue",
                          left: '0px',
                          right: '0px',
                          bottom: '0px',
                        }} className="text-white btn-effect position-absolute rounded-bottom d-flex justify-content-center align-items-center">
                          Pay online and get up to 50% off
                        </div>
                      </div>


                    </div>
                  </div>
                </>
                :
                <div className="inetgrate-card-main">
                  <div className="  inetgrate-card ">

                    {/* Inner Card */}
                    <div className="position-relative border border-secondary    rounded-2 d-flex flex-column justify-content-center align-items-center  rounded-md px-3 py-2 ">
                      <h4 className="fs-5 fw-normal ">
                        Self Employee
                      </h4>
                      <div className="d-flex my-4 justify-content-center align-items-center">
                        <p className="text-gray-600">Condition treatment: {" "}{doctor.conditionstreated} </p>
                        {/* <p className="mx-4">   <i className="fas fa-envelope"></i>{doctor.email}</p> */}
                        <p className="mx-2">Fees:{doctor.once.map((item, i) => (item.consultationfees))}</p>
                      </div>

                      <div style={{
                        backgroundColor: "blue",
                        left: '0px',
                        right: '0px',
                        bottom: '0px',
                      }} className="text-white btn-effect w-100 position-absolute rounded-bottom d-flex justify-content-center align-items-center">
                        Pay online and get up to 50% off
                      </div>
                    </div>
                    <div className="position-relative border border-secondary  mx-2 rounded-2 d-flex flex-column justify-content-center align-items-center  rounded-md px-3 py-2 ">
                <h4 className="fs-5 fw-normal ">
                Online Vedio consultant  
                </h4>
                <div className="d-flex my-4 justify-content-center align-items-center">
                  <p className="text-gray-600">  <i className="fas fa-map-marker-alt"></i>Rawalpinid, pakistan {""}</p>
                  <p className="mx-4">   <i className="fas fa-envelope"></i>IMDFX@gmail.com</p>
                </div>
  
                <div style={{
                  backgroundColor: "blue",
                  left: '0px',
                  right: '0px',
                  bottom: '0px',
                }} className="text-white btn-effect position-absolute rounded-bottom d-flex justify-content-center align-items-center">
                  Pay online and get up to 50% off
                </div>
              </div>


                  </div>
                </div>
              }

            </div>
          </div>
        )))

        : (
          <div>No data available</div>
        )
      }
      <TimeModel doctorDetail={docDetail} TimePop={TimePop} setTimePop={setTimePop} doctorTimeDetails={doctorTimeDetail.doctorAvailability} />
      <ToastContainer />
    </div>
  );
};

export default SearchList;
