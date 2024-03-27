
import React, { useEffect, useState } from "react";
// import { DashboardSidebar } from "./sidebar/sidebar.jsx";
import { DashboardSidebar } from "../../patients/dashboard/sidebar/sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Modal } from "react-bootstrap";
import Footer from "../../footer";
import Ringing from '../../doctors/RingingPage/Ringing.jsx'
import { ToastContainer, toast } from "react-toastify";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Header from "../../header.jsx";
import io from "socket.io-client";
const ENDPOINT = "https://imdfx-newserver-production.up.railway.app";
// import { IMG01 } from "../doctorprofile/img.jsx";
import IMG01 from "./doctorAi.jpg";
const Timeschedule = (props) => {
    console.log("ppppppppp", props);
    const [addListEmp, setAddListEmp] = useState([""]);
    const [notification, setNotification] = useState(null);
    const [docAppointment, setDocAppointment] = useState([]);
    const userId = localStorage.getItem('token');
    const [meetingId, setMeetingId] = useState();

    // state for calling model
    const [showRingingModal, setShowRingingModal] = useState(false);
    const [callerName, setCallerName] = useState("");
    const [callerId, setCallerId] = useState("");

    const handelAddEmp = () => {
        setAddListEmp([...addListEmp, " "]);
    };

    useEffect(() => { }, []);
    useEffect(() => {
        const socket = io("https://imdfx-newserver-production.up.railway.app", { transports: ["websocket"] });
        // Listen for doctor's notification
        socket.on("doctorOnlineNotification", (message) => {
            toast.success(message);
            setCallerName(message); // Assuming the message contains the caller's name
            setShowRingingModal(true);
            // console.log("message", message);
            // setNotification(message);
        });

        // return () => socket.disconnect();
    }, []);


    const handelRemoveEmp = (index) => {
        const listEmp = [...addListEmp];
        listEmp.splice(index, 1);
        setAddListEmp(listEmp);
    };
    const fetchdoctorappointment = async () => {

        try {
            const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getbookappointment/${userId}`);
            setDocAppointment(response.data);
            console.log("RRRRR", response.data);

        } catch (error) {
            console.error('Error fetching appointments:', error);

        }
    };
    const [patient, setPatient] = useState([]);
    const fetchpatientdata = async () => {
        try {
            const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getpatient/${userId}`);
            setPatient(response.data);

        } catch (error) {
            console.error('Error fetching appointments:', error);

        }
    };
    useEffect(() => {
        fetchdoctorappointment()
        fetchpatientdata()

    }, []);
    const handleCall = (selectedDateTime, time, id) => {
        console.log("userIduserId", id);
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
            myMeeting();
        }
    };
    // const handleCall = () => {
    //     console.log("call");
    //     myMeeting();
    // }

    const APP_ID = 1049140173;
    const SERVER_SECRET = "80f3b1250528f24162893ff96e2c4809";

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

        const userId = randomID(5)// Generate a random user ID
        // const userId = meetingId// Generate a random user ID
        const roomId = randomID(5) // Generate a random nonce
        console.log("userId", userId)
        console.log("roomId", roomId)

        try {
            // Generate Kit Token using the dynamic channel ID
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                APP_ID,
                SERVER_SECRET,
                "UM2Zb",
                roomId,
                userId,
                1000000,
            );
            // Create ZegoUIKitPrebuilt instance
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Start the call
            // zp.maxUsers(3);

            zp.joinRoom({
                container: element,
                showRoomTimer: true,
                showPreJoinView: false,
                enableCustomCallInvitationWaitingPage: true,
                enableCustomCallInvitationDialog: true,
                enableNotifyWhenAppRunningInBackgroundOrQuit: true,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
            // zp.destroy();
            setJoined(true);
        } catch (error) {
            setError(error);
        }
    };
    const rejectMeeting = async (element) => {

        const userId = randomID(5)// Generate a random user ID
        // const userId = meetingId// Generate a random user ID
        const roomId = randomID(5) // Generate a random nonce
        console.log("userId", userId)
        console.log("roomId", roomId)

        try {
            // Generate Kit Token using the dynamic channel ID
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                APP_ID,
                SERVER_SECRET,
                "UM2Zb",
                roomId,
                userId,
                1000000,
            );
            // Create ZegoUIKitPrebuilt instance
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Start the call
            // zp.maxUsers(3);

            // zp.joinRoom({
            //     container: element,
            //     showRoomTimer: true,
            //     showPreJoinView: false,
            //     enableCustomCallInvitationWaitingPage: true,
            //     enableCustomCallInvitationDialog: true,
            //     enableNotifyWhenAppRunningInBackgroundOrQuit: true,
            //     scenario: {
            //         mode: ZegoUIKitPrebuilt.OneONoneCall,
            //     },
            // });
            zp.destroy();
            setJoined(true);
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
    const time = docAppointment.map((item) => item.appointmentDetails.selectedTimeSlot)
    console.log("ID", meetingId)

    const onAcceptCall = () => {
        myMeeting();
    }
    const onRejectCall = () => {
        rejectMeeting();
        setShowRingingModal(false)
    }
    return (
        <div>
            <Header {...props} />
            {/* {notification && (
                <div className="notification">
                    <p>New Notification: {notification}</p>
                </div>
            )} */}

            <div className="content">
                <div className="container-fluid ">
                    <div className="row mt-5">
                        <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar"></div>
                        <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
                            <DashboardSidebar props={patient} />
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="profile-box">
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
                                                    {docAppointment &&
                                                        docAppointment.map((item, index) => (
                                                            <div className="d-flex justify-content-between gap-3 my-3 border p-4 rounded-2  flex-column time-card " key={index}>
                                                                <div className="d-flex justify-content-between align-items-center gap-2">
                                                                    <div>
                                                                        <h3> Dr.{item.doctorDetails && item.doctorDetails.name}</h3>
                                                                        <p>Email: {item.doctorDetails.email}</p>
                                                                        <p>Specialization: {item.doctorDetails.specialization}</p>
                                                                        <p>Date: {item.appointmentDetails.selectedDate + "/ Time " + item.appointmentDetails.selectedTimeSlot}</p>
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
                                                                        handleCall(item.appointmentDetails.selectedDate, item.appointmentDetails.selectedTimeSlot, item.appointmentDetails.userId)
                                                                    } className={`px-4 py-2 bg-primary  text-white rounded-2 border delete_schedule mx-3  mt-5 ${isCallDisabled(item.appointmentDetails.selectedDate + ' ' + item.appointmentDetails.selectedTimeSlot) ? 'disabled' : ''}`}>
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

                        <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar"></div>
                    </div>
                </div>
                {showRingingModal && (
                    <Ringing
                        callerName={callerName}
                        onAcceptCall={onAcceptCall}
                        onRejectCall={onRejectCall}
                        onCloseModal={() => setShowRingingModal(false)}
                    />
                )}

            </div>
            <Footer {...props} />
            <ToastContainer />
        </div>
    )
}

export default Timeschedule