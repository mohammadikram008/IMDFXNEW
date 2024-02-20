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

///slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Modal } from "antd";
const TimeModel = ({ TimePop, setTimePop, handleModalClose, doctorDetail }) => {
  console.log("doctorDetail", doctorDetail);
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
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
    setSelectedDate(null);
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

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    console.log(`Selected time slot: ${timeSlot}`);
  };

  const isProceedBtnEnabled = selectedDate !== null && selectedTimeSlot !== null;
  console.log("isProceedBtnEnabled", isProceedBtnEnabled)
  const renderDateContainers = () => {
    const numberOfDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const dateContainers = [];

    for (let day = 1; day <= numberOfDays; day++) {
      const formattedDate = `${day}`;
      const isSelected = day === selectedDate;

      dateContainers.push(
        <div key={day} className=" ">
          <div
            className={`date-container  cursor-pointer  ${isSelected ? "background-gradient" : "border-black"}`}
            onClick={() => handleDateClick(day)}
          >
            <div>{formattedDate}</div>
            <div>{monthNames[currentDate.getMonth()]}</div>
          </div>
        </div>
      );
    }

    return dateContainers;
  };
  // const renderDateContainers = () => {
  //     console.log("click");
  //     const numberOfDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  //     const dateContainers = [];

  //     for (let day = 1; day <= numberOfDays; day++) {
  //       const formattedDate = `${day}`;

  //       const isSelected = day === selectedDate;
  //       dateContainers.push(
  //         <div key={day} className="">
  //           <div
  //             className={` d-flex flex-column justify-content-center align-items-center ${isSelected ? "date-container-selected" : "date-container"}`}
  //             onClick={() => handleDateClick(day)}
  //           >
  //             <div>{formattedDate}</div>
  //             <div>
  //               <h5>{monthNames[currentDate.getMonth()]}</h5>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     }

  //     return dateContainers;
  //   };

  const renderTimeSlotContainers = (timeSlots) => {
    return timeSlots.map((timeSlot, index) => (
      <div
        key={index}
        className={`time-slot-container mt-3  md:flex flex-col items-center justify-center md:mx-3   w-44  `}
        onClick={() => handleTimeSlotClick(timeSlot)}
      >
        <button className={` ${selectedTimeSlot === timeSlot ? "  btn-slot-click" : " btn-slot-select"}`}>
          {timeSlot}
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
    nextArrow: null, // Hides the next arrow
    prevArrow: null,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
                  <div className=" col-sm-8 col-md-12 text-sm-end">
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
                      {renderTimeSlotContainers(["8:00 AM", "10:00 AM"])}
                    </div>
                  </div>
                  <div className="border p-4  text-center rounded-md shadow">
                    <div className="slot-headinf-imgtext mb-3">
                      <MdOutlineNightlightRound size={26} color="#87ceeb" className="slot-icon" />
                      <h2 className="text-lg font-bold">Evening Slots</h2>
                    </div>
                    <div className="d-flex flex-column md:flex-row align-items-center justify-content-center">
                      {renderTimeSlotContainers(["6:00 PM", "8:00 PM"])}
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

























