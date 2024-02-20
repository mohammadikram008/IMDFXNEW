import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import IMG01 from "../../../assets/images/doc1.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as Yup from 'yup';

const currentYear = new Date().getFullYear();

const validationSchema = Yup.object().shape({
  holderName: Yup.string().required("Name is required"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number format")
    .test("is-valid-card-number", "Invalid card number", (value) => {
      if (!value) return false;
      const cardNumberWithoutDash = value.replace(/-/g, "");
      return /^\d{16}$/.test(cardNumberWithoutDash);
    }),
  expiryMonth: Yup.string()
    .required("Expiry month is required")
    .matches(/^(0[1-9]|1[0-2])$/, "Invalid expiry month")
    .test("is-valid-expiry-month", "Invalid expiry month", (value) => {
      if (!value) return false;
      const currentMonth = new Date().getMonth() + 1;
      return parseInt(value, 10) >= currentMonth && parseInt(value, 10) <= 12;
    }),
  expiryYear: Yup.string()
    .required("Expiry year is required")
    .matches(/^(20)\d{2}$/, "Invalid expiry year")
    .test("is-valid-expiry-year", "Invalid expiry year", (value) => {
      if (!value) return false;
      return parseInt(value, 10) >= currentYear;
    }),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "Invalid CVV"),
});

const initialValues = {
  holderName: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
};
const Checkout = (props) => {
  const history = useHistory()
  const { selectedDateData, selectedTimeSlot, doctorDetail } = props.location.state;
  console.log(selectedDateData, selectedTimeSlot, doctorDetail)
  const selectedDate = selectedDateData;
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("debitCard");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  console.log("doc_id:doctorDetail._id,", doctorDetail)
  const config = "/";
  const bookingDate = new Date().toISOString().slice(0, 10);
  const userId = localStorage.getItem('token');
  const navigate = async () => {
    history.goBack();
  };
  const handleSubmit = async(values, { setSubmitting }) => {
    console.log("FormData", values);
  };
  // const handlePaymentSubmit = async (e) => {
  //   e.preventDefault();

  //   // Handle the form submission logic, for example, send data to the server
  //   const paymentData = {
  //     cardName,
  //     cardNumber,
  //     expiryMonth,
  //     expiryYear,
  //     cvv,
  //     selectedDate,
  //     selectedTimeSlot,
  //     doc_id: doctorDetail._id,
  //     bookingDate: bookingDate,
  //     userId: userId,

  //   };
  //   console.log("alldata", paymentData)
  //   try {
  //     // Make your API request using Axios
  //     const response = await axios.post('http://localhost:3005/api/bookappointment', paymentData);

  //     // Add any further logic here based on the API response
  //     setCardName("")
  //     setCardNumber("")
  //     setExpiryMonth("")
  //     setExpiryYear("")
  //     setCvv("")
  //     toast.success("Payment Add SuccessFully");
  //     console.log('API response:', response.data);
  //     // alert("added")

  //   } catch (error) {
  //     toast.error("Login failed. Please try again.");
  //     console.error('Error making API request:', error);
  //   }

  //   // Perform actions such as making an API request with paymentData
  //   console.log("Payment Data:", paymentData);

  //   // Redirect or perform further actions based on the payment result
  //   // Example: props.history.push("/patient/booking-success");
  // };

  return (
    // <div>
    //   <Header {...props} />

    //   <div className="content">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-7 col-lg-8 mt-5">
    //           <div className="card">
    //             <div className="card-body">
    //               <form onSubmit={handlePaymentSubmit}>
    //                 <div className="payment-widget">
    //                   <h4 className="card-title">Payment Method</h4>
    //                   <div className="payment-list">
    //                     <div className="d-flex">


    //                       {/* Credit Card Payment */}
    //                       <label className="payment-radio credit-card-option">
    //                         <input
    //                           type="radio"
    //                           name="paymentMethod"
    //                           value="creditCard"
    //                           checked={paymentMethod === "creditCard"}
    //                           onChange={() => setPaymentMethod("creditCard")}
    //                         />
    //                         <span className="checkmark" />
    //                         Credit card
    //                       </label>
    //                       {/* PayPal Option */}
    //                       <label className="payment-radio paypal-option mx-4">
    //                         <input
    //                           type="radio"
    //                           name="paymentMethod"
    //                           value="paypal"
    //                           checked={paymentMethod === "paypal"}
    //                           onChange={() => setPaymentMethod("paypal")}
    //                         />
    //                         <span className="checkmark" />
    //                         PayPal
    //                       </label>
    //                     </div>
    //                     <div className="row">
    //                       <div className="col-md-6">
    //                         <div className="form-group card-label">
    //                           <label htmlFor="card_name">Name on Card</label>
    //                           <input
    //                             className="form-control"
    //                             id="card_name"
    //                             type="text"
    //                             value={cardName}
    //                             onChange={(e) => setCardName(e.target.value)}
    //                           />
    //                         </div>
    //                       </div>
    //                       <div className="col-md-6">
    //                         <div className="form-group card-label">
    //                           <label htmlFor="card_number">Card Number</label>
    //                           <input
    //                             className="form-control"
    //                             id="card_number"
    //                             type="text"
    //                             placeholder="1234  5678  9876  5432"
    //                             value={cardNumber}
    //                             onChange={(e) => setCardNumber(e.target.value)}
    //                           />
    //                         </div>
    //                       </div>
    //                       <div className="col-md-4">
    //                         <div className="form-group card-label">
    //                           <label htmlFor="expiry_month">Expiry Month</label>
    //                           <input
    //                             className="form-control"
    //                             id="expiry_month"
    //                             type="text"
    //                             placeholder="MM"
    //                             value={expiryMonth}
    //                             onChange={(e) => setExpiryMonth(e.target.value)}
    //                           />
    //                         </div>
    //                       </div>
    //                       <div className="col-md-4">
    //                         <div className="form-group card-label">
    //                           <label htmlFor="expiry_year">Expiry Year</label>
    //                           <input
    //                             className="form-control"
    //                             id="expiry_year"
    //                             type="text"
    //                             placeholder="YY"
    //                             value={expiryYear}
    //                             onChange={(e) => setExpiryYear(e.target.value)}
    //                           />
    //                         </div>
    //                       </div>
    //                       <div className="col-md-4">
    //                         <div className="form-group card-label">
    //                           <label htmlFor="cvv">CVV</label>
    //                           <input
    //                             className="form-control"
    //                             id="cvv"
    //                             type="text"
    //                             value={cvv}
    //                             onChange={(e) => setCvv(e.target.value)}
    //                           />
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   {/* ... (other payment methods) */}

    //                   {/* ... (other payment methods) */}
    //                   <div className="terms-accept">
    //                     <div className="custom-checkbox">
    //                       <input type="checkbox" id="terms_accept" required />
    //                       &nbsp;
    //                       <label htmlFor="terms_accept">
    //                         I have read and accept{" "}
    //                         <Link to="#">Terms &amp; Conditions</Link>
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="submit-section mt-4">
    //                     <button
    //                       type="submit"
    //                       className="btn btn-primary submit-btn"
    //                     >
    //                       Confirm and Pay
    //                     </button>
    //                   </div>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //         </div>


    //         <div className="col-md-5 col-lg-4 theiaStickySidebar mt-5">
    //           <StickyBox offsetTop={20} offsetBottom={20}>
    //             <div className="card booking-card">
    //               <div className="card-header">
    //                 <h4 className="card-title">Booking Summary</h4>
    //               </div>
    //               <div className="card-body">
    //                 <div className="booking-doc-info">

    //                   <img src={IMG01} alt="User Image" />

    //                   <div className="booking-info">
    //                     <h4>

    //                       {doctorDetail.name}

    //                     </h4>
    //                     <span>

    //                       {doctorDetail.education}

    //                     </span>
    //                     <span>

    //                       ,  {doctorDetail.conditionstreated}

    //                     </span>
    //                   </div>
    //                 </div>
    //                 <div className="booking-summary">
    //                   <div className="booking-item-wrap">
    //                     <ul className="booking-date">
    //                       <li>
    //                         Date: <span className="mx-2">{selectedDate}</span>
    //                       </li>
    //                       <li>
    //                         Time: <span className="mx-2">{selectedTimeSlot}</span>
    //                       </li>
    //                     </ul>
    //                     <ul className="booking-fee">
    //                       <li>
    //                         Consulting Fee <span>$100</span>
    //                       </li>
    //                       <li>
    //                         Booking Fee <span>$10</span>
    //                       </li>
    //                       <li>
    //                         Video Call <span>$50</span>
    //                       </li>
    //                     </ul>
    //                     <div className="booking-total">
    //                       <ul className="booking-total-list">
    //                         <li>
    //                           <span>Total</span>
    //                           <span className="total-cost">$160</span>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </StickyBox>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <ToastContainer />
    //   <Footer {...props} />
    // </div>
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
              <div className="payments-form">
                <form>
                  <div className="payment-form-group">

                    <div className="form-group w-100 d-flex  justify-content-between column-gap-2   align-items-center">
                      <div
                        onClick={() => {
                          setSelectedMethod("debitCard");
                        }}
                        className="card-body d-flex justify-content-center h-auto column-gap-3   align-items-end w-50 "
                        style={{
                          textAlign: "center",
                          maxHeight: "80px",
                          cursor: "pointer",
                          background:
                            selectedMethod === "debitCard"
                              ? "black"
                              : "linear-gradient(180deg, rgb(94, 239, 143) 0%, rgb(0, 166, 157) 100%)",
                          zIndex: selectedMethod === "debitCard" ? 2 : 1,
                          borderRadius: "5px",
                          boxShadow:
                            !selectedMethod === "debitCard"
                              ? "0px 0px 10px rgba(0, 0, 0, 0.25)"
                              : "none", // Add box shadow based on isSelected state
                          transition:
                            "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Add a transition for the transform and box-shadow properties
                        }}
                      >
                        <img
                          src="/visa.jpg"
                          className="img-fluid rounded   "
                          width={"50px"}
                          height={"50px"}
                        />
                        <img
                          src="/mastercard.png"
                          className="img-fluid rounded   "
                          width={"50px"}
                          height={"50px"}
                        />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedMethod("payPal");
                        }}
                        className="card-body d-flex justify-content-center h-auto  column-gap-3   align-items-end w-50 "
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                          maxHeight: "80px",

<<<<<<< HEAD
            <div className="col-md-5 col-lg-4 theiaStickySidebar mt-5">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div className="card booking-card">
                  <div className="card-header">
                    <h4 className="card-title">Booking Summary</h4>
                  </div>
                  <div className="card-body">
                    <div className="booking-doc-info">

                      <img src={IMG01} alt="User Image" />

                      <div className="booking-info">
                        <h4>

                          {doctorDetail && doctorDetail.name}

                        </h4>
                        <span>

                          {doctorDetail && doctorDetail.education}

                        </span>
                        <span>

                          ,  {doctorDetail && doctorDetail.conditionstreated}

                        </span>
=======
                          background:
                            selectedMethod === "payPal" ? "black"
                              : "linear-gradient(180deg, rgb(94, 239, 143) 0%, rgb(0, 166, 157) 100%)",
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
                        className="card-body d-flex justify-content-center h-auto  column-gap-3   align-items-end w-50 "
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                          maxHeight: "80px",
                          background:
                            selectedMethod === "wallet" ? "black"
                              : "linear-gradient(180deg, rgb(94, 239, 143) 0%, rgb(0, 166, 157) 100%)",
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
                        <h4 className="h5 text-white  fw-medium ">
                          Credits: 0.0$
                        </h4>
>>>>>>> 588ca224848002499de7d15b6bfad6878bf8864e
                      </div>
                    </div>
                    {selectedMethod === "debitCard" && (
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          setFieldValue,
                        }) => (
                          <Form>
                            <div className="form-group card-label">
                              <label>Name on Card</label>
                              <FastField
                                type="text"
                                name="holderName"
                                className="form-control"
                                placeholder="John Smith"
                              />
                              <ErrorMessage
                                name="holderName"
                                component="div"
                                className="error text-danger"
                              />
                            </div>

                            <div className="form-group card-label">
                              <label>Card Number</label>
                              <FastField
                                type="text"
                                name="cardNumber"
                                className={`form-control ${errors.cardNumber && touched.cardNumber
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                maxLength="19"
                                onKeyDown={(e) => {
                                  if (
                                    e.keyCode === 8 ||
                                    e.keyCode === 46 ||
                                    e.keyCode === 37 ||
                                    e.keyCode === 39
                                  )
                                    return;
                                  if (
                                    !/[0-9-]/.test(e.key) ||
                                    e.target.value.length >= 19
                                  )
                                    e.preventDefault();
                                  if (
                                    e.target.value.length === 4 ||
                                    e.target.value.length === 9 ||
                                    e.target.value.length === 14
                                  ) {
                                    e.target.value += "-";
                                    setFieldValue(
                                      "cardNumber",
                                      e.target.value
                                    );
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <ErrorMessage
                                name="cardNumber"
                                component="div"
                                className="error text-danger"
                              />
                            </div>

                            <div className="row align-items-end">
                              <div className="col-md-4 w-25 ">
                                <div className="form-group card-label">
                                  <label>Expiry Month</label>
                                  <FastField
                                    type="text"
                                    name="expiryMonth"
                                    className={`form-control ${errors.expiryMonth &&
                                      touched.expiryMonth
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    placeholder="MM"
                                    maxLength="2"
                                    onKeyDown={(e) => {
                                      if (
                                        !/^\d$/.test(e.key) &&
                                        e.key !== "Backspace"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  <ErrorMessage
                                    name="expiryMonth"
                                    component="div"
                                    className="error text-danger"
                                  />
                                </div>
                              </div>

                              <div className="col-md-4 w-25 ">
                                <div className="form-group card-label">
                                  <label>Expiry Year</label>
                                  <FastField
                                    type="text"
                                    name="expiryYear"
                                    className={`form-control ${errors.expiryYear &&
                                      touched.expiryYear
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    placeholder="YYYY"
                                    maxLength="4"
                                    onKeyDown={(e) => {
                                      if (
                                        !/^\d$/.test(e.key) &&
                                        e.key !== "Backspace"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  <ErrorMessage
                                    name="expiryYear"
                                    component="div"
                                    className="error text-danger"
                                  />
                                </div>
                              </div>

                              <div className="col-md-4 w-25 ">
                                <div className="form-group card-label">
                                  <label>CVV</label>
                                  <FastField
                                    type="password"
                                    name="cvv"
                                    className={`form-control ${errors.cvv && touched.cvv
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    placeholder="*"
                                    maxLength="3"
                                    onKeyDown={(e) => {
                                      if (
                                        !/^\d$/.test(e.key) &&
                                        e.key !== "Backspace"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  <ErrorMessage
                                    name="cvv"
                                    component="div"
                                    className="error text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    )}
                    {selectedMethod === "payPal" && (
                      <div className="d-flex flex-column justify-content-center align-items-center  gap-2">
                        <button style={{
                          background: "#dad6d6",

                        }} className="px-3 border rounded-2 w-25 ">
                          <img
                            src="/paypal.png"
                            className="img-fluid rounded-circle "
                            width={"80px"}
                            height={"40px"}
                          />
                        </button>
                        <button style={{
                          background: "#dad6d6",
                        }} className="px-3 border rounded-2 w-25 ">
                          <img
                            src="/stripe.png"
                            className="img-fluid rounded-circle "
                            width={"80px"}
                            height={"40px"}
                          />
                        </button>
                      </div>
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
                          Booking Date: <span>Sun, 30 Aug 2022</span>
                        </li>
                        <li>
                          Booking Time: <span>10.00AM to 11:00AM</span>
                        </li>
                      </ul>
                    </div>
                    <div className="booking-doctor-right">
                      <p>
                        <Link to="/patient/booking1">Edit</Link>
                      </p>
                    </div>
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
                    <div className="booking-doctor-right">
                      <p>
                        <Link to="/consultation">Edit</Link>
                      </p>
                    </div>
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
              <div className="booking-btn proceed-btn">
                <button
                onClick={()=>handleSubmit}
                  // to={/buyer/bookingsuccess/${profileId}}
                  className="btn btn-primary prime-btn"
                >
                  Proceed to Pay $163.00
                </button>
              </div>
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
  );
};

export default Checkout;
