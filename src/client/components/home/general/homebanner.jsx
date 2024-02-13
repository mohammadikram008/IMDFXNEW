import React, { useState, useEffect } from "react";
import {
  banner_img1,
  banner_img2,
  banner_img3,
  down_arrow_img,
  generalbanner_img,
  header_icon,
} from "../../imagepath";
import axios from "axios";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
function Homebanner() {
  const config = "/";



  const [selectedDate, setSelectedDate] = useState(null);
  const [locationCoords, setLocationCoords] = useState({
    latitude: null,
    longitude: null,
  });
  const [locationText, setLocationText] = useState("");
  const [reverseGeocodeUrl, setReverseGeocodeUrl] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationCoords({ latitude, longitude });
          setLocationText(`(${latitude}, ${longitude})`);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleLocationChange = (input) => {
    setLocationText(input);
    const suggestionsList = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX"];
    const filteredSuggestions = suggestionsList.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const fetchReverseGeocodeData = async () => {
    try {
      const response = await axios.get(reverseGeocodeUrl);
      console.log("response", response)
      if (response.data.results && response.data.results[0] && response.data.results[0].formatted_address) {
        const address = response.data.results[0].formatted_address;
        setLocationText(address);
      } else {
        console.error("Error: Unexpected response format from Geocoding API");
      }
      // setLocationText(address);
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }
  };

  useEffect(() => {
    if (locationCoords.latitude && locationCoords.longitude) {
      const apiKey = 'AIzaSyB0IQNhXFIYprPcH9f5BFMFAWUbp98U_5c';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationCoords.latitude},${locationCoords.longitude}&key=${apiKey}`;
      setReverseGeocodeUrl(url);
    }
  }, [locationCoords.latitude, locationCoords.longitude]);

  useEffect(() => {
    if (reverseGeocodeUrl) {
      fetchReverseGeocodeData();
    }
  }, [reverseGeocodeUrl]);

  useEffect(() => {
    handleLocationClick();
  }, []);
  //////

  return (
    <>
      <>
        <section className="banner-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="banner-content aos" data-aos="fade-up">
                  <h1>
                    Consult <span>Best Doctors</span> Your Nearby Location.
                  </h1>
                  <img
                    src={header_icon}
                    className="header-icon"
                    alt="header-icon"
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  </p>
                  {/* <Link to="/patient/booking1" className="btn-start-consultent">
                    Start a Consult
                  </Link> */}
                  {/* <div className="banner-arrow-img">
                    <img src={down_arrow_img} className="img-fluid" alt="" />
                  </div> */}
                </div>
                <div className="search-box-one aos " data-aos="fade-up">
                  <form action={`${config}/patient/search-doctor1`}>
                    {/* <div className="search-input search-line">
                      <i>
                        <FeatherIcon icon="search" style={{ width: "16px" }} />
                      </i>
                      <div className="form-group mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search doctors, clinics, hospitals, etc"
                        />
                      </div>
                    </div> */}
                    <div className="search-input search-map-line">
                      <i>
                        <FeatherIcon icon="map-pin" style={{ width: "16px" }} />
                      </i>
                      <div className="form-group mb-0">
                        {/* <input
                          type="text"
                          className="form-control"
                          placeholder="Location"
                        /> */}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Location"
                          value={locationText}
                          onChange={(e) => handleLocationChange(e.target.value)}
                        // onFocus={toggleSuggestions}
                        />
                        <Link
                          className="current-loc-icon current_location"
                          to="#"
                        >
                          <i>
                            <FeatherIcon
                              icon="crosshair"
                              style={{ width: "16px" }}
                            />
                          </i>
                        </Link>
                      </div>
                    </div>

                    <div className="search-input search-line">
                      {/* <i>
                        <FeatherIcon icon="search" style={{ width: "16px" }} />
                      </i> */}
                      <div className="form-group mb-0 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search doctors, clinics, hospitals, etc"
                        />
                      </div>
                    </div>
                    {/* <div className="search-input search-calendar-line">
                      <i>
                        <FeatherIcon
                          icon={"calendar"}
                          // style={{ width: "16px" }}
                        />
                      </i>
                      <div className="form-group mb-0">
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          placeholderText="Date"
                        />
                      </div>
                    </div> */}
                    <div className=" form-search-btn">
                      <button className="btn" type="submit">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                {/* <i>
                  <i className="feather-map-pin">
                    <i className="feather-crosshair">
                      <i className="feather-calendar">
                        
                      </i>
                    </i>
                  </i>
                </i> */}
              </div>
              <div className="col-lg-6">
                <div className="banner-img aos" data-aos="fade-up">
                  <img src={generalbanner_img} className="img-fluid" alt="" />
                  <div className="banner-img1">
                    <img src={banner_img1} className="img-fluid" alt="" />
                  </div>
                  <div className="banner-img2">
                    <img src={banner_img2} className="img-fluid" alt="" />
                  </div>
                  <div className="banner-img3">
                    <img src={banner_img3} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default Homebanner;
