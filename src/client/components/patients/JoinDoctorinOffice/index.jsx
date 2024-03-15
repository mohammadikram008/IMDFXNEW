import React from "react";
import DashboardSidebar from "../../doctors/sidebar/index.jsx";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";

import Header from "../../header";
import Footer from "../../footer";
import Tablerecords from "./tablerecords.jsx";

const JoinOffice = (props) => {
const office="offices"
  return (
    <div>
      <Header {...props} />
   
      <div className="content">
        <div className="container-fluid mt-5">
          <div className="row">
          <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />{" "}
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <Tablerecords  />
              <Tablerecords office={office}/>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
          </div>
        </div>
      </div>

      <Footer {...props} />
    </div>
  );
};

export default JoinOffice;
