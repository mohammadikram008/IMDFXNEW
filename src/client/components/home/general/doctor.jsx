import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Doctor1, Doctor2, Doctor3, Doctor4, Doctor5, book_doctor_01, book_doctor_03, book_doctor_02, book_doctor_04, book_doctor_05 } from "../image";
import OwlCarousel from "react-owl-carousel";
import { Card } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function Doctor() {
  const [doctordata, setDoctorData] = useState([]);
  //Aos
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  const fetchdoctordata = async () => {

    try {
      const response = await axios.get(`http://localhost:3005/api/doctorpersnoldetails`);
      setDoctorData(response.data);
      // console.log("doctordetails", response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);

    }
  };

  useEffect(() => {

    fetchdoctordata();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const imageUrl = "https://static.vecteezy.com/system/resources/previews/024/724/498/non_2x/asian-young-woman-doctor-with-stethoscope-in-uniform-smiling-isolated-on-transparent-medical-concept-generative-ai-png.png";


  const doctorData = [
    {
      imgSrc: book_doctor_02,
      amount: "$200",
      name: "Dr. Ruby Perrin",
      specialty: "Cardiology",
      rating: 4.5,
      reviews: 35,
      location: "New York, USA",
    },
    {
      imgSrc: book_doctor_03,
      amount: "$360",
      name: "Dr. Darren Elder",
      specialty: "Neurology",
      rating: 4.0,
      reviews: 20,
      location: "Florida, USA",
    },
    {
      imgSrc: book_doctor_04,
      amount: "$450",
      name: "Dr. Sofia Brient",
      specialty: "Urology",
      rating: 4.5,
      reviews: 30,
      location: "Georgia, USA",
    },
    {
      imgSrc: book_doctor_05,
      amount: "$570",
      name: "Dr. Paul Richard",
      specialty: "Orthopedic",
      rating: 4.3,
      reviews: 45,
      location: "Michigan, USA",
    },
    {
      imgSrc: book_doctor_01,
      amount: "$880",
      name: "Dr. John Doe",
      specialty: "Dentist",
      rating: 4.4,
      reviews: 50,
      location: "California, USA",
    },
  ];
  const doctors = [
    {
      name: "Ms. Akeena",
      feild: "Dermatologist",
      date: "Mon 11-2023",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      imgSrc: book_doctor_02,
      imageUrl: "https://static.vecteezy.com/system/resources/previews/024/724/498/non_2x/asian-young-woman-doctor-with-stethoscope-in-uniform-smiling-isolated-on-transparent-medical-concept-generative-ai-png.png",
    },
    {
      name: "Ms. Jospeh",
      feild: "Gynecologist",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      date: "Wed 17-2023",

      imgSrc: book_doctor_03,
      imageUrl: "https://www.seekpng.com/png/full/207-2070753_doctor-png-file-download-free-doctor-transparent.png",
    },
    {
      name: "Ms. Akeena",
      feild: "Urologist",
      date: "Mon 11-2023",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      imgSrc: book_doctor_01,
      imageUrl: "https://static.vecteezy.com/system/resources/previews/024/724/498/non_2x/asian-young-woman-doctor-with-stethoscope-in-uniform-smiling-isolated-on-transparent-medical-concept-generative-ai-png.png",
    },
    {
      name: "Ms. Jospeh",
      feild: "Gynecologist",
      date: "Wed 17-2023",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      imgSrc: book_doctor_04,
      imageUrl: "https://www.seekpng.com/png/full/207-2070753_doctor-png-file-download-free-doctor-transparent.png",
    },
    {
      name: "Dr. John Doe",
      feild: "ENT Specialist",
      date: "Fri 19-2023",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      imgSrc: book_doctor_05,
      imageUrl: "https://www.seekpng.com/png/full/207-2070753_doctor-png-file-download-free-doctor-transparent.png",
    },
    {
      name: "Dr. John Doe",
      feild: "Psychiatrist  ",
      date: "Fri 19-2023",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      imgSrc: book_doctor_02,
      imageUrl: "https://www.seekpng.com/png/full/207-2070753_doctor-png-file-download-free-doctor-transparent.png",
    },
    {
      name: "Dr. John Doe",
      feild: "Dentist",
      date: "Fri 19-2023",
      availableFrom: "10:00 AM",
      availableTo: "11:00 AM",
      imgSrc: book_doctor_03,
      imageUrl: "https://www.seekpng.com/png/full/207-2070753_doctor-png-file-download-free-doctor-transparent.png",
    },
    // Add more doctors as needed
  ];
  const doctersettings = {
    items: 3,
    loop: true,
    margin: 15,
    dots: false,
    nav: true,
    navContainer: ".slide-nav-2",
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
        items: 2,
      },
      1300: {
        items: 3,
      },
    },
  };
  console.log("doct", doctordata);
  return (
    <>
      <section className="doctors-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 aos" data-aos="fade-up">
              <div className="section-header-one section-header-slider">
                <h2 className="section-title">Best Doctors</h2>
              </div>
            </div>
            <div className="col-md-6 aos" data-aos="fade-up">
              <div className="owl-nav slide-nav-2 text-end nav-control" />
            </div>
          </div>
          <div className="doctor-slider-one doctor-slider-one-own   owl-theme aos" data-aos="fade-up">
            {/* Doctor Item */}
            <Slider {...settings} className="slick-lists" >
              {doctordata.map((doctor) => (
                <div className="doctor-card bg-gradient-card" key={doctor._id}>
                  <div className="doctor-header">
                    <div className="doctor-info">
                      <h2>  {doctor.name.length > 10
                        ? `${doctor.name.substring(0, 10)}...`
                        : doctor.name}
                      </h2>
                      <div className="badge">PLATINUM PROVIDER</div>
                    </div>
                    <p>{doctor.specialization}</p>
                  </div>

                  {doctor.daily.map((item) => (
                    <div className="doctor-body">

                      <h5>{item.timefrom} AM</h5> :<h5>{item.timetill} PM</h5>
                    </div>
                  ))}
                  <img src={imageUrl} className="doctor-image " />

                  <div>
                    <button className=" view-profile">View Profile</button>
                  </div>
                </div>
              ))}
            </Slider>
            {/* <OwlCarousel {...doctersettings}>
              {doctordata.map((doctor) => (
                <div className="doctor-card bg-gradient-card" key={doctor._id}>
                  <div className="doctor-header">
                    <div className="doctor-info">
                      <h2>{doctor.name}</h2>
                      <div className="badge">PLATINUM PROVIDER</div>
                    </div>
                    <p>{doctor.specialization}</p>
                  </div>
                  <div className="doctor-body">
                    <p>{`Condition Treated: ${doctor.conditionstreated}`}</p>
                    <p>{`About: ${doctor.aboutself}`}</p>
                    <p>{`Education: ${doctor.education}, College: ${doctor.college}`}</p>
                    <p>{`License: ${doctor.license}, Experience: ${doctor.yearofexperience} years`}</p>
                  </div>
                  <div>
                   
                  </div>
                </div>
              ))}
            </OwlCarousel> */}
            {/* /Doctor Item */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Doctor;
