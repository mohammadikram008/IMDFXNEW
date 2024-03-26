import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  specialities_01,
  specialities_02,
  specialities_03,
  specialities_04,
  specialities_05,
  specialities_06,
} from "../../imagepath";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Speacialities() {
  const [doctors, setDoctors] = useState([]);
  const [doctorsApiData, setDoctorsApiData] = useState([]);
  const history = useHistory();
  const fetchDoctorsBySpecialty = async (specialty) => {
    try {
      // Replace the URL with your actual backend URL
      // const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/doctors-by-specialty/${specialty}`);
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/doctors-by-specialty/${specialty}`);
      setDoctors(response.data);
      console.log("serachdoc", response.data);
      // history.push(`/patient/search-doctor1?specialty=${response.data}`);

      history.push({
        pathname: "/patient/search-doctor1",
        state: { doctors: response.data },
      });
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSpecialtyClick = (specialty) => {
    fetchDoctorsBySpecialty(specialty);
  };
  const handleAllSpecialtyClick = (specialty) => {
    history.push({
      pathname: "/patient/search-doctor1",
      state: { doctors: doctorsApiData },
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is already available in state

        const response = await axios.get("https://imdfx-newserver-production.up.railway.app/api/doctorpersnoldetails");
        setDoctorsApiData(response.data);
        console.log("response data111", response.data);

      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);
  //Aos
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  const specialitysettings = {
    items: 3,
    loop: true,
    margin: 15,
    dots: false,
    nav: true,
    navContainer: ".slide-nav-1",
    navText: [
      '<i class="fas fa-chevron-left custom-arrow"></i>',
      '<i class="fas fa-chevron-right custom-arrow"></i>',
    ],

    autoplay: false,
    infinite: "true",

    slidestoscroll: 1,
    rtl: "true",
    rows: 1,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      575: {
        items: 2,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1300: {
        items: 5,
      },
    },
  };
  return (
    <>
      <section className="specialities-section-one">
        <div className="container">
          <div className="row">
            <div className="col-md-6 aos" data-aos="fade-up">
              <div className="section-header-one section-header-slider">
                <h2 className="section-title">Specialities</h2>
              </div>
            </div>
            <div className="col-md-6 aos" data-aos="fade-up">
              <div className="owl-nav slide-nav-1 text-end nav-control" />
            </div>
          </div>
          <div
            className="specialities-slider-one owl-theme aos"
            data-aos="fade-up"
          >
            <OwlCarousel {...specialitysettings}>
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Cardiologist")} className="item">


                <div className="specialities-item"  >
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_01} alt="" />
                    </span>
                  </div>
                  <p>Cardiology</p>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Neurology")}>


                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_02} alt="" />
                    </span>
                  </div>
                  <p>Neurology</p>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Urology")} className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_03} alt="" />
                    </span>
                  </div>
                  <p>Urology</p>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Orthopedic")} className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_04} alt="" />
                    </span>
                  </div>
                  <p>Orthopedic</p>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Dentist")} className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_05} alt="" />
                    </span>
                  </div>
                  <p>Dentist</p>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Ophthalmology")} className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_06} alt="" />
                    </span>
                  </div>
                  <p>Ophthalmology</p>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to={'patient/search-doctor1'} className="item"> */}
              <div onClick={() => handleSpecialtyClick("Neurology")} className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img src={specialities_02} alt="" />
                    </span>
                  </div>
                  <p>Neurology</p>
                </div>
              </div>
              {/* </Link> */}
            </OwlCarousel>
          </div>
          <div className="specialities-btn aos" data-aos="fade-up">
            <div onClick={() => handleAllSpecialtyClick()} className="btn">
              {/* <Link to="/patient/search-doctor1" className="btn"> */}
              See All Specialities
              {/* </Link> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Speacialities;
