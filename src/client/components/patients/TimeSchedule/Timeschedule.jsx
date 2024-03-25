
import React, { useEffect, useState } from "react";
// import { DashboardSidebar } from "./sidebar/sidebar.jsx";
import { DashboardSidebar } from "../../patients/dashboard/sidebar/sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Modal } from "react-bootstrap";
import Footer from "../../footer";

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Header from "../../header.jsx";
// import { IMG01 } from "../doctorprofile/img.jsx";
import IMG01 from "./doctorAi.jpg";
const Timeschedule = (props) => {
    console.log("ppppppppp", props);
    const [addListEmp, setAddListEmp] = useState([""]);
    const [docAppointment, setDocAppointment] = useState([]);
    const userId = localStorage.getItem('token');
    const handelAddEmp = () => {
        setAddListEmp([...addListEmp, " "]);
    };
    useEffect(() => { }, []);

    const handelRemoveEmp = (index) => {
        const listEmp = [...addListEmp];
        listEmp.splice(index, 1);
        setAddListEmp(listEmp);
    };
    const fetchdoctorappointment = async () => {

        try {
            const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getbookappointment/${userId}`);
            setDocAppointment(response.data);
            console.log("R", response.data);

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
    const handleCall = (selectedDateTime, time) => {

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
            console.log("call");
            myMeeting();
        }
    };
    // const handleCall = () => {
    //     console.log("call");
    //     myMeeting();
    // }

    const APP_ID = 2137259645;
    const SERVER_SECRET = "ee104c1fbf40ac2fc78e322a2356d319";

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
        const roomId = randomID(5) // Generate a random nonce
        console.log("userId", userId)
        console.log("roomId", roomId)

        try {
            // Generate Kit Token using the dynamic channel ID
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                APP_ID,
                SERVER_SECRET,
                "UM2Zb",
                userId,
                userId,
                1000000,
            );
            // Create ZegoUIKitPrebuilt instance
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Start the call

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
    console.log("Time", time);
    return (
        <div>
            <Header {...props} />
            <div className="content">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <DashboardSidebar props={patient} />
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
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
                                                                    {docAppointment &&
                                                                        docAppointment.map((item, index) => (
                                                                            <div className="d-flex justify-content-between gap-3 my-3 border p-4 rounded-2  flex-column time-card " key={index}>
                                                                                <div className="d-flex justify-content-between align-items-center gap-2">
                                                                                    <div>
                                                                                        <h3> Dr.{item.doctorDetails && item.doctorDetails.name}</h3>
                                                                                        <p>Email: {item.doctorDetails.email }</p>
                                                                                        <p>Specialization: {item.doctorDetails.specialization }</p>
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
                                                                                        handleCall(item.appointmentDetails.selectedDate, item.appointmentDetails.selectedTimeSlot)
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer {...props} />
        </div>
    )
}

export default Timeschedule