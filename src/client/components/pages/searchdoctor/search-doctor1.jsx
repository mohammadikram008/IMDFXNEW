import React, { useState } from "react";
// import Select from "react-select";
// import SearchFilter from "./searchFilter";
import SearchList from "./searchList";
import StickyBox from "react-sticky-box";
import Header from "../../header";
import Footer from "../../footer";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
const SearchDoctor = (props) => {

  const location = useLocation();
  const { state } = location;
 console.log("state",state);
  if (!state) {
    // Handle the case where state is undefined
    return <div>No data available</div>;
  }
  // let pathname = props.location.pathname;

  // if (props.location.pathname === "/patient/search-doctor1") {
  //   require("../../../assets/css/feather.css");
  // }
  // const options = [
  //   { value: "Select", label: "Select" },
  //   { value: "Rating", label: "Rating" },
  //   { value: "Popular", label: "Popular" },
  //   { value: "Lastest", label: "Lastest" },
  //   { value: "Free", label: "Free" },
  // ];
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <Header {...props} />
   
      <div className="content  ">
        <div className="container-fluid " >
          <div className="row">
          
            <div className="col-md-0 col-lg-1 col-xl-1 ">

            </div>
            <div className="col-md-12 col-lg-10 col-xl-10 mt-5">
              <SearchList  props={state.doctors}/>
            </div>
            <div className="col-md-0 col-lg-1 col-xl-1 ">

            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default SearchDoctor;
