import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IMG01 from "../../../assets/images/doc1.jpg";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import "bootstrap-daterangepicker/daterangepicker.css";
import Header from "../../header";
import Footer from "../../footer";
import doc_cover from '../../../assets/images/doccover.png'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { IoMdSunny } from "react-icons/io";
import { MdOutlineNightlightRound } from "react-icons/md";

const Booking = (props) => {
  const history = useHistory();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
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

  const handleDateClick = (day) => {
    const date = `${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    setSelectedDate(date);
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

      // console.log("isSelected",isSelected);
      // console.log("dayssssssssssss",day);
      dateContainers.push(
        <div key={day} className=" ">
          <div
            className={`date-container  d-flex flex-column justify-content-center align-items-center ${selectedDateSlot ? "date-container-selected" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            <div>{formattedDate}</div>
            <div>
              <h5>
                {monthNames[currentDate.getMonth()]}
              </h5>
            </div>
          </div>
        </div>
      );
    }

    return dateContainers;
  };

  const renderTimeSlotContainers = (timeSlots) => {
    return timeSlots.map((timeSlot, index) => (
      <div
        key={index}
        className={`time-slot-container mt-3  md:flex flex-col items-center justify-center md:mx-3   w-44  `}
        onClick={() => handleTimeSlotClick(timeSlot)}
      >
        <button className={` ${selectedTimeSlot === timeSlot ? "  btn-slot-click" : "login-btn-login btn-slot-select"}`}>
          {timeSlot}
        </button>
      </div>
    ));
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
        items: 6
      },
      1000: {
        items: 14
      }
    }
  };



  const handleChangePay = () => {

    if (isProceedBtnEnabled) {
      // Redirect to the checkout page or perform other actions
      // window.location.href = "/patient/checkout";
      console.log("selectedDate", selectedDate);
      console.log("selectedTimeSlot", selectedTimeSlot);
      history.push({
        pathname: "/patient/checkout",
        state: { selectedDate, selectedTimeSlot },
      });
    }

  }

  return (
    <div>
      <Header {...props} />
      <div className="breadcrumb-bar-two">
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
            <div className="card-doc-img">
              <div className="card-body">
                <div className="booking-doc-info">
                  <Link
                    to="/patient/doctor-profile"
                    className="booking-doc-img"
                  >
                    <img src={IMG01} alt="User" />
                  </Link>
                  <div className="booking-info">
                    <h4>
                      Dr. Darren Elder
                    </h4>
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating ms-1">
                        35
                      </span>
                    </div>
                    <p className=" mb-0">
                      <i className="fas fa-map-marker-alt"></i> Newyork, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className=" col-sm-4 col-md-9"></div>
                <div className=" col-sm-8 col-md-3 text-sm-end">
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
                  <OwlCarousel {...owlOptions}>
                    {renderDateContainers()}
                  </OwlCarousel>
                </div>
              </div>
              <div className="container mt-4 slot-main-div">
                <div className="border p-4 text-center rounded-md shadow">
                  <div className=" mb-3 slot-heading-imgtext">
                    <IoMdSunny size={26} className="color-gradient" />
                    <h2 className="text-lg font-bold">Morning Slots</h2>
                  </div>
                  <div className="d-flex flex-column md:flex-row align-items-center justify-content-center">
                    {renderTimeSlotContainers(["8:00 AM", "10:00 AM"])}
                  </div>
                </div>
                <div className="border p-4  text-center rounded-md shadow">
                  <div className="slot-headinf-imgtext mb-3">
                    <MdOutlineNightlightRound size={26} className="slot-icon" />
                    <h2 className="text-lg font-bold">Evening Slots</h2>
                  </div>
                  <div className="d-flex flex-column md:flex-row align-items-center justify-content-center">
                    {renderTimeSlotContainers(["6:00 PM", "8:00 PM"])}
                  </div>
                </div>
              </div>
              {/* <div className="submit-section proceed-btn text-end">
                <Link
                  to={isProceedBtnEnabled ? "/patient/checkout" : "#"}
                  className={`login-btn-login pay-btn ${isProceedBtnEnabled ? "" : "disabled"}`}
                >
                  Proceed to Pay
                </Link>
              </div> */}
              <div className="submit-section proceed-btn text-end">
                <button
                  onClick={() => handleChangePay()}
                  className={` ${isProceedBtnEnabled ? "pay-btn" : "pay-btn-dis"}`}
                  disabled={!isProceedBtnEnabled}
                >
                  Proceed to Pay
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default Booking;
