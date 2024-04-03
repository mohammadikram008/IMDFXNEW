/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Priceingplan from "./priceingplan";
import Homebanner from "./homebanner";
import Speacialities from "./speacialities";
import Worksection from "./worksection";
import Artical from "./artical";
import Testimonial from "./testimonial";
import Parentssection from "./parentssection";
import Appsection from "./appsection";
import Doctor from "./doctor";
import Faq from "./faq";
import Header from "../../header";
import Footer from "../../footer";
import ProgressCircle from "../paediatric/scrolltotop";
import io from "socket.io-client";
function Generalhome(props) {
  let pathname = props.location.pathname;

  if (props.location.pathname === "/") {
    require("../../../assets/css/feather.css");
  }
  const ID = localStorage.getItem('token');
  useEffect(() => {
    // window.location.reload();
    const socket = io("http://localhost:3005", { transports: ["websocket"] });
    // Listen for doctor's notification
    const res = socket.emit("storeSocketId", { ID });
  }, []);
  return (
    <>
      <>
        <div className="main-wrapper">
          <Header {...props} />
          {/* Home Banner */}
          <Homebanner />
          {/* /Home Banner */}
          {/* Specialities Section */}
          <Speacialities />
          {/* /Specialities Section */}
          {/* Doctors Section */}
          <Doctor />
          {/* /Doctors Section */}
          {/* Pricing */}
          {/* <Priceingplan /> */}
          {/* /Pricing */}
          {/* Work Section */}
          <Worksection />
          {/* /Work Section */}
          {/* Articles Section */}
          {/* <Artical /> */}
          {/* /Articles Section */}
          {/* App Section */}
          <Appsection />
          {/* /App Section */}
          {/* FAQ Section */}
          {/* <Faq /> */}
          {/* /FAQ Section */}
          {/* Testimonial Section */}
          {/* <Testimonial /> */}
          {/* /Testimonial Section */}
          {/* Partners Section */}
          {/* <Parentssection /> */}
          {/* /Partners Section */}
          <Footer {...props} />
          {/* Cursor */}
          <div className="mouse-cursor cursor-outer" />
          <div className="mouse-cursor cursor-inner" />
          {/* /Cursor */}
          <ProgressCircle />
        </div>
      </>
    </>
  );
}

export default Generalhome;
