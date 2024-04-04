import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./approuter";
// import * as serviceWorker from './client/serviceWorker';
import "./client/assets/css/bootstrap.min.css";
import io from "socket.io-client";
// import Ringing from '../../doctors/RingingPage/Ringing.jsx'
// import Ringing from '../src/client/components/doctors/RingingPage/Ringing.jsx'
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
import { useCallModalStore } from "./callModalStore.js";
import Coming from "./CallModals/Coming.jsx";
import Ringing from "./CallModals/Ringing.jsx";
// ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// if (module.hot) { // enables hot module replacement if plugin is installed
//  module.hot.accept();
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
export const backend_base = "http://localhost:3005"
const App = () => {
  const { setShowCallComingModal, showCallComingModal, showRingingModal, setShowRingingModal, callerId, setCallerId, setPickerId, pickerId } = useCallModalStore()
  const userId = localStorage.getItem('token');
  // const [callerName, setCallerName] = useState("");
  // const [error, setError] = useState(null);
  // const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  // let audioInterval;
  const APP_ID = 549911561;
  const SERVER_SECRET = "cb161fefa2b3464f6da3590442f39d48";
  function getRandomInteger() {
    return Math.floor(Math.random() * (60 - 11)) + 11;
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
  const startCall = async (element) => {

    const userId = randomID(5)// Generate a random user ID
    // const userId = meetingId// Generate a random user ID
    const roomId = randomID(5) // Generate a random nonce
    const randomNumber = getRandomInteger();
    console.log("userId", userId)
    console.log("roomId", roomId)

    try {
      // Generate Kit Token using the dynamic channel ID
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        APP_ID,
        SERVER_SECRET,
        "ADSHFG",
        roomId,
        userId,
        // randomNumber,
        100000000,
      );
      // Create ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call
      // zp.maxUsers(3);

      zp.joinRoom({
        showLeavingView: false,
        maxUsers: 2,
        container: element,
        // showRoomTimer: true,
        showPreJoinView:  false,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showTurnOffRemoteCameraButton: true,
        showMyCameraToggleButton: true,
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        useFrontFacingCamera: true,
        enableCustomCallInvitationWaitingPage: true,
        enableCustomCallInvitationDialog: true,
        enableNotifyWhenAppRunningInBackgroundOrQuit: true,
        showLeaveRoomConfirmDialog: false,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        // onLeaveRoom: () => {
        //   window.location.reload()
        // }
      });
      // zp.destroy();
      // setJoined(true);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // Connect to the server's socket.io endpoint
    const socket = io(backend_base);

    // Emit socketId to the backend
    socket.emit("storeSocketId", { userId: userId });

    // Listen for incoming call request from buyer
    socket.on("incomingCallFromBuyer", ({ callerId }) => {
      console.log("Incoming call from buyer:", callerId);
      setCallerId(callerId)
      setShowCallComingModal(true)
      // Here, you can handle the incoming call request from the buyer
      // For example, show a notification or prompt to the user
    });

    // Listen for incoming call request from seller
    socket.on("incomingCallFromSeller", ({ callerId }) => {
      console.log("Incoming call from seller:", callerId);
      setCallerId(callerId)
      setShowCallComingModal(true)
      // Here, you can handle the incoming call request from the seller
      // For example, show a notification or prompt to the user
    });

    // Listen for incoming call acceptance
    socket.on("callAccepted", () => {
      console.log("Call accepted");
      setShowCallComingModal(false)
      setShowRingingModal(false)
      startCall()
      // Here, you can handle the call acceptance event
      // For example, start the call or show a notification
    });

    // Listen for incoming call rejection
    socket.on("callRejected", () => {
      console.log("Call rejected");
      setShowCallComingModal(false)
      setShowRingingModal(false)
      // Here, you can handle the call rejection event
      // For example, show a notification to the caller
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [userId]);
  const acceptCall = (callerId) => {
    console.log("callerId", callerId)
    const socket = io(backend_base);
    setShowCallComingModal(false)
    setShowRingingModal(false)
    socket.emit("acceptCall", { callerId: callerId });
    startCall()
  }
  const rejectCall = (callerId) => {
    console.log("callerId", callerId)
    const socket = io(backend_base);
    setShowCallComingModal(false)
    setShowRingingModal(false)
    socket.emit("rejectCall", { callerId: callerId });
    
  }


  // const initAudio = (stop) => {
  //   const targetAudio = document.getElementsByClassName("audioBtn")[0];
  //   if (stop) {
  //     targetAudio.pause();
  //   } else {
  //     targetAudio.play();
  //     // if (isAudioPlaying) {
  //     //   audioInterval = setInterval(() => {
  //     //     targetAudio.currentTime = 0;
  //     //     targetAudio.play();
  //     //   }, 5000);
  //     // }
  //   }
  // };

  // const stopAudio = () => {
  //   const targetAudio = document.getElementsByClassName("audioBtn")[0];
  //   setIsAudioPlaying(false);
  //   clearInterval(audioInterval);
  //   targetAudio.pause();
  //   initAudio(true);
  // };
  // function randomID(len) {
  //   let result = '';
  //   if (result) return result;
  //   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
  //     maxPos = chars.length,
  //     i;
  //   len = len || 5;
  //   for (i = 0; i < len; i++) {
  //     result += chars.charAt(Math.floor(Math.random() * maxPos));
  //   }
  //   return result;
  // }
  // const userId = localStorage.getItem('token');
  // // useEffect(() => {
  // //   const socket = io("http://localhost:3005", { transports: ["websocket"] });
  // //   socket.on("doctorOnlineNotification", (message) => {
  // //     setCallerName(message);
  // //     setShowRingingModal(true);
  // //     initAudio();
  // //   });
  // // }, [userId]);
  // useEffect(() => {
  //   console.log("Connecting to socket...");
  //   const socket = io("http://localhost:3005", { transports: ["websocket"] });
  //   socket.on("connect", () => {
  //     console.log("Socket connected successfully!");
  //   });

  //   socket.on("doctorOnlineNotification", (message) => {
  //     console.log("Received doctorOnlineNotification:", message);
  //     setCallerName(message);
  //     setShowRingingModal(true);
  //     initAudio();
  //   });
  //   return () => {
  //     socket.disconnect();
  //     console.log("Socket disconnected.");
  //   };
  // }, []);

  // const myMeeting = async (element) => {

  //   const userId = randomID(5)// Generate a random user ID
  //   // const userId = meetingId// Generate a random user ID
  //   const roomId = randomID(5) // Generate a random nonce
  //   console.log("userId", userId)
  //   console.log("roomId", roomId)

  //   try {
  //     // Generate Kit Token using the dynamic channel ID
  //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //       APP_ID,
  //       SERVER_SECRET,
  //       "UM2Zb",
  //       roomId,
  //       userId,
  //       100000000000,
  //     );
  //     // Create ZegoUIKitPrebuilt instance
  //     const zp = ZegoUIKitPrebuilt.create(kitToken);

  //     // Start the call
  //     // zp.maxUsers(3);

  //     zp.joinRoom({
  //       showLeavingView: false,
  //       maxUsers: 2,
  //       container: element,
  //       showRoomTimer: true,
  //       showPreJoinView: false,
  //       enableCustomCallInvitationWaitingPage: true,
  //       enableCustomCallInvitationDialog: true,
  //       enableNotifyWhenAppRunningInBackgroundOrQuit: true,
  //       scenario: {
  //         mode: ZegoUIKitPrebuilt.OneONoneCall,
  //       },
  //       onLeaveRoom: ()=>{
  //         setShowRingingModal(false)
  //       }
  //     });
  //     // zp.destroy();
  //     setJoined(true);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };
  // const rejectMeeting = async (element) => {

  //   const userId = randomID(5)// Generate a random user ID
  //   // const userId = meetingId// Generate a random user ID
  //   const roomId = randomID(5) // Generate a random nonce
  //   console.log("userId", userId)
  //   console.log("roomId", roomId)

  //   try {
  //     // Generate Kit Token using the dynamic channel ID
  //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //       APP_ID,
  //       SERVER_SECRET,
  //       "UM2Zb",
  //       roomId,
  //       userId,
  //       1000000,
  //     );
  //     // Create ZegoUIKitPrebuilt instance
  //     const zp = ZegoUIKitPrebuilt.create(kitToken);

  //     // Start the call
  //     // zp.maxUsers(3);

  //     // zp.joinRoom({
  //     //     container: element,
  //     //     showRoomTimer: true,
  //     //     showPreJoinView: false,
  //     //     enableCustomCallInvitationWaitingPage: true,
  //     //     enableCustomCallInvitationDialog: true,
  //     //     enableNotifyWhenAppRunningInBackgroundOrQuit: true,
  //     //     scenario: {
  //     //         mode: ZegoUIKitPrebuilt.OneONoneCall,
  //     //     },
  //     // });
  //     stopAudio()
  //     const socket = io("http://localhost:3005", { transports: ["websocket"] });
  //     const res = socket.emit("patientrejectcall", roomId, userId);
  //     zp.destroy();

  //     setJoined(true);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };
  // const onAcceptCall = () => {
  //   myMeeting();
  //   setShowRingingModal(false)
  // }
  // const onRejectCall = () => {
  //   rejectMeeting();
  //   setShowRingingModal(false)
  // }

  return (
    <>
      <audio className="audioBtn" >
        <source src="/ringing.mp3"></source>
      </audio>
      {showCallComingModal && <Coming rejectCall={() => rejectCall(callerId)} acceptCall={() => acceptCall(callerId)} />
      }
      {
        showRingingModal && <Ringing rejectCall={() => rejectCall(pickerId)} />
      }
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
