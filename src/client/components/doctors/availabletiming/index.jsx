import React, { useState,useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import DoctorSidebar from "../sidebar";
import Header from "../../header";
import Footer from "../../footer";
import { Link } from "react-router-dom";
const AvailableTiming = (props) => {
  const docId = localStorage.getItem('token');
  /////new code 
  const [once, setonce] = useState({ date: "", timefrom: "", timetill: "" });
  const [daily, setdaily] = useState({ datefrom: "", datetill: "", timefrom: "", timetill: "" });
  const [weekly, setweekly] = useState({ day: "", timefrom: "", timetill: ""});


  const handleOnceSave = async () => {
    // Add your logic to save Once data
    console.log("Saving Once data:", once);
    // Example API call
    try {
      const response = await axios.put(`https://imdfx-newserver-production.up.railway.app/api/updatedoctortimeslot/${docId}`, {once});
      console.log("Once data saved successfully:", response.data);
      toast.success("Once data saved successfully");
    } catch (error) {
      console.error("Error saving Once data:", error);
      toast.error("Error saving Once data");
    }
  };

  const handleDailySave = async () => {
    // Add your logic to save Daily data
    console.log("Saving Daily data:", daily);
    // Example API call
    try {
      const response = await axios.put(`https://imdfx-newserver-production.up.railway.app/api/updatedoctortimeslot/${docId}`, {daily});
      console.log("Daily data saved successfully:", response.data);
      toast.success("Daily data saved successfully");
    } catch (error) {
      console.error("Error saving Daily data:", error);
      toast.error("Error saving Daily data");
    }
  };

  const handleWeeklySave = async () => {
    let { timefrom, timetill } = weekly;
    const timefromParts = timefrom.split(':');
    const timetillParts = timetill.split(':');
    
    let startHour = parseInt(timefromParts[0], 10);
    let endHour = parseInt(timetillParts[0], 10);

    // Adjust hour according to period (AM/PM)
    if (weekly.timefrom.period === 'PM' && startHour < 12) {
        startHour += 12;
    }
    if (weekly.timetill.period === 'PM' && endHour < 12) {
        endHour += 12;
    }

    // Convert back to AM/PM format if needed
    const period = startHour >= 12 ? 'PM' : 'AM';
    startHour = startHour % 12 || 12;
    const periodEnd = endHour >= 12 ? 'PM' : 'AM';
    endHour = endHour % 12 || 12;

    // Create formatted time strings
    const formattedTimeFrom = `${startHour.toString().padStart(2, '0')}:${timefromParts[1]} ${period}`;
    const formattedTimeTill = `${endHour.toString().padStart(2, '0')}:${timetillParts[1]} ${periodEnd}`;

    // Prepare data to send
    const weeks = {
        day: weekly.day,
        timefrom: formattedTimeFrom,
        timetill: formattedTimeTill,
    };

    // Add your logic to save Weekly data
    // console.log("Saving Weekly data:", dataToSend);
    // Example API call
    try {
        const response = await axios.put(`http://localhost:3005/api/updatedoctortimeslot/${docId}`, { weeks });
        console.log("Weekly data saved successfully:", response.data);
        toast.success("Weekly data saved successfully");
    } catch (error) {
        console.error("Error saving Weekly data:", error);
        toast.error("Error saving Weekly data");
    }
};
  /////
  const [Doctor, setDoctor] = useState([]);
  const fetchpatientdata = async () => {
    try {
     
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getDoctorDetail/${docId}`);
      setDoctor(response.data);
      const doctordata = response.data
      // setDoctorStatus(doctordata.status);
      // console.log("status", doctordata.status);

    } catch (error) {
      console.error('Error fetching getDoctorDetail:', error);
  
    }
  };

  useEffect(() => {
    fetchpatientdata()


  }, []);

  return (
    <>
      <Header {...props} />
      <div className="content">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-2 col-lg-2 col-xl-2 "></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar ">
            <DoctorSidebar props={Doctor} />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 ">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Schedule Timings</h4>
                      {/* Tab Menu */}
                      <nav className="user-tabs mb-4">
                        <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                          <li className="nav-item">
                            <Link className="nav-link " to="#once" data-bs-toggle="tab">
                              Once
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link active" to="#daily" data-bs-toggle="tab">
                              Daily
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="#weekly" data-bs-toggle="tab">
                              Weekly
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      {/* Tab Content */}
                      <div className="tab-content pt-0">
                        {/* Once Tab */}
                        <div className="tab-pane fade" id="once">
                          <div className="card mb-0">
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={once.date}
                                  onChange={(e) => setonce({ ...once, date: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Start Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={once.timefrom}
                                  onChange={(e) => setonce({ ...once, timefrom: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">End Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={once.timetill}
                                  onChange={(e) => setonce({ ...once, timetill: e.target.value })}
                                />
                              </div>
                              <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={handleOnceSave}>
                                  Save Once Data
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Daily Tab */}
                        <div id="daily" className="tab-pane fade show active">
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label">Start Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={daily.datefrom}
                                  onChange={(e) => setdaily({ ...daily, datefrom: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">End Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={daily.datetill}
                                  onChange={(e) => setdaily({ ...daily, datetill: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Start Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={daily.timefrom}
                                  onChange={(e) => setdaily({ ...daily, timefrom: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">End Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={daily.timetill}
                                  onChange={(e) => setdaily({ ...daily, timetill: e.target.value })}
                                />
                              </div>
                              <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={handleDailySave}>
                                  Save Daily Data
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Weekly Tab */}
                        <div className="tab-pane fade" id="weekly">
                          <div className="card card-table mb-0">
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label">Select Day</label>
                                <select
                                  className="form-select"
                                  value={weekly.day}
                                  onChange={(e) => setweekly({ ...weekly, day: e.target.value })}
                                >
                                  <option value="">Select Day</option>
                                  <option value="Monday">Monday</option>
                                  <option value="Tuesday">Tuesday</option>
                                  <option value="Wednesday">Wednesday</option>
                                  <option value="Thursday">Thursday</option>
                                  <option value="Friday">Friday</option>
                                  <option value="Saturday">Saturday</option>
                                  <option value="Sunday">Sunday</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Start Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={weekly.timefrom}
                                  onChange={(e) => setweekly({ ...weekly, timefrom: e.target.value })}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">End Time</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={weekly.timetill}
                                  onChange={(e) => setweekly({ ...weekly, timetill: e.target.value })}
                                />
                              </div>
                              {/* Selected slots display */}
                              {/* {weekly.selectedSlots.length > 0 && (
                                <div className="mb-3">
                                  <label className="form-label">Selected Slots</label>
                                  <ul className="list-group">
                                    {weekly.selectedSlots.map((slot, index) => (
                                      <li key={index} className="list-group-item">
                                        {slot.timefrom} - {slot.timetill}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )} */}
                              <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={handleWeeklySave}>
                                  Save Weekly Data
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
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 "></div>
          </div>
        </div>
      </div >
      <ToastContainer />
      <Footer {...props} />
    </>
  );
};

export default AvailableTiming;


