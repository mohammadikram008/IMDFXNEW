import React, { useState, useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdStars } from "react-icons/md";
import MyComponent from "./mycomponent";
import { doc_1 } from "./img";

const SearchList = () => {
  const history=useHistory()
  const imageUrl = `http://localhost:3005/api`;
  const doctorsData = [
    // Existing data remains unchanged
  ];
  const [doctorsApiData, setDoctorsApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/doctorpersnoldetails");
        setDoctorsApiData(response.data);
        console.log("response data", response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);
 
  const handleChangeViewProfile = (props) => {
    console.log("click");
    console.log("props", props);
    const id=props
    history.push({
      pathname: "/patient/doctor-profile",
      state: {id }
    });

  }


  return (
    <div>
      {doctorsApiData.map((doctor, index) => (
        <div key={index} className="doctor-card  mb-4">
          <div className="card-body">
            <div className="doctor-widget">
              <div className="doc-info-left">
                <div className="doctor-img">
                  {/* <img src={`${imageUrl}/${doctor.image}`} className="img-fluid" alt="User" /> */}
                  <img src={doc_1} className="img-fluid" alt="User" />

                </div>
                <div className="basic-data">
                  <div className="d-flex premium-div">
                    <h2 className=" mb-1">{doctor.name}</h2>
                    <MdStars size={32} className="star" />
                    <div className="gold-gradient badge-bg">
                      <div className="text-div">
                        <p className="">PLATINUM PROVIDER</p>
                      </div>
                    </div>
                  </div>
                  <p className="">Specialization: {doctor.specialization}</p>
                  <h5 className="">{doctor.education}</h5>
                  {/* Rating Stars */}
                  <div className="rating">
                    {/* Include your rating stars here */}
                  </div>

                  <div className="d-flex text-gray-600 doctor-information">
                    <div className=" border-right  doctor-information-inner-div" >
                      <h1 className=" text-success">Under 15 minutes</h1>
                      <h5>WAIT TIME</h5>
                    </div>

                    <div className=" border-right doctor-information-inner-div">
                      <h1 className="  text-success">
                        {doctor.yearofexperience} years
                      </h1>
                      <h5>EXPERIENCE</h5>
                    </div>

                    <div className=" doctor-information-inner-div">
                      <h1 className="text-success">
                        98% (542)
                      </h1>
                      <h5>SATISFIED</h5>
                    </div>
                  </div>

                  {/* <div className="d-flex items-center justify-between mx-3 border-t border-b mt-2 border-success">
                    <div className="d-flex items-center justify-center">
                      <h1 className="text-success">Available:</h1>
                      <h5 className="mx-2">Mon, 31 August</h5>
                    </div>
                    <div className="d-flex items-center justify-center">
                      <h1 className="text-success">Fees:</h1>
                      <h5>${doctor.fee}</h5>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Inner Card */}
              <div className="innner-card rounded-md">
                <h2 className="card-title text-lg font-bold p-3">
                  Inetgrate medical Hospital DHA
                </h2>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-gray-600">Available on: Mon, 31 August</p>
                  <p>Fee: $300</p>
                </div>
                <div className="text-card-bottom text-white rounded-bottom d-flex justify-content-center align-items-center mt-4">
                  Pay online and get up to 50% off
                </div>
              </div>

              {/* Right Section */}
              <div className="doc-info-right">
                <div className="clini-infos">
                  {/* ... clinic info details ... */}
                </div>
                <div className="clinic-booking">
                  <button className="view-pro-btn"
                    // onclick={() => handleChangeViewProfile(doctor)}
                    onClick={() => handleChangeViewProfile(doctor._id)}

                  >

                    View Profile

                  </button>
                  {/* <Link to="/patient/doctor-profile" className="view-pro-btn">
                    View Profile
                  </Link> */}
                  <Link to="/patient/booking1" className="login-btn-login">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchList;
