import React, { Fragment, useState, useEffect } from "react";
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
  // const docId = localStorage.getItem('token');
  const docId = doctorDetail && doctorDetail._id;
  // console.log("docId", docId);
  const history = useHistory();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize with today's date
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState();
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDateSlot, setSelectedDateSlot] = useState(false);
  const [doctorTimeDetail, setDoctorTimeDetail] = useState([]);
  const [selectedTime, setSelectTime] = useState([]);
  const [isProceedBtnEnabled,setisProceedBtnEnabled]=useState(false)
  // Fetch doctor available time details based on selected date
  const fetchDoctorAvailableTimeDetail = async () => {
    try {
      const today = new Date();
      const currentDay = today.getDate();
      const getDayName = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
      };

      // // Get the day name of today
      const dayname = getDayName(today);
      setSelectedDate(currentDay);
     
      const response = await axios.get(`http://localhost:3005/api/check-doctor-availability/${docId}/${dayname}`);
     
      setSelectTime(response.data)
    } catch (error) {
      console.error('Error fetching doctor Time details:', error);
    }
  };

  useEffect(() => {
    fetchDoctorAvailableTimeDetail();
  }, [docId]);

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

  // Function to format date string
  function formatDate(dateString) {
    const parts = dateString.split(' '); // Split the string by space
    const day = parts[0]; // Extract the day part
    const month = getMonthNumber(parts[1]); // Convert month name to month number
    const year = parts[2]; // Extract the year part
    setStartDate(`${year}${month}${day}`); // Set startDate state
    setSelectedDateData(dateString); // Set selectedDateData state
  }

  // Function to get month number from month name
  function getMonthNumber(monthName) {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    return months[monthName];
  }


  // Function to handle date click
  const handleDateClick = (day) => {
    const date = `${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    setSelectedDate(day);
    setSelectedDateData(date);
  
    const dates = new Date(date);
    const dayIndex = dates.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[dayIndex];
    fetchDoctorBookingTime(dayName);
    setSelectedDateSlot(true);
    formatDate(date);
  };



  // Function to fetch doctor booking time
  const fetchDoctorBookingTime = async (dayname) => {
  
    try {
      const response = await axios.get(`http://localhost:3005/api/check-doctor-availability/${docId}/${dayname}`);
      setSelectTime(response.data)
      //  isProceedBtnEnabled = selectedDate !== null && selectedTimeSlot !== null;
      // const available = response.data.available;
      console.log("PPP",response.data.timeSlots);
      if ((response.data.timeSlots).length>0) {
      
      } else {
        setisProceedBtnEnabled(false)
       
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  // Function to fetch doctor booking time
  const fetchCheckBookingTime = async (timeSlot) => {

    try {
      const response = await axios.get(`http://localhost:3005/api/check-booking-availability/${docId}/${timeSlot}/${selectedDateData}`);
      // console.log("RES",response);
      // setSelectTime(response.data)
      const available = response.data.available;
      if (available) {
        setSelectedTimeSlot(timeSlot);
        setisProceedBtnEnabled(true)
      } else {
        alert("Doctor time slot has already been booked.");
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };
  // Function to handle time slot click
  const handleTimeSlotClick = (timeSlot) => {
    fetchCheckBookingTime(timeSlot);
  };

  // Function to render date containers
  const renderDateContainers = () => {
    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = today.getDate();
    const numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dateContainers = [];

    // console.log("numberOfDays", numberOfDays);
    // const getDayName = (date) => {
    //   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //   return daysOfWeek[date.getDay()];
    // };
    // console.log("today",today);
    // // Get the day name of today
    // const dayName = getDayName(today);
    // console.log("dayName", dayName);

    for (let day = 1; day <= numberOfDays; day++) {
      const isPastDate = currentMonth === today.getMonth() && day < currentDay;
      const isSelected = day === selectedDate;
      dateContainers.push(
        <div key={day} className=" ">
          <div
            className={`date-container  cursor-pointer  ${isSelected ? "background-gradient" : "border-black"}`}
            onClick={() => handleDateClick(day)}
          >
            <div>{day}</div>
            <div>{monthNames[currentMonth]}</div>
          </div>
        </div>
      );
      // if (!isPastDate || currentMonth < today.getMonth()) {
      //   const formattedDate = `${day}`;
      //   const isSelected = day === selectedDate;

      //   dateContainers.push(
      //     <div key={day} className=" ">
      //       <div
      //         className={`date-container  cursor-pointer  ${isSelected ? "background-gradient" : "border-black"}`}
      //         onClick={() => handleDateClick(day)}
      //       >
      //         <div>{formattedDate}</div>
      //         <div>{monthNames[currentMonth]}</div>
      //       </div>
      //     </div>
      //   );
      // }
    }

    return dateContainers;
  };

  // Function to render time slot containers
  const renderTimeSlotContainers = () => {
    return selectedTime.timeSlots && selectedTime.timeSlots.map((timeSlot, index) => (

      timeSlot.timefrom ?
        <div key={index} className="col-lg-6 col-md-6 col-sm-12 mt-2" >
          <button className={` ${selectedTimeSlot === timeSlot.timefrom ? "btn-slot-click" : "btn-slot-select"}`} onClick={() => handleTimeSlotClick(timeSlot.timefrom)}>
            <p>{timeSlot.timefrom ? timeSlot.timefrom : "No Appointment this date"}</p>
          </button>
        </div>
        : "No Appointment this date"


    ));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 6,
    slidesToScroll: 2,
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
                <h3 className="">Book Appointment</h3>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center justify-content-between date-btn-icon">
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
                    <Slider {...settings} className="slick-lists" >
                      {renderDateContainers()}
                    </Slider>
                  </div>
                </div>
              
                    <div className="container">
                      <div className="border p-4 text-center rounded-md shadow" style={{ marginTop: '-3rem' }}>
                        <div className="mb-3 slot-heading-imgtext">
                          {/* <IoMdSunny size={26} className="color-gradient" color="orange" /> */}
                          <h2 className="text-lg font-bold"> Select Time Slots</h2>
                        </div>
                       { selectedTime.timeSlots && (selectedTime.timeSlots).length >0 ?
                        <div className="row slots-show-row" >
                        {renderTimeSlotContainers()}
                        </div>
                         : <div className="slots-show-row">"No Slots are available on  this Day!  "</div>}
                      </div>
                    </div>
                 

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  style={{
                    background: !isProceedBtnEnabled ? "gray" : "linear-gradient(to bottom, #ffcc00 0%, #ff9900 98%)"
                  }}
                  className={` ${isProceedBtnEnabled ? "pay-btn" : "pay-btn-dis"}`}
                  disabled={!isProceedBtnEnabled}
                  onClick={handleChangePay}
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
