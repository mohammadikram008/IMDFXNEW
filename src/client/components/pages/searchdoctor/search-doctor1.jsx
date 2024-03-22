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
      {/* Breadcrumb */}
      {/* <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Search</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Search
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      {/* /Breadcrumb */}
      <div className="content  ">
        <div className="container-fluid " >
          <div className="row">
            {/* Search Filter */}
            {/* <div className="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar mt-5">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div className="card search-filter">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Search Filter</h4>
                  </div>
                  <div className="card-body">
                    <div className="filter-widget">
                      <div className="cal-icon">
                        <input
                          type="text"
                          className="form-control datetimepicker"
                          placeholder="Select Date"
                        />
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          placeholderText="Select Date"
                        />
                      </div>
                    </div>
                    <div className="filter-widget">
                      <h4>Gender</h4>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="gender_type"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> Male Doctor
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="gender_type" />
                          <span className="checkmark" /> Female Doctor
                        </label>
                      </div>
                    </div>
                    <div className="filter-widget">
                      <h4>Select Specialist</h4>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> Urology
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked=""
                          />
                          <span className="checkmark" /> Neurology
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Dentist
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Orthopedic
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Cardiologist
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark" /> Cardiologist
                        </label>
                      </div>
                    </div>
                    <div className="btn-search">
                      <button type="button" className="btn w-100">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              
              </StickyBox>
            </div> */}
            <div className="col-md-0 col-lg-1 col-xl-1 ">

            </div>
            <div className="col-md-12 col-lg-10 col-xl-10 mt-5">
              <SearchList  props={state.doctors}/>
              {/* <div className="load-more text-center">
                <Link to="#" className="btn btn-primary btn-sm">
                  Load More
                </Link>
              </div> */}
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
