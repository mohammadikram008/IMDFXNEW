import React, { useState } from "react";
import axios from 'axios';
// import { IMG01 } from "./img";
import { Link } from "react-router-dom";
// import Header from "../../patients/dashboard/header";
import Header from "../../header";
import Footer from "../../footer";

import { ToastContainer, toast } from "react-toastify";
import DoctorSidebar from "../sidebar";

const AvailableTiming = (props) => {
  const [selectedDate, setSelectedDate] = useState(); // Initialize with your default date
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time
  const [selectedTime2, setSelectedTime2] = useState(""); // State to store selected time

  // Function to handle checkbox selection
  const handleCheckboxChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleCheckboxChange2 = (event) => {
    setSelectedTime2(event.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const docId = localStorage.getItem('token');
console.log("docId",docId);
  const handleSave = async () => {
    if (selectedDate && selectedTime && selectedTime2) {
      try {
        // Make API call with selected data
        // const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/doc_appointments/${docId}`);
        const response = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/doc_avaibletime/${docId}`, {

          date: selectedDate,
          session1: {
            startTime: "08:00 AM",
            endTime: selectedTime,
          },
          session2: {
            startTime: "04:00 PM",
            endTime: selectedTime2,
          },
        });

        console.log("API Response:", response.data);
        toast.success("Time add successFull");
      } catch (error) {
        console.error("Error making API call:", error);
        toast.error(error);
      }
    } else {
      alert("Please select start and end times for both sessions before saving.");
    }
  };
  return (
    <>

      <Header {...props} />
      <div className="content">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar ">
              <DoctorSidebar />
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9 ">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Schedule Timings</h4>
                      <div className="profile-box">
                        <div className="row">
                          <div className="col-sm-6 col-12 avail-time">
                            <div className="mb-3">
                              <div className="schedule-calendar-col justify-content-start">
                                <form className="d-flex flex-wrap">
                                  <span className="input-group-text">
                                    Date:
                                  </span>
                                  <div className="me-3">
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="schedule_date"
                                      id="schedule_date"
                                      value={selectedDate}
                                      onChange={handleDateChange}
                                    // min="2021-05-21"
                                    />
                                  </div>
                                  {/* <div className="search-time-mobile">
                                    <input
                                      type="submit"
                                      name="submit"
                                      value="Search"
                                      className="btn btn-primary h-100"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSave();
                                      }}
                                    />
                                  </div> */}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between items-aline-centee">
                          <div className="row">
                            <div className="col-lg-12">
                              <h3 className="h3 text-center book-btn2 mt-3 px-5 py-1 mx-3 rounded">
                                Morning
                              </h3>
                              <div className="text-center mt-3">
                                <h4 className="h4 mb-2">Start Time </h4>
                                <span className="h4 btn btn-outline-primary">
                                  <b> 08:00 AM</b>
                                </span>
                              </div>

                              <div className="token-slot mt-2">
                                <div className="form-check-inline visits me-1">
                                  <label className="visit-btns">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value="02:00 PM"
                                      onChange={handleCheckboxChange}
                                      checked={selectedTime === "02:00 PM"}
                                    />
                                    <span className="visit-rsn" data-bs-toggle="tooltip" title="02:00 PM">
                                      02:00 PM
                                    </span>
                                  </label>
                                </div>
                                <div className="form-check-inline visits me-1">
                                  <label className="visit-btns">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value="04:00 PM"
                                      onChange={handleCheckboxChange}
                                      checked={selectedTime === "04:00 PM"}
                                    />
                                    <span className="visit-rsn" data-bs-toggle="tooltip" title="04:00 PM">
                                      04:00 PM
                                    </span>
                                  </label>
                                </div>
                                {/* Add more checkboxes as needed */}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <h3 className="h3 text-center book-btn2 mt-3 px-5 py-1 mx-3 rounded">
                                {/* 2<sup>nd</sup> Session */}Evening
                              </h3>
                              <div className="text-center mt-3">
                                <h4 className="h4 mb-2">Start Time </h4>
                                <span className="h4 btn btn-outline-primary">
                                  <b> 04:00 PM</b>
                                </span>
                              </div>

                              <div className="token-slot mt-2">
                                <div className="form-check-inline visits me-1">
                                  <label className="visit-btns">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value="09:00 PM"
                                      onChange={handleCheckboxChange2}
                                      checked={selectedTime2 === "09:00 PM"}
                                    />
                                    <span className="visit-rsn" data-bs-toggle="tooltip" title="09:00 PM">
                                      09:00 PM
                                    </span>
                                  </label>
                                </div>
                                <div className="form-check-inline visits me-1">
                                  <label className="visit-btns">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value="10:00 PM"
                                      onChange={handleCheckboxChange2}
                                      checked={selectedTime2 === "10:00 PM"}
                                    />
                                    <span className="visit-rsn" data-bs-toggle="tooltip" title="10:00 PM">
                                      10:00 PM
                                    </span>
                                  </label>
                                </div>
                                {/* Add more checkboxes as needed */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button className={`btn btn-primary btn-timeavaible ${selectedTime ? 'enabled' : 'disabled'}`}
                          onClick={handleSave} disabled={!selectedTime} >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer {...props} />
    </>
    // <>
    //   <Header {...props} />
    //   {/* Breadcrumb */}
    //   {/* <div className="breadcrumb-bar-two">
    //     <div className="container">
    //       <div className="row align-items-center inner-banner">
    //         <div className="col-md-12 col-12 text-center">
    //           <h2 className="breadcrumb-title">Available Timings</h2>
    //           <nav aria-label="breadcrumb" className="page-breadcrumb">
    //             <ol className="breadcrumb">
    //               <li className="breadcrumb-item">
    //                 <Link to="/index-2">Home</Link>
    //               </li>
    //               <li className="breadcrumb-item" aria-current="page">
    //                 Available Timings
    //               </li>
    //             </ol>
    //           </nav>
    //         </div>
    //       </div>
    //     </div>
    //   </div> */}
    //   {/* /Breadcrumb */}
    //   {/* Page Content */}
    //   <div className="content">
    //     <div className="container">
    //       <div className="row mt-5">
    //         {/* <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div> */}
    //         <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar ">
    //           {/* Profile Sidebar */}
    //           <DoctorSidebar />
    //           {/* /Profile Sidebar */}
    //         </div>
    //         <div className="col-md-7 col-lg-8 col-xl-9 ">
    //           <div className="row">
    //             <div className="col-sm-12">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <h4 className="card-title">Schedule Timings</h4>
    //                   <div className="profile-box">
    //                     <div className="row">
    //                       <div className="col-sm-6 col-12 avail-time">
    //                         <div className="mb-3">
    //                           <div className="schedule-calendar-col justify-content-start">
    //                             <form className="d-flex flex-wrap">
    //                               <span className="input-group-text">
    //                                 Date:
    //                               </span>
    //                               <div className="me-3">
    //                                 <input
    //                                   type="date"
    //                                   className="form-control"
    //                                   name="schedule_date"
    //                                   id="schedule_date"
    //                                   defaultValue="2021-05-21"
    //                                   min="2021-05-21"
    //                                 />
    //                               </div>
    //                               {/* <div className="search-time-mobile">
    //                                 <input
    //                                   type="submit"
    //                                   name="submit"
    //                                   defaultValue="Search"
    //                                   className="btn btn-primary h-100"
    //                                 />
    //                               </div> */}
    //                             </form>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="d-flex justify-content-between items-aline-centee">


    //                       <div className="row">
    //                         <div className="col-lg-12">
    //                           <h3 className="h3 text-center book-btn2 mt-3 px-5 py-1 mx-3 rounded">
    //                             1<sup>st</sup> Session{" "}
    //                           </h3>
    //                           <div className="text-center mt-3">
    //                             <h4 className="h4 mb-2">Start Time </h4>
    //                             <span className="h4 btn btn-outline-primary">
    //                               <b> 08:00 AM</b>
    //                             </span>
    //                           </div>
    //                           <div className="token-slot mt-2">
    //                             <div className="form-check-inline visits me-1">
    //                               <label className="visit-btns">
    //                                 <input
    //                                   type="checkbox"
    //                                   className="form-check-input"
    //                                   defaultValue={18}
    //                                 />
    //                                 <span
    //                                   className="visit-rsn"
    //                                   data-bs-toggle="tooltip"
    //                                   title="02:00 PM"
    //                                 >
    //                                   02:00 PM
    //                                 </span>
    //                               </label>
    //                             </div>
    //                             <div className="form-check-inline visits me-1">
    //                               <label className="visit-btns">
    //                                 <input
    //                                   type="checkbox"
    //                                   className="form-check-input"
    //                                   data-date="2021-05-21"
    //                                   data-timezone="Asia/Calcutta"
    //                                   data-start-time="15:00:00"
    //                                   data-end-time="15:20:00"
    //                                   data-session={1}
    //                                   name="token[]"
    //                                   defaultValue={19}
    //                                 />
    //                                 <span
    //                                   className="visit-rsn"
    //                                   data-bs-toggle="tooltip"
    //                                   title="03:00 PM"
    //                                 >
    //                                   03:00 PM
    //                                 </span>
    //                               </label>
    //                             </div>


    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div className="row">
    //                         <div className="col-lg-12">
    //                           <h3 className="h3 text-center book-btn2 mt-3 px-5 py-1 mx-3 rounded">
    //                             2<sup>nd</sup> Session{" "}
    //                           </h3>
    //                           <div className="text-center mt-3">
    //                             <h4 className="h4 mb-2">Start Time </h4>
    //                             <span className="h4 btn btn-outline-primary">
    //                               <b> 04:00 PM</b>
    //                             </span>
    //                           </div>
    //                           <div className="token-slot mt-2">
    //                             <div className="form-check-inline visits me-1">
    //                               <label className="visit-btns">
    //                                 <input
    //                                   type="checkbox"
    //                                   className="form-check-input"
    //                                   defaultValue={18}
    //                                 />
    //                                 <span
    //                                   className="visit-rsn"
    //                                   data-bs-toggle="tooltip"
    //                                   title="08:00 PM"
    //                                 >
    //                                   08:00 PM
    //                                 </span>
    //                               </label>
    //                             </div>
    //                             <div className="form-check-inline visits me-1">
    //                               <label className="visit-btns">
    //                                 <input
    //                                   type="checkbox"
    //                                   className="form-check-input"
    //                                   defaultValue={18}
    //                                 />
    //                                 <span
    //                                   className="visit-rsn"
    //                                   data-bs-toggle="tooltip"
    //                                   title="10:00 PM"
    //                                 >
    //                                   10:00 PM
    //                                 </span>
    //                               </label>
    //                             </div>
    //                           </div>

    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="text-center">
    //                     <button className="btn btn-primary">Save</button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         {/* <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div> */}
    //       </div>
    //     </div>
    //   </div>
    //   {/* /Page Content */}
    //   <Footer {...props} />
    // </>
  );
};

export default AvailableTiming;
