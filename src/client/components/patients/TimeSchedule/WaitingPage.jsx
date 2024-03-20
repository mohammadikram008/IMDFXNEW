import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const WaitingPage = () => {
    const history = useHistory();

    // Retrieve the state data from history.location.state
    const { selectedDateTime } = history.location.state || {};

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerCompleted, setTimerCompleted] = useState(false); // State to track timer completion

    useEffect(() => {
        // Update the countdown every second
        const interval = setInterval(() => {
            const now = new Date();
            const diff = new Date(selectedDateTime) - now;

            // Calculate the days, hours, minutes, and seconds remaining
            const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

            // Update the state
            setDays(daysLeft);
            setHours(hoursLeft);
            setMinutes(minutesLeft);
            setSeconds(secondsLeft);

            // Check if timer has completed
            if (diff <= 0) {
                clearInterval(interval); // Clear the interval
                setTimerCompleted(true); // Update the state to indicate timer completion
            }
        }, 1000);

        // Clean up the interval when component unmounts
        return () => clearInterval(interval);
    }, [selectedDateTime]); // Run effect when selectedDateTime changes

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
        <section style={{
            height: "100vh",
            width: "100vw"
        }} className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center text-center align-items-center flex-column gap-3">
                <h2 className="fw-bold fs-5">Your Appointment will start after this Countdown</h2>

                <div className="clinic-services-timer">
                    <div className="timer-box">
                        <span className="timer-text">{days}</span>
                        <p>d</p>
                    </div>
                    <div className="timer-box">
                        <span className="timer-text">{hours}</span>
                        <p>h</p>
                    </div>
                    <div className="timer-box">
                        <span className="timer-text">{minutes}</span>
                        <p>m</p>
                    </div>
                    <div className="timer-box">
                        <span className="timer-text">{seconds}</span>
                        <p>s</p>
                    </div>
                </div>

                <div className="d-flex gap-2 justify-content-center align-items-center ">
                    <button
                        className={`px-4 py-2 bg-white text-black rounded-2 border text-uppercase`}
                        disabled={timerCompleted} // Disable the button if timer is not completed
                    >
                        Back to Home
                    </button>

                    {/* <button 
                        className={`px-4 py-2 bg-primary text-white rounded-2 border text-uppercase`} 
                        disabled={!timerCompleted}
                        onClick={() => console.log("Join Call")} // Disable the button if timer is not completed
                    >
                        Join Call
                    </button> */}
                    <button
                        className={`px-4 py-2 rounded-2 border text-uppercase ${!timerCompleted ? "disable-join-btn text-dark " : "bg-primary text-white"}`}
                        disabled={!timerCompleted}
                        onClick={() => myMeeting()} // Disable the button if timer is not completed
                    >
                        Join Call
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WaitingPage;
