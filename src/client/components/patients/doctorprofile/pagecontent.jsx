import React, { useState, useEffect } from "react";
import { IMG02 } from "./img";
import MyComponent from "./mycomponent";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import { doctorthumb02 } from "../../imagepath";
import BookingModal from "../Model/TimeModel";
import doc_cover from '../../../assets/images/doccover.png'
import { IoMdSunny } from 'react-icons/io';
import { MdOutlineNightlightRound } from 'react-icons/md';
import OwlCarousel from 'react-owl-carousel';
import { Link, useHistory } from "react-router-dom";
import IMG01 from "../../../assets/images/doc1.jpg";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import "bootstrap-daterangepicker/daterangepicker.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { MdStars } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BsHospital } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import Content from "./content";
const Pagecontent = ({ toggleModal, doctorDetail }) => {
  console.log("ddddd", doctorDetail);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenHos, setDropdownOpenHos] = useState(false);
  const [isBookingFixed, setIsBookingFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

 

  const toggleDropdown = () => {
   
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdownHos = () => {
    setDropdownOpenHos(!isDropdownOpenHos);
  };
 
  const handleModalClose = () => {
    setShowModal(false);
  };
 
  const weekDays = ['Monday ', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',];
 

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const doctorData = {
    name: "Dr. Darren Elder",
    qualification: "MD, Cardiology",
    location: "New York, NY",
    pictureUrl: "Doc1.jpg",
    satisfactionPercentage: 85,
    behaviorsRating: 90,
    checkupRating: 85,
    consultationRating: 88,
    services: ["Acne Treatment (مہاسوں کا علاج)", "Alopecia (ایلوپیسیا)", "  Boil (بوائل)", " Chemical Peel (کیمیائی چھلکا)", " Dermal Fillers (ڈرمل فلرز)"],
    conditionsTreated: ["Acne", "Fever", "Diabetes", "High Blood Pressure", "Allergies"],
    education: "Medical School XYZ, Graduation Year: 2010",
    specialization: "Cardiology",
    experience: "10+ years of experience",
    about: `Dr. Shakeel Ahmad is a top Dermatologist with 11 years of experience. You can book an in-person appointment or an online video consultation with
     Dr. Shakeel Ahmad through oladoc.com or by calling at 0415068065. Experience  Dr. Shakeel Ahmad has over 11 years of experience in his field. Qualification  Dr. Shakeel Ahmad has the following qualifications: MBBS FCPS (Dermatology) Appointment Details In order  to book an appointment with Dr. Shakeel Ahmad you can call 0415068065 or click the Book Appointment button. You can also book an online video consultation with Dr. Shakeel Ahmad by clicking the Video Consultation button. Fees The fee for Dr. Shakeel Ahmad ranges from Rs. 1,000 - 1,500 for appointments. You can also book an online video consultation with him at an exclusive discount for just Rs. 500 through oladoc.Practice Locations Dr. Shakeel Ahmad is currently practicing at the following locations: oladoc Care Video Consultation Availability Days: M, Tu, W, Th, F Time: 07:00 PM - 08:00 PM National Hospital (Faisalabad) Availability Days: M, Tu, W, Th, F Time: 06:00 PM - 09:00 PM Yaseen Memorial Hospital (Faisalabad) Availability Days: Tu, Th Time: 07:00 PM - 09:00 PM Health 360 Availability Days: M, W, F Time: 03:00 PM - 05:00 PM Patient Feedback Dr. Shakeel Ahmad has a 100% patient satisfaction score with 158 verified patient reviews on oladoc.Services Offered Following are some of the services offered by Dr. Shakeel Ahmad:Acne Treatment Alopecia Boil  Chemical Peel  Dermal Fillers`,
  };



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3005/api/doctorpersnoldetails");
  //       setDoctorsApiData(response.data);
  //       console.log("response data", response.data);
  //     } catch (error) {
  //       console.error("Error fetching data from API:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // Check if doctorDetail is null or undefined
 
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 100;
  
      if (window.innerWidth >= 768 && scrollTop > threshold) {
        setIsBookingFixed(true);
      } else {
        setIsBookingFixed(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bookingCardClass = `booking-cards ${isBookingFixed ? 'booking-fixed' : ''} ${window.innerWidth <= 768 ? 'position-relative' : ''}`;


 
  if (!doctorDetail) {
    return <div>No doctor details available.</div>;
  }
  


  return (
    <>



      <div className={`card ${showModal ? 'modal-overlay' : ''} `}>
        <div className=" card-body">
          <div className="">
            <div className="relative row">
              <div className="col-md-8 col-sm-12">

                <div className="doc-info-left">
                  <div className="doctor-img">
                    <img src={IMG01} className="img-fluid" alt="User Image" />
                  </div>
                  <div className="doc-info-cont">

                    <div className="d-flex premium-div">
                      <h4 className="doc-name">{doctorDetail.name}</h4>
                      <MdStars size={32} className="star" />
                      <div className="gold-gradient badge-bg">
                        <div className="text-div">
                          <p className="">PLATINUM PROVIDER</p>
                        </div>
                      </div>
                    </div>
                    <p className="doc-speciality">
                      {doctorDetail.education}
                    </p>
                    <p className="doc-department">
                      <img src={IMG02} className="img-fluid" alt="Speciality" />
                      {doctorDetail.conditionstreated}
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
                        <i className="fas fa-map-marker-alt"></i> Newyork, USA -
                      </p>


                    </div>
                    <div className="clinic-services">
                      <span>Dental Fillings</span>
                      <span>Teeth Whitneing</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="review-heading ">
                    {/* <MdStars size={32} className="" /> */}
                    <h1>{doctorData.name} Reviews (158)</h1>
                  </div>

                  <div className="row mt-5">

                    <div className="col-md-2 review-div-col-1">
                      <div className="circle-container">
                        <div className="circle">
                          <span className="percentage">{doctorData.satisfactionPercentage}%</span>
                        </div>

                      </div>
                    </div>
                    <div className="col-md-2 review-div-col-2">

                      <p className="">
                        Satisfied Patients
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className=" progressbar-div">
                        <p className="text-sm text-gray-500">Doctor Behaviors</p>
                        <ProgressBar
                          variant="dark"
                          now={doctorData.behaviorsRating}
                          style={{
                            height: '4px'
                          }}
                          // label={`${doctorData.behaviorsRating}%`}
                          className="mb-2 progess"
                        />
                        <p className="text-sm text-gray-500">98%</p>

                      </div>
                      <div className=" progressbar-div">
                        <p className="text-sm text-gray-500">Clinic Environment</p>
                        <ProgressBar
                          variant="dark"
                          now={doctorData.behaviorsRating}
                          style={{
                            height: '4px'
                          }}
                          // label={`${doctorData.behaviorsRating}%`}
                          className="mb-2 progess"
                        />
                        <p className="text-sm text-gray-500">98%</p>
                      </div>
                      <div className=" progressbar-div">
                        <p className="text-sm text-gray-500">Staff Behaviour</p>
                        <ProgressBar
                          variant="dark"
                          now={doctorData.behaviorsRating}
                          style={{
                            height: '4px'
                          }}
                          // label={`${doctorData.behaviorsRating}%`}
                          className="mb-2 progess"
                        />
                        <p className="text-sm text-gray-500">98%</p>
                      </div>

                      {/* <div className="relative pt-1 flex flex-col items-center md:flex-row justify-between md:space-x-3">
                        <div className="">
                          <p className="text-sm text-gray-500">Clinic Environment</p>
                        </div>
                        <div className="flex md:w-54 md:space-x-3">
                          <div className="flex mb-2 items-center justify-center">
                            <div className="w-48 bg-gray-200 rounded-full">
                              <div
                                className="h-2 rounded-full bg-[#232426]"
                                style={{ width: `${doctorData.behaviorsRating}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#232426]">
                                {doctorData.behaviorsRating}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative pt-1 flex flex-col items-center md:flex-row justify-between md:space-x-3">
                        <div className="">
                          <p className="text-sm text-gray-500">Staff Behaviour</p>
                        </div>
                        <div className="flex md:w-54 md:space-x-3">
                          <div className="flex mb-2 items-center justify-center">
                            <div className="w-48 bg-gray-200 rounded-full">
                              <div
                                className="h-2 rounded-full bg-[#232426]"
                                style={{ width: `${doctorData.behaviorsRating}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#232426]">
                                {doctorData.behaviorsRating}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* <Collapse isOpen={isOpen}>
                    <Review
                      patientName="John Doe"
                      review="Great experience with Dr. John Doe. Highly recommended!"
                      date="January 15, 2023"
                    />
                   
                  </Collapse> */}


                </div>
              </div>
              <div className={`col-md-4 col-sm-12 pagecontent-2nd-col `}>
                <div className="cards-div ">


                  <div className={` ${bookingCardClass}`}>
                    <div className="booking-card-heading">
                      <FaVideo size={32} />

                      <div className="font-weight-bold text-xl">Dr. John Doe</div>
                      <p className="rainbow  d-flex items-center justify-content-center">
                        Save fuel and time!
                      </p>
                    </div>

                    <div className="booking-card-body-main">
                      <div className="booking-card-body-inner-div d-flex">
                        <p>Fees:</p> <p>$100 - $150</p>
                      </div>
                      <div className="booking-card-body-inner-div">
                        <p> Address:</p> <p> Use phone/laptop </p>
                      </div>
                      <div className=" booking-card-body-inner-div d-flex items-center justify-content-around mb-4 " onClick={toggleDropdown} >
                        <span><FaClock /></span>
                        <span className=" m-0 p-0  ">Available Time</span>
                        <span> {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                      </div>

                      {isDropdownOpen ?
                        <ul className="">
                          {weekDays.map((day, index) => (
                            <li key={index} className="d-flex">
                              {day}: <p className="mx-2"> 9:00 AM - 5:00 PM</p>
                            </li>
                          ))}
                        </ul>
                        : ""
                      }
                    </div>



                    <button className="login-btn-login btn-booking-card"
                      // onclick="handleChange()"
                      onClick={toggleModal}
                    >
                      <span className="d-flex items-center justify-content-center">

                        <p className="m-0 p-0">
                          <FaVideo size={22} />
                        </p>
                        <p className="m-0 p-0 mx-2">Book Appointment</p>
                      </span>
                    </button>

                  </div>
                  {/* <div className="booking-cards mt-5">
                    <div className="booking-card-heading">
                      <BsHospital size={32} />

                      <div className="font-weight-bold text-xl mx-1">National Hospital (Faisalabad)</div>
                      <p className="rainbow2  ">
                        Pay Online & Get Rs. 200 OFF
                      </p>
                    </div>

                    <div className="booking-card-body-main">
                      <div className="booking-card-body-inner-div d-flex">
                        <p>Fees:</p> <p>$100 - $150</p>
                      </div>
                      <div className="booking-card-body-inner-div">
                        <p> Address:</p> <p> Use phone/laptop </p>
                      </div>
                      <div className=" booking-card-body-inner-div d-flex items-center justify-content-around mb-4 " onClick={toggleDropdown} >
                        <span><FaClock /></span>
                        <span className=" m-0 p-0  ">Available Time</span>
                        <span> {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                      </div>

                      {isDropdownOpen ?
                        <ul className="">
                          {weekDays.map((day, index) => (
                            <li key={index} className="flex">
                              {day}: <p className="mx-3"> 9:00 AM - 5:00 PM</p>
                            </li>
                          ))}
                        </ul>
                        : ""
                      }
                    </div>


                    <button className="login-btn-login btn-booking-card"
                      // onclick="handleChange()"
                      onClick={toggleModal}
                    >
                      <span className="d-flex items-center justify-content-center">

                        <p className="m-0 p-0">
                          <FaVideo size={22} />
                        </p>
                        <p className="m-0 p-0 mx-2">Book Appointment</p>
                      </span>
                    </button>
                  </div> */}



                </div>
              </div>
              <div>
                <Content/>
              </div>
            </div>

            {/* <div className="doc-info-right">
                <div className="clini-infos">
                  <ul>
                    <li>
                      <i className="far fa-thumbs-up" /> 99%
                    </li>
                    <li>
                      <i className="far fa-comment" /> 35 Feedback
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt" /> Newyork, USA
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt" /> $100 per hour{" "}
                    </li>
                  </ul>
                </div>
                <div className="doctor-action">
                  <Link to="#" className="btn btn-white fav-btn">
                    <i className="far fa-bookmark" />
                  </Link>
                  <Link
                    to="/doctor/chat-doctor"
                    className="btn btn-white msg-btn"
                  >
                    <i className="far fa-comment-alt" />
                  </Link>

                  <Link
                    to="#"
                    className="btn btn-white call-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#voice_call"
                  >
                    <i className="fas fa-phone" />
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-white call-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#video_call"
                  >
                    <i className="fas fa-video" />
                  </Link>
                </div>
                <div className="clinic-booking">
                  <button className="login-btn-login"
                    // onClick={handleToggleModal}
                    onClick={toggleModal}
                  //  className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"
                  >
                    Book Appointment
                  </button>
                </div>
              </div> */}

            <div className="modal fade call-modal" id="voice_call">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Outgoing Call */}
                    <div className="call-box incoming-box">
                      <div className="call-wrapper">
                        <div className="call-inner">
                          <div className="call-user">
                            <img
                              alt="User Image"
                              src={doctorthumb02}
                              className="call-avatar"
                            />
                            <h4>Dr. Darren Elder</h4>
                            <span>Connecting...</span>
                          </div>
                          <div className="call-items">
                            <Link
                              to="#"
                              className="btn call-item call-end"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <i className="material-icons">call_end</i>
                            </Link>
                            <Link
                              to="/pages/voice-call"
                              className="btn call-item call-start"
                            >
                              <i className="material-icons">call</i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Outgoing Call */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade call-modal" id="video_call">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    {/* Incoming Call */}
                    <div className="call-box incoming-box">
                      <div className="call-wrapper">
                        <div className="call-inner">
                          <div className="call-user">
                            <img
                              className="call-avatar"
                              src={doctorthumb02}
                              alt="User Image"
                            />
                            <h4>Dr. Darren Elder</h4>
                            <span>Calling ...</span>
                          </div>
                          <div className="call-items">
                            <Link
                              to="#"
                              className="btn call-item call-end"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <i className="material-icons">call_end</i>
                            </Link>
                            <Link
                              to="/pages/video-call"
                              className="btn call-item call-start"
                            >
                              <i className="material-icons">videocam</i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Incoming Call */}
                  </div>
                </div>
              </div>
            </div>
          </div></div>
      </div>
    </>
  );
};

export default Pagecontent;
