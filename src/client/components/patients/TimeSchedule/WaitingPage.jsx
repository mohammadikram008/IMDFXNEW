import React, { useEffect, useState } from "react";
import { useHistory ,Link} from "react-router-dom";

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
    const APP_ID = 2137259645;
    const SERVER_SECRET = "ee104c1fbf40ac2fc78e322a2356d319";
    const [channelID, setChannelID] = useState(generateUniqueChannelID());
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(null);
    function generateUniqueChannelID() {
        const timestamp = Date.now();
        return `dynamic-channel-${timestamp}`;
      }
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
            100000,
          );
          // Create ZegoUIKitPrebuilt instance
          const zp = ZegoUIKitPrebuilt.create(kitToken);
    
          // Start the call
    
          zp.joinRoom({
            container: element,
            showRoomTimer: true,
            showPreJoinView: false,
            enableCustomCallInvitationWaitingPage:true,
            enableCustomCallInvitationDialog:true,
            enableNotifyWhenAppRunningInBackgroundOrQuit:true,
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
          });
    
          setJoined(true);
        } catch (error) {
          setError(error);
        }
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
                    <Link
                        className={`px-4 py-2 bg-white text-black rounded-2 border text-uppercase`}
                        to="/patient/time-schedule"
                        // disabled={timerCompleted} // Disable the button if timer is not completed
                    >
                        Back to Home
                    </Link>

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
