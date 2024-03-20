import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import IMG01 from "../../../assets/images/doc1.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ModalComponent from './Modal'
import Paypal from "./Paypal";
const bookingDate = new Date();
const Checkout = (props) => {
  const history = useHistory()
  console.log("pro", props);
  const { selectedDateData, selectedTimeSlot, doctorDetail } = props.location.state;
  console.log("selectedDateData",selectedDateData,"selectedTimeSlot",selectedTimeSlot,"doctorDetail",doctorDetail);
  const selectedDate = selectedDateData;
  const [selectedMethod, setSelectedMethod] = useState("payPal");
  const navigate = async () => {
    history.goBack();
  };
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   // e.preventDefault();
  //   console.log("FormData", values);
  //   const paymentInfo = {
  //     ...values,
  //     cardName: values.holderName, // Map holderName to cardName
  //     cardNumber: values.cardNumber, // Map holderName to cardName
  //     cvv: values.cvv, // Map holderName to cardName
  //     expiryMonth: values.expiryMonth, // Map holderName to cardName
  //     expiryYear: values.expiryYear, // Map holderName to cardName
  //   };

  //   // Update modelform state with the payment information
  //   setModelForm(prevState => ({
  //     ...prevState,
  //     ...paymentInfo,
  //   }));
  //   // console.log(modelform);
  //   // const combinedData = {
  //   //   ...values, // Spread the values object
  //   //   ...modelform // Spread the modelform object
  //   // };
  //   // try {
  //   //   // Make your API request using Axios
  //   //   const response = await axios.post('https://imdfx-newserver-production.up.railway.app/api/bookappointment', combinedData);

  //   //   // Add any further logic here based on the API response
  //   //   setCardName("")
  //   //   setCardNumber("")
  //   //   setExpiryMonth("")
  //   //   setExpiryYear("")
  //   //   setCvv("")
  //   //   toast.success("Payment Add SuccessFully");
  //   //   console.log('API response:', response.data);
  //   //   alert("added")

  //   // } catch (error) {
  //   //   toast.error("Login failed. Please try again.");
  //   //   console.error('Error making API request:', error);
  //   // }
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Adjusting the state to include specific fields

  const userId = localStorage.getItem('token');
  const [modelform, setModelForm] = useState({
    gender: '',
    bookingFor: '',
    patientAge: '',
    details: '',
    doc_id: doctorDetail._id,
    selectedDate: selectedDate,
    selectedTimeSlot: selectedTimeSlot,
    bookingDate: bookingDate,
    userId, userId,
    Fees:"100",
  });
console.log("newfom",modelform);
  useEffect(() => {
    // Set isModalOpen to true after 2 seconds
    const timeoutId = setTimeout(() => {
      setIsModalOpen(true);
    }, 100);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModelForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmitmodel = async (event) => {
    event.preventDefault();
    console.log("modelform", modelform);
    try {
      // Make your API request using Axios
      const response = await axios.post('https://imdfx-newserver-production.up.railway.app/api/bookappointment', modelform);
      // Add any further logic here based on the API response
      toast.success("Payment Add SuccessFully");
      console.log('API response:', response.data);
      history.push(`/patient/booking-success`)

    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error('Error making API request:', error);
    }
  };
  const handleSubmit= async()=>{
    // const message="Your Transection is Successfull."
    // const notify = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/usertransectionnotification/${userId}`,{message} );
    setIsModalOpen(false)
  }
const handlechangeModel=()=>{
  if (!modelform.gender || !modelform.bookingFor || !modelform.patientAge || !modelform.details) {
    toast.error('Please fill all Form Feild');
  }else{

    setIsModalOpen(false);
  }

}
  return (
    <Fragment>
      <Header {...props} />


      <div className="main-wrapper">
        {/* <Headerconsultation /> */}
        {/* /Header */}
        {/* Page Content */}
        <div className="doctor-content">
          <div className="container">
            {/* Payment */}
            <div className="row">
              <div className="col-md-12">
                <div className="back-link">
                  <button onClick={() => navigate()}>
                    <i className="fa-solid fa-arrow-left-long" /> Back
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="paitent-header">
                  <h4 className="paitent-title">Payment</h4>
                </div>
                <div className="booking-header">
                  <h4 className="booking-title">Payments Methods</h4>
                </div>
                <div className="payments-form z-0">
                  <form >
                    <div className="payment-form-group d-flex z-0">

                      <div className="form-group w-100 d-flex  justify-content-between column-gap-2  z-0  align-items-center">
                        <div
                          onClick={() => {
                            setSelectedMethod("payPal");
                          }}
                          className="card-body border-secondary rounded-2 border d-flex justify-content-center h-auto  column-gap-3   align-items-end w-50 "
                          style={{
                            textAlign: "center",
                            cursor: "pointer",
                            maxHeight: "80px",

                            background:
                              selectedMethod === "payPal" ? "#e9e9e6"
                                : "white",
                            zIndex: selectedMethod === "payPal" ? 2 : 1,
                            borderRadius: "5px",
                            boxShadow:
                              !selectedMethod === "payPal"
                                ? "0px 0px 10px rgba(0, 0, 0, 0.25)"
                                : "none", // Add box shadow based on isSelected state
                            transition:
                              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Add a transition for the transform and box-shadow properties
                          }}
                        >
                          <img
                            src="/paypalIcon.png"
                            className="img-fluid rounded   "
                            width={"40px"}
                            height={"40px"}
                          />
                          <img
                            src="/stripeIcon.png"
                            className="img-fluid rounded   "
                            width={"40px"}
                            height={"40px"}
                          />
                        </div>
                        <div
                          onClick={() => {
                            setSelectedMethod("wallet");
                          }}
                          className="card-body border-secondary rounded-2 border d-flex justify-content-center h-auto  column-gap-3 z-0   align-items-end w-50 "
                          style={{
                            textAlign: "center",
                            cursor: "pointer",
                            maxHeight: "80px",
                            background:
                              selectedMethod === "wallet" ? "#e9e9e6"
                                : "white",
                            zIndex: selectedMethod === "wallet" ? 2 : 1,
                            borderRadius: "5px",
                            boxShadow:
                              !selectedMethod === "wallet"
                                ? "0px 0px 10px rgba(0, 0, 0, 0.25)"
                                : "none", // Add box shadow based on isSelected state
                            transition:
                              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Add a transition for the transform and box-shadow properties
                          }}
                        >
                          <img
                            src="/walletIcon.png"
                            className="img-fluid"
                            width={"30px"}
                            height={"30px"}
                          />
                          <h4 className="h5 text-black  fw-medium ">
                            Credits: 0.0$
                          </h4>
                        </div>
                      </div>
                      {selectedMethod === "payPal" && (
                        // <div className="d-flex justify-content-center align-items-center  gap-2">
                        //   <button style={{
                        //     background: "#dad6d6",
                        //     outline:"none"
                        //   }} className="rounded-2 border-0 w-25 ">
                        //     <img
                        //       src="/paypal.png"
                        //       className="img-fluid rounded-circle "
                        //       width={"80px"}
                        //       height={"20px"}
                        //     />
                        //   </button>
                        //   <button style={{
                        //     background: "#dad6d6",
                        //     outline:"none"

                        //   }} className="rounded-2 border-0 w-25 ">
                        //     <img
                        //       src="/stripe.png"
                        //       className="img-fluid rounded-circle "
                        //       width={"80px"}
                        //       height={"20px"}
                        //     />
                        //   </button>
                        // </div>
                        <Paypal  modelform={modelform} />
                      )}
                      {selectedMethod === "wallet" && (
                        <div
                          style={{
                            backgroundColor: "#FEBEBE",
                          }}
                          className="container d-flex  rounded-4 justify-content-between  align-items-center  p-4 "
                        >
                          <h4 className="h5 text-danger  fw-medium ">
                            Your balance
                          </h4>
                          <h4 className="h5 text-danger  fw-medium ">0.0$</h4>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="booking-header">
                  <h4 className="booking-title">Booking Summary</h4>
                </div>
                <div className="card booking-card">
                  <div className="card-body booking-card-body">
                    <div className="booking-doctor-details">
                      <div className="booking-doctor-left">
                        <div className="booking-doctor-img">
                          <Link to="/patient/doctor-profile">
                            <img src={IMG01} alt="" />
                          </Link>
                        </div>
                        <div className="booking-doctor-info">
                          <h4>
                            <Link to="/patient/doctor-profile">{doctorDetail.name}</Link>
                          </h4>
                          <p>{doctorDetail.education}</p>
                        </div>
                      </div>
                      <div className="booking-doctor-right">
                        <p>
                          <i className="fas fa-circle-check" />
                          <Link to="/doctor/profile-setting">Edit</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card booking-card">
                  <div className="card-body booking-card-body booking-list-body">
                    <div className="booking-list">
                      <div className="booking-date-list">
                        <ul>
                          <li>
                            Booking Date: <span>{selectedDateData}</span>
                          </li>
                          <li>
                            Booking Time: <span>{selectedTimeSlot}</span>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="booking-doctor-right">
                        <p>
                          <Link to="/patient/booking1">Edit</Link>
                        </p>
                      </div> */}
                    </div>
                    <div className="booking-list">
                      <div className="booking-date-list">
                        <ul>
                          <li>
                            Consultation Type:{" "}
                            <span>
                              <i className="feather-video" /> Video Consulting
                            </span>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="booking-doctor-right">
                        <p>
                          <Link to="/consultation">Edit</Link>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="card booking-card">
                  <div className="card-body booking-card-body booking-list-body">
                    <div className="booking-list">
                      <div className="booking-date-list consultation-date-list">
                        <ul>
                          <li>
                            Consultation Fee: <span>$150.00</span>
                          </li>
                          <li>
                            Booking Fee: <span>$8.00</span>
                          </li>
                          <li>
                            Tax: <span>$5.00</span>
                          </li>
                          <li>
                            <span className="total-amount" />
                            Total <span>$163.00</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {selectedMethod === "wallet" && <div className="booking-btn proceed-btn">
                  <button
                    onClick={(e) => {
                      handleSubmitmodel(e)
                    }}
                    className="btn btn-primary prime-btn"
                  >
                    Proceed to Pay $163.00
                  </button>
                </div>}
              </div>
            </div>
            {/* /Payment */}
          </div>
        </div>
        {/* /Page Content */}
        {/* Cursor */}
        <div className="mouse-cursor cursor-outer" />
        <div className="mouse-cursor cursor-inner" />
        {/* /Cursor */}
      </div>


      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <div className="d-flex justify-content-center align-items-center gap-3 flex-column w-100">
          <h2 className="w-100 text-center fs-5 fw-bold">Appointment Form</h2>
          {/* Gender Select */}
          <div className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
            <label>Gender:</label>
            <select required={true} className="form-control" name="gender" value={modelform.gender} onChange={handleChange}>
              <option value="">Select Gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Booking For Select */}
          <div className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
            <label>Booking for:</label>
            <select required={true} className="form-control" name="bookingFor" value={modelform.bookingFor} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="self">Self</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Patient Age Input */}
          <div className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
            <label>Age:</label>
            <input className="form-control"
              type="number"
              name="patientAge"
              value={modelform.patientAge}
              onChange={handleChange}
              required={true}
              placeholder="Patient Age"
            />
          </div>

          {/* Details Textarea */}
          <div className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
            <label>Details:</label>
            <textarea className="form-control"
              name="details"
              value={modelform.details}
              onChange={handleChange}
              required={true}
              placeholder="Enter details here..."
            />
          </div>

          <button className="btn btn-primary"
          //  onClick={() => {
            
          //   setIsModalOpen(false)
          //   console.log(modelform)
          // }} 
          onClick={()=>handlechangeModel()}
          type="text">Submit</button>
        </div>
      </ModalComponent>


      <ToastContainer />
    </Fragment>
  );
};

export default Checkout;
