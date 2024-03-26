import React, { useState } from "react";
import { IoMdSunny } from 'react-icons/io';
import { MdOutlineNightlightRound } from 'react-icons/md';
import OwlCarousel from 'react-owl-carousel';
import './ani.css'
import { Link, useHistory } from "react-router-dom";
import IMG01 from "../../../assets/images/doc1.jpg";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import "bootstrap-daterangepicker/daterangepicker.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from "axios";
///slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Modal } from "antd";
const TimeModel = ({ TimePop, setTimePop, handleModalClose, doctorDetail, doctorTimeDetails }) => {

  const doc_id=doctorDetail && doctorDetail._id;
  console.log("doc_id", doc_id);

  const history = useHistory();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDateSlot, setSelectedDateSlote] = useState(false);


  const incrementMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const decrementMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const incrementYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
    setSelectedDate(null);
  };

  const decrementYear = () => {
    const currentYear = new Date().getFullYear();
    const minimumYear = 2024; // Change this to your desired minimum year
    if (currentDate.getFullYear() > minimumYear) {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
        setSelectedDate(null);
    }
    // Disable the decrement button if the current year is the minimum year
    const decrementBtn = document.querySelector(".decrementYear");
    if (currentDate.getFullYear() === minimumYear) {
        decrementBtn.disabled = true;
    } else {
        decrementBtn.disabled = false;
    }
};



  // const handleDateClick = (day) => {
  //     setSelectedDate(day);
  //     console.log(`Selected date: ${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
  // };

  const handleDateClick = (day) => {
    const date = `${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    setSelectedDate(day);
    setSelectedDateData(date)
    setSelectedDateSlote(true)
    console.log("day", date)
    console.log(`Selected date: ${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
  };

  const fetchDoctorBookingTime = async (timeSlot) => {
    console.log("selectedDate",selectedDateData);
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/check-doctor-availability/${doc_id}/${timeSlot}/${selectedDateData}`);
      // setDoctorTimeDetail(response.data.available);
      console.log("BookingAV",response.data.available);
      const avaible=response.data.available;
      if(avaible){
        // alert("docter time is avaible ")
        setSelectedTimeSlot(timeSlot);
      }else{
        alert("docter timeSlote has book already with some one ")
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const handleTimeSlotClick = (timeSlot) => {
   
    fetchDoctorBookingTime(timeSlot)
    console.log(`Selected time slot: ${timeSlot}`);
  };

  const isProceedBtnEnabled = selectedDate !== null && selectedTimeSlot !== null;
  console.log("isProceedBtnEnabled", isProceedBtnEnabled)
  // const renderDateContainers = () => {
  //   const numberOfDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  //   const dateContainers = [];

  //   for (let day = 1; day <= numberOfDays; day++) {
  //     const formattedDate = `${day}`;
  //     const isSelected = day === selectedDate;

  //     dateContainers.push(
  //       <div key={day} className=" ">
  //         <div
  //           className={`date-container  cursor-pointer  ${isSelected ? "background-gradient" : "border-black"}`}
  //           onClick={() => handleDateClick(day)}
  //         >
  //           <div>{formattedDate}</div>
  //           <div>{monthNames[currentDate.getMonth()]}</div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return dateContainers;
  // };
  const renderDateContainers = () => {
    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = today.getDate();
    const numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dateContainers = [];

    for (let day = 1; day <= numberOfDays; day++) {
        // Check if it's the current month and the day is past
        const isPastDate = currentMonth === today.getMonth() && day < currentDay;

        // Render dates only from the current date onwards for the current month
        // Render all dates for future months
        if (!isPastDate || currentMonth < today.getMonth()) {
            const formattedDate = `${day}`;
            const isSelected = day === selectedDate;

            dateContainers.push(
                <div key={day} className=" ">
                    <div
                        className={`date-container  cursor-pointer  ${isSelected ? "background-gradient" : "border-black"}`}
                        onClick={() => handleDateClick(day)}
                    >
                        <div>{formattedDate}</div>
                        <div>{monthNames[currentMonth]}</div>
                    </div>
                </div>
            );
        }
    }

    return dateContainers;
};



 
  const renderTimeSlotContainers = () => {
    return doctorTimeDetails && doctorTimeDetails.map((timeSlot, index) => (
     
      <div
        key={index}
        className={`time-slot-container mt-3  md:flex flex-col items-center justify-center md:mx-3   w-44  `}
      >
        <button
          onClick={() => handleTimeSlotClick(timeSlot.session1.startTime)}
          className={` ${selectedTimeSlot === timeSlot.session1.startTime ? "  btn-slot-click " : " btn-slot-select"}`}
        >
        
          <p> {timeSlot.session1.startTime ?timeSlot.session1.startTime:"Doctor is not Avaible in this Time"}</p>
        </button>
        <button
          onClick={() => handleTimeSlotClick(timeSlot.session1.endTime)}
          className={` ${selectedTimeSlot === timeSlot.session1.endTime ? "  btn-slot-click mt-2" : " btn-slot-select mt-2"}`}
        >
          <p> {timeSlot.session1.endTime?timeSlot.session1.endTime:"Doctor is not Avaible in this Time"}</p>
        </button>
      </div>
    ));
  };
  const renderTimeSlotContainer = () => {
    return doctorTimeDetails && doctorTimeDetails.map((timeSlot, index) => (

      <div
        key={index}
        className={`time-slot-container mt-3  md:flex flex-col items-center justify-center md:mx-3   w-44  `}
      >
        <button
          onClick={() => handleTimeSlotClick(timeSlot.session2.startTime)}
          className={` ${selectedTimeSlot === timeSlot.session2.startTime ? "  btn-slot-click" : " btn-slot-select "}`}
        >
          <p> {timeSlot.session2.startTime?timeSlot.session2.startTime:"Doctor is not Avaible in this Time"}</p>
        </button>
        <button
          onClick={() => handleTimeSlotClick(timeSlot.session2.endTime)}
          className={` ${selectedTimeSlot === timeSlot.session2.endTime ? "  btn-slot-click mt-2" : " btn-slot-select mt-2"}`}
        >
          {/* <p>Date: {timeSlot.date}</p> */}
          {/* <p>Doctor ID: {timeSlot.doc_id}</p>
               <p>Session 1 Start Time: {timeSlot.session1.startTime}</p>
               <p>Session 1 End Time: {timeSlot.session1.endTime}</p>
               <p>Session 2 Start Time: {timeSlot.session2.startTime}</p>
               <p>Session 2 End Time: {timeSlot.session2.endTime}</p> */}
          <p> {timeSlot.session2.endTime?timeSlot.session2.endTime:"Doctor is not Avaible in this Time"}</p>
        </button>
      </div>
    ));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: null,
    prevArrow: null,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 5,
          dots: false,

        },
      },
    ],
  };

  const owlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 4
      },
      1000: {
        items: 6
      }
    }
  };

  const handleChangePay = () => {

    if (isProceedBtnEnabled) {
      // Redirect to the checkout page or perform other actions
      // window.location.href = "/patient/checkout";
      // console.log("selectedDate", selectedDate);
      // console.log("selectedTimeSlot", selectedTimeSlot);
      // console.log(doctorDetail)
      history.push({
        pathname: "/patient/checkout",
        state: { selectedDateData, selectedTimeSlot, doctorDetail },
      });
    }

  }
  return (
    <>
      <Modal
        centered
        visible={TimePop}
        onOk={() => setTimePop(!TimePop)}
        onCancel={() => setTimePop(!TimePop)}
        styles={{
          width: "40vw",
          content: {
            borderRadius: "25px",
            backgroundColor: "#ffffff",
          },
        }}
        okButtonProps={{
          disabled: true,
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          disabled: true,
          style: {
            display: "none",
          },
        }}
      >
        <div className="mt-5 z-3 h-50 " tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Appointment</h5>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center justify-content-between date-btn-icon">
                  {/* <div className=" col-sm-8 col-md-4 text-sm-end"></div> */}
                  <div className=" model-heading-tag col-md-12 text-sm-end">
                    <div className="datepicker-icon">
                      <div className="border p-4 mt-4 rounded-md shadow">

                        <div className="d-flex align-items-center justify-content-between mt-4">
                          <button onClick={decrementYear} className=" decrementYear">
                            <BsCaretLeftFill />
                          </button>
                          <div className="d-flex align-items-center">
                            <button onClick={decrementMonth} className=" decrementMonth">
                              <BsCaretLeftFill />
                            </button>
                            <span className="h5 font-weight-bold mx-3">
                              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </span>
                            <button onClick={incrementMonth} className=" incrementMonth">
                              <BsCaretRightFill />
                            </button>
                          </div>
                          <button onClick={incrementYear} className=" incrementYear">
                            <BsCaretRightFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card booking-schedule schedule-widget">
                  <div className="schedule-header">
                    <style>
                      {`
                      .slick-track{
                        width:"max-content"
                      }
                      `}
                    </style>
                    {/* <OwlCarousel {...owlOptions}>
                      {renderDateContainers()}
                    </OwlCarousel> */}
                    <Slider {...settings} className="slick-lists" >
                      {renderDateContainers()}
                    </Slider>
                  </div>
                </div>
                <div className="container  slot-main-div">
                  <div className="border p-4 text-center rounded-md shadow">
                    <div className=" mb-3 slot-heading-imgtext">
                      <IoMdSunny size={26} className="color-gradient" color="orange" />
                      <h2 className="text-lg font-bold">Morning Slots</h2>
                    </div>
                    <div className="d-flex flex-column md:flex-row align-items-center justify-content-center">
                      {doctorTimeDetails && doctorTimeDetails.length > 0 ?renderTimeSlotContainers():<p>Doctor is not avaible in this time!</p>}
                    </div>
                  </div>
                  <div className="border p-4  text-center rounded-md shadow">
                    <div className="slot-headinf-imgtext mb-3">
                      <MdOutlineNightlightRound size={26} color="#87ceeb" className="slot-icon" />
                      <h2 className="text-lg font-bold">Evening Slots</h2>
                    </div>
                    <div className="d-flex flex-column md:flex-row align-items-center justify-content-center">
                      {/* {renderTimeSlotContainer()} */}
                      {doctorTimeDetails && doctorTimeDetails.length > 0 ?renderTimeSlotContainer():<p>Doctor is not avaible in this time!</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button> */}
                <button
                  type="button"
                  style={{
                    background: !isProceedBtnEnabled ? "gray" : "linear-gradient(to bottom, #ffcc00 0%, #ff9900 98%)"
                  }}
                  // className="btn btn-primary"
                  onClick={() => handleChangePay()}
                  className={` ${isProceedBtnEnabled ? "pay-btn" : "pay-btn-dis"}`}
                  disabled={!isProceedBtnEnabled}
                // onClick={() => {
                //   // Handle booking confirmation logic here
                //   // Close the modal
                //   handleModalClose();
                // }}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>




  );
};

export default TimeModel;

























