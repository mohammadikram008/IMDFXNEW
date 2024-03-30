import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import DoctorSidebar from "../sidebar";
import Header from "../../header";
import Footer from "../../footer";

const AvailableTiming = (props) => {
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const docId = localStorage.getItem('token');

  const handleSave = async () => {
    if (startDate && endDate && startTime && endTime) {
      const StartDate = startDate.split('T')[0];
      const EndDate = endDate.split('T')[0];
      try {
        const response = await axios.post(`http://localhost:3005/api/doctorAvailableTimings`, {
          doc_id: docId,
          startDate:StartDate,
          endDate:EndDate,
          sessions: [{
            date: StartDate,
            startTime,
            endTime,
          }]
        });

        console.log("API Response:", response.data);
        toast.success("Time added successfully");
      } catch (error) {
        console.error("Error making API call:", error);
        toast.error(error.message);
      }
    } else {
      alert("Please select both start and end dates, as well as start and end times before saving.");
    }
  };

  return (
    <>
      <Header {...props} />
      <div className="content">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-2 col-lg-2 col-xl-2 "></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar ">
              <DoctorSidebar />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 ">
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
                                  <span className="input-group-text">Start Date:</span>
                                  <div className="me-3">
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="start_date"
                                      value={startDate}
                                      onChange={handleStartDateChange}
                                    />
                                  </div>
                                  <span className="input-group-text">End Date:</span>
                                  <div className="me-3">
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="end_date"
                                      value={endDate}
                                      onChange={handleEndDateChange}
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-6 col-12">
                            <h5>Start Time:</h5>
                            <input
                              type="time"
                              className="form-control"
                              value={startTime}
                              onChange={handleStartTimeChange}
                            />
                          </div>
                          <div className="col-sm-6 col-12">
                            <h5>End Time:</h5>
                            <input
                              type="time"
                              className="form-control"
                              value={endTime}
                              onChange={handleEndTimeChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <button className="btn btn-primary" onClick={handleSave}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 "></div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer {...props} />
    </>
  );
};

export default AvailableTiming;
