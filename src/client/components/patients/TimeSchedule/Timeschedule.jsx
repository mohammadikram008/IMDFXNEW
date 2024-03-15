
import React, { useEffect, useState } from "react";
// import { DashboardSidebar } from "./sidebar/sidebar.jsx";
import { DashboardSidebar } from "../../patients/dashboard/sidebar/sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Modal } from "react-bootstrap";
import Footer from "../../footer";

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Header from "../../header.jsx";
import { IMG01 } from "../doctorprofile/img.jsx";
const Timeschedule = (props) => {
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
    useEffect(() => {
        fetchdoctorappointment()

    }, []);
    const handleCall = (selectedDateTime) => {
        const currentDateTime = new Date();
        const appointmentDateTime = new Date(selectedDateTime);

        if (appointmentDateTime > currentDateTime) {
            const timeDifference = appointmentDateTime - currentDateTime;
            const remainingMinutes = Math.floor(timeDifference / (1000 * 60));

            props.history.push(`/patient/waiting-page/${selectedDateTime}`);  // Use props.history.push
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

    // Use a static room ID for all calls
    const staticRoomID = 'yourStaticRoomID';

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
    const myMeeting = async (element) => {
        // generate Kit Token
        const appID = 2137259645;
        const serverSecret = "ee104c1fbf40ac2fc78e322a2356d319";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            staticRoomID, // Use the static room ID
            randomID(5),
            randomID(5)
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Start the call
        zp.joinRoom({
            container: element,
            // Remove sharedLinks code
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });
    };
    const isCallDisabled = (selectedDateTime) => {
        const currentDateTime = new Date();
        const appointmentDateTime = new Date(selectedDateTime);

        return appointmentDateTime > currentDateTime;
    };
    return (
        <div>
            <Header {...props} />
            <div className="content">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <DashboardSidebar />
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
                                                                    {/* <h4 className="card-title d-flex justify-content-between">
                                                                        <span>Time Slots</span>
                                                                    </h4>
                                                                    {docAppointment &&
                                                                        docAppointment.map((item, index) => (
                                                                            <div className="doc-times" key={index}>
                                                                                <div className="doc-slot-list">
                                                                                    <h5 className="d-flex">
                                                                                        Dr.{item.doctorDetails && item.doctorDetails.name}
                                                                                        <p className="mx-4">
                                                                                            Date: {item.appointmentDetails.selectedDate + "/ Time " + item.appointmentDetails.selectedTimeSlot}
                                                                                        </p>
                                                                                    </h5>
                                                                                    <div className="d-flex">
                                                                                        <div

                                                                                            // className="delete_schedule mx-3"
                                                                                            className={`delete_schedule mx-3 ${isCallDisabled(item.appointmentDetails.selectedDate + ' ' + item.appointmentDetails.selectedTimeSlot) ? 'disabled' : ''}`}
                                                                                            onClick={() =>
                                                                                                handleCall(item.appointmentDetails.selectedDate + ' ' + item.appointmentDetails.selectedTimeSlot)
                                                                                            }
                                                                                        >
                                                                                            <i className="fa fa-video"></i>
                                                                                        </div>
                                                                                        <Link to="patient/patient-chat" className="delete_schedule">
                                                                                            <i className="fa fa-message"></i>
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))} */}
                                                                    <h4 className="card-title d-flex justify-content-between">
                                                                        <span>Your Appointments</span>
                                                                    </h4>
                                                                    {docAppointment &&
                                                                        docAppointment.map((item, index) => (
                                                                            <div className="d-flex justify-content-between gap-3 my-3 border p-4 rounded-2  flex-column " key={index}>
                                                                                <div className="d-flex justify-content-between align-items-center gap-2">
                                                                                    <div>
                                                                                        <h3> Dr.{item.doctorDetails && item.doctorDetails.name}</h3>
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
                                                                                <div className="d-flex justify-content-between align-self-end  align-items-center gap-2">
                                                                                    <button className="px-4 py-2 bg-white text-dark rounded-2 border">Cancel</button>
                                                                                    <button onClick={() =>
                                                                                        handleCall(item.appointmentDetails.selectedDate)
                                                                                    } className={`px-4 py-2 bg-primary  text-white rounded-2 border delete_schedule mx-3 ${isCallDisabled(item.appointmentDetails.selectedDate + ' ' + item.appointmentDetails.selectedTimeSlot) ? 'disabled' : ''}`}>Start</button>
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