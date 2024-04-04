import React, { useEffect, useState } from "react";
import DoctorSidebar from "../sidebar";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { Modal } from "react-bootstrap";
import IMG01 from './doctorAi.jpg'
import Header from "../../header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client";
import { backend_base } from "../../../..";
import { useCallModalStore } from "../../../../callModalStore";
const ENDPOINT = "https://imdfx-newserver-production.up.railway.app";

const ScheduleTiming = (props) => {
  const [addListEmp, setAddListEmp] = useState([""]);
  const [appointments, setAppointments] = useState([]);
  const [meetingId, setMeetingId] = useState();
  const [loading, setLoading] = useState(true);
  const docId = localStorage.getItem('token');
  const [notification, setNotification] = useState(null);
  const { setShowRingingModal, setPickerId, } = useCallModalStore()
  const askForCall = (buyerId, sellerId) => {
    const socket = io(backend_base);
    setPickerId(buyerId)
    setShowRingingModal(true)
    socket.emit("callRequestFromSeller", { buyerId, sellerId });
  };
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
      setAppointments(response.data);
      console.log("mypatient", response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchAppointments();
    // fetchpatientdata();
  }, []);
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);

  //   // Connect to Socket.IO server and join room with doctor's ID
  //   socket.on("connect", () => {
  //     socket.emit("doctorJoinRoom", docId, userId);
  //   });

  //   return () => socket.disconnect();
  // }, [docId, userId]);
  const handelAddEmp = () => {
    setAddListEmp([...addListEmp, " "]);
  };
  useEffect(() => { }, []);

  const handelRemoveEmp = (index) => {
    const listEmp = [...addListEmp];
    listEmp.splice(index, 1);
    setAddListEmp(listEmp);
  };
  const handleCall = (selectedDateTime, time, id, doctorname) => {

    setMeetingId(id);

    const currentDateTime = new Date();
    const appointmentDateTime = new Date(selectedDateTime);

    if (appointmentDateTime > currentDateTime) {
      const timeDifference = appointmentDateTime - currentDateTime;
      const remainingMinutes = Math.floor(timeDifference / (1000 * 60));

      // props.history.push(`/patient/waiting-page/${selectedDateTime}`); 
      props.history.push({
        pathname: `/patient/waiting-page`,
        state: { selectedDateTime }
      });

      // Use props.history.push
      //   props.history.push(`/patient/waiting-page`);  // Use props.history.push
    } else {
      const userId = id;
      console.log("userId", id);
      const socket = io("http://localhost:3005", { transports: ["websocket"] });
      const res = socket.emit("doctorJoinRoom", docId, userId);
      console.log("RES", res);

      myMeeting();
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:3005", { transports: ["websocket"] });
    // Listen for doctor's notification
    // const res = socket.emit("storeSocketId", {docId});
    socket.on("patientnotAvaible", (message) => {
      toast.success(message);
      // setCallerName(message); // Assuming the message contains the caller's name
      // setShowRingingModal(true);
      // initAudio()

      // console.log("message", message);
      // setNotification(message);
    });

    // return () => socket.disconnect();
  }, []);

  const handleMessage = () => {
    console.log("message");
  }
  const APP_ID = 549911561;
  const SERVER_SECRET = "cb161fefa2b3464f6da3590442f39d48";

  // Function to generate a unique channel ID based on current timestamp
  function generateUniqueChannelID() {
    const timestamp = Date.now();
    return `dynamic-channel-${timestamp}`;
  }
  const isCallDisabled = (selectedDateTime) => {
    const currentDateTime = new Date();
    const appointmentDateTime = new Date(selectedDateTime);

    return appointmentDateTime > currentDateTime;
  };
  const [channelID, setChannelID] = useState(generateUniqueChannelID());
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(null);

  const myMeeting = async (element) => {

    // const userId = meetingId;
    const userId = randomID(5)// Generate a random user ID
    const roomId = randomID(5) // Generate a random nonce
    console.log("userId", userId);
    console.log("roomId", roomId);

    try {
      // Generate Kit Token using the dynamic channel ID
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        APP_ID,
        SERVER_SECRET,
        "UM2Zb",
        roomId,
        userId,
        10000000000,
      );
      // Create ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call
      // zp.maxUsers(2);
      zp.joinRoom({
        showLeavingView: false,
        maxUsers: 2,
        container: element,
        showRoomTimer: true,
        showPreJoinView: false,
        enableCustomCallInvitationWaitingPage: true,
        enableCustomCallInvitationDialog: true,
        enableNotifyWhenAppRunningInBackgroundOrQuit: true,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onLeaveRoom: () => {
          // setShowRingingModal(false)
        }
      });

      setJoined(false);
    } catch (error) {
      setError(error);
    }
  };
  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  return (
    <div>
      <Header {...props} />
      <div>
        {/* {notification && (
          <div className="notification">
            <p>New Notification: {notification}</p>
          </div>
        )} */}
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-md-2 col-lg-2 col-xl-2 "></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <DoctorSidebar />
            </div>

            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="profile-box">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card schedule-widget mb-0">
                              <div className="schedule-header"></div>
                              <div className="tab-content schedule-cont">
                                <div
                                  id="slot_monday"
                                  className="tab-pane fade show active"
                                >

                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Your Appointments</span>
                                  </h4>
                                  {appointments &&
                                    appointments.map((item, index) => (
                                      <div className="d-flex justify-content-between gap-3 my-3 border p-4 rounded-2  flex-column time-card " key={index}>
                                        <div className="d-flex justify-content-between align-items-center gap-2">
                                          <div>
                                            <h3> {item.PatietnDetails && item.PatietnDetails.username}</h3>
                                            <p>Date: {item.appointmentDetails[0].selectedDate + "/ Time " + item.appointmentDetails[0].selectedTimeSlot}</p>
                                            <p>Gender: {item.appointmentDetails[0].gender} </p>
                                            <p>PatientAge: {item.appointmentDetails[0].patientAge} </p>
                                            <p>BookingFor: {item.appointmentDetails[0].bookingFor} </p>
                                            <p>Detail: {item.appointmentDetails[0].details} </p>
                                          </div>
                                          <div>
                                            <img src={IMG01} style={{
                                              width: "200px",
                                              height: "150px",
                                              borderRadius: "10px"
                                            }} />
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-self-end  align-items-center gap-2 calling-btn">
                                          {/* <button className="px-4 py-2 bg-white text-dark rounded-2 border">Cancel</button> */}
                                          <button onClick={() =>
                                            askForCall(item.PatietnDetails._id, docId)
                                            // handleCall(item.appointmentDetails[0].selectedDate, item.appointmentDetails[0].selectedTimeSlot, item.PatietnDetails._id)
                                          } className={`px-4 py-2 bg-primary  text-white rounded-2 border delete_schedule mx-3 ${isCallDisabled(item.appointmentDetails[0].selectedDate + ' ' + item.appointmentDetails[0].selectedTimeSlot) ? 'disabled' : ''}`}>
                                            Start</button>

                                        </div>
                                      </div>
                                    ))}
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
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2  "></div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer {...props} />

      {/* <!-- Add Time Slot Modal --> */}
      {/* <div className="modal fade custom-modal" id="add_time_slot">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Time Slots</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="hours-info">
                  {addListEmp.map((add, index) => (
                    <>
                      <div key={index} className="row form-row hours-cont">
                        <div className="col-12 col-md-10">
                          <div className="row form-row">
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>Start Time</label>
                                <select className="form-select form-control">
                                  <option>30 mins</option>
                                  <option>12.00 am</option>
                                  <option>12.30 am</option>
                                  <option>1.00 am</option>
                                  <option>1.30 am</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>End Time</label>
                                <select className="form-select form-control">
                                  <option>30 mins</option>
                                  <option>12.00 am</option>
                                  <option>12.30 am</option>
                                  <option>1.00 am</option>
                                  <option>1.30 am</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-2">
                          <label className="d-md-block d-sm-none d-none">
                            &nbsp;
                          </label>
                          <Link
                            to="#"
                            className="btn btn-danger trash"
                            onClick={() => handelRemoveEmp(index)}
                          >
                            <i className="far fa-trash-alt"></i>
                          </Link>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                <div className="add-more mb-3">
                  <Link to="#" className="add-hours" onClick={handelAddEmp}>
                    <i className="fa fa-plus-circle"></i> Add More
                  </Link>
                </div>
                <div className="submit-section text-center">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- /Add Time Slot Modal -->
		
		<!-- Edit Time Slot Modal --> */}
      {/* <div
        className="modal fade custom-modal"
        id="edit_time_slot"
        style={{ marginTop: "50px" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Time Slots</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="hours-info">
                  <div className="row form-row hours-cont">
                    <div className="col-12 col-md-10">
                      <div className="row form-row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Start Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option defaultValue>12.00 am</option>
                              <option>12.30 am</option>
                              <option>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>End Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option>12.00 am</option>
                              <option defaultValue>12.30 am</option>
                              <option>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row form-row hours-cont">
                    <div className="col-12 col-md-10">
                      <div className="row form-row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Start Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option>12.00 am</option>
                              <option defaultValue>12.30 am</option>
                              <option>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>End Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option>12.00 am</option>
                              <option>12.30 am</option>
                              <option defaultValue>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-2">
                      <label className="d-md-block d-sm-none d-none">
                        &nbsp;
                      </label>
                      <Link to="#" className="btn btn-danger trash">
                        <i className="far fa-trash-alt"></i>
                      </Link>
                    </div>
                  </div>
                  {addListEmp.map((add, index) => (
                    <div key={index} className="row form-row hours-cont">
                      <div className="col-12 col-md-10">
                        <div className="row form-row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label>Start Time</label>
                              <select className="form-select form-control">
                                <option>30 mins</option>
                                <option>12.00 am</option>
                                <option>12.30 am</option>
                                <option defaultValue>1.00 am</option>
                                <option>1.30 am</option>
                              </select>
                            </div>
                          </div>

                          <div key={index} className="col-12 col-md-6">
                            <div className="form-group">
                              <label>End Time</label>
                              <select className="form-select form-control">
                                <option>30 mins</option>
                                <option>12.00 am</option>
                                <option>12.30 am</option>
                                <option>1.00 am</option>
                                <option defaultValue>1.30 am</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-2">
                        <label className="d-md-block d-sm-none d-none">
                          &nbsp;
                        </label>
                        <Link
                          to="#"
                          className="btn btn-danger trash"
                          onClick={() => handelRemoveEmp(index)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="add-more mb-3">
                  <Link to="#" className="add-hours" onClick={handelAddEmp}>
                    <i className="fa fa-plus-circle"></i> Add More
                  </Link>
                </div>
                <div className="submit-section text-center">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ScheduleTiming;
