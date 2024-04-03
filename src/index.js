import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./approuter";
// import * as serviceWorker from './client/serviceWorker';
import "./client/assets/css/bootstrap.min.css";
import io from "socket.io-client";
// import Ringing from '../../doctors/RingingPage/Ringing.jsx'
import Ringing from '../src/client/components/doctors/RingingPage/Ringing.jsx'
// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
//fontawesome
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import "react-image-lightbox/style.css";
import "react-datepicker/dist/react-datepicker.css";
//carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./client/assets/css/owl.carousel.min.css";
// import './client/assets/css/aos.css'
// if (
//   !window.location.pathname?.includes("admin") &&
//   !window.location.pathname.includes("pharmacyadmin")
// ) {
//   require("./client/assets/css/all.css");
//   require("./client/assets/css/all.min.css");
//   require("./client/assets/css/fontawesome.min.css");
//   require("./client/assets/css/custom.css");
// } 
// console.log('window.location.pathname :>> ', window.location.pathname);
if (window.location.pathname.includes("pharmacyadmin")) {
  require("./pharmacyadmin/assets/plugins/fontawesome/css/fontawesome.min.css");
  require("./pharmacyadmin/assets/plugins/fontawesome/css/all.min.css");
  require("./pharmacyadmin/assets/css/font-awesome.min.css");
  require("./pharmacyadmin/assets/css/custom.css");
  require("./pharmacyadmin/assets/css/feathericon.min.css");
  require("./pharmacyadmin/assets/js/feather.min.js");
  require("./pharmacyadmin/assets/css/bootstrap.min.css");
} else if (window.location.pathname.includes("admin")) {
  require("./admin/assets/css/feathericon.min.css");
  require("./admin/assets/js/feather.min.js");
  // require("./admin/assets/plugins/fontawesome/css/fontawesome.min.css");
  require("./admin/assets/plugins/fontawesome/css/all.min.css");
  // require("./admin/assets/plugins/fontawesome/js/fontawesome.min.js");
  require("./admin/assets/css/font-awesome.min.css");
  require("./admin/assets/css/custom.css");
} else {
  require("./client/assets/css/all.css");
  require("./client/assets/css/all.min.css");
  require("./client/assets/css/fontawesome.min.css");
  require("./client/assets/css/custom.css")
  require("../src/client/components/customstyleclient.css");
}
import { GoogleOAuthProvider } from '@react-oauth/google';
// ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// if (module.hot) { // enables hot module replacement if plugin is installed
//  module.hot.accept();
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
  const [showRingingModal, setShowRingingModal] = useState(false);
  const [callerName, setCallerName] = useState("");
  const [error, setError] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  let audioInterval;

  // const APP_ID = 1049140173;
  // const SERVER_SECRET = "80f3b1250528f24162893ff96e2c4809";
   const APP_ID =  549911561;
  const SERVER_SECRET = "cb161fefa2b3464f6da3590442f39d48";

 

  const initAudio = (stop) => {
    const targetAudio = document.getElementsByClassName("audioBtn")[0];
    if (stop) {
      targetAudio.pause();
    } else {
      targetAudio.play();
      // if (isAudioPlaying) {
      //   audioInterval = setInterval(() => {
      //     targetAudio.currentTime = 0;
      //     targetAudio.play();
      //   }, 5000);
      // }
    }
  };

  const stopAudio = () => {
    const targetAudio = document.getElementsByClassName("audioBtn")[0];
    setIsAudioPlaying(false);
    clearInterval(audioInterval);
    targetAudio.pause();
    initAudio(true);
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
  const userId = localStorage.getItem('token');
  useEffect(() => {
    const socket = io("http://localhost:3005", { transports: ["websocket"] });
    socket.on("doctorOnlineNotification", (message) => {
      setCallerName(message);
      setShowRingingModal(true);
      initAudio();
    });
  }, [userId]);
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
        100000000000,
      );
      // Create ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call
      // zp.maxUsers(3);

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
        onLeaveRoom: ()=>{
          setShowRingingModal(false)
        }
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
      stopAudio()
      const socket = io("http://localhost:3005", { transports: ["websocket"] });
      const res = socket.emit("patientrejectcall", roomId, userId);
      zp.destroy();

      setJoined(true);
    } catch (error) {
      setError(error);
    }
  };
  const onAcceptCall = () => {
    myMeeting();
    setShowRingingModal(false)
  }
  const onRejectCall = () => {
    rejectMeeting();
    setShowRingingModal(false)
  }

  return (
    <>
      <audio className="audioBtn" >
        <source src="/ringing.mp3"></source>
      </audio>
      {showRingingModal && (
        <Ringing
          callerName={callerName}
          onAcceptCall={onAcceptCall}
          onRejectCall={onRejectCall}
          onCloseModal={() => setShowRingingModal(false)}
        />
      )}
      <GoogleOAuthProvider clientId="130911611464-ndp6t0s2h2qssvc2bh8i0mmetsm8nu3n.apps.googleusercontent.com">
        <AppRouter />
      </GoogleOAuthProvider>
    </>
  );
};


root.render(<App />);
// root.render(
//   <>
//     {showRingingModal && (
//       <Ringing
//         callerName={callerName}
//         onAcceptCall={onAcceptCall}
//         onRejectCall={onRejectCall}
//         onCloseModal={() => setShowRingingModal(false)}
//       />
//     )}
//     <GoogleOAuthProvider clientId="130911611464-ndp6t0s2h2qssvc2bh8i0mmetsm8nu3n.apps.googleusercontent.com">
//       <AppRouter />
//     </GoogleOAuthProvider>
//   </>
// );
