import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import IMG01 from "../../../assets/images/doc1.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Checkout = (props) => {

  const { selectedDateData, selectedTimeSlot, doctorDetail } = props.location.state;
  const selectedDate = selectedDateData;
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  console.log("doc_id:doctorDetail._id,", doctorDetail)
  const config = "/";
  const bookingDate = new Date().toISOString().slice(0, 10);
  const userId = localStorage.getItem('token');

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Handle the form submission logic, for example, send data to the server
    const paymentData = {
      cardName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      selectedDate,
      selectedTimeSlot,
      doc_id: doctorDetail._id,
      bookingDate: bookingDate,
      userId:userId,

    };
    console.log("alldata", paymentData)
    try {
      // Make your API request using Axios
      const response = await axios.post('http://localhost:3005/api/bookappointment', paymentData);

      // Add any further logic here based on the API response
      setCardName("")
      setCardNumber("")
      setExpiryMonth("")
      setExpiryYear("")
      setCvv("")
      toast.success("Payment Add SuccessFully");
      console.log('API response:', response.data);
      // alert("added")

    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error('Error making API request:', error);
    }

    // Perform actions such as making an API request with paymentData
    console.log("Payment Data:", paymentData);

    // Redirect or perform further actions based on the payment result
    // Example: props.history.push("/patient/booking-success");
  };

  return (
    <div>
      <Header {...props} />

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-8 mt-5">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="payment-widget">
                      <h4 className="card-title">Payment Method</h4>
                      <div className="payment-list">
                        <div className="d-flex">


                          {/* Credit Card Payment */}
                          <label className="payment-radio credit-card-option">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="creditCard"
                              checked={paymentMethod === "creditCard"}
                              onChange={() => setPaymentMethod("creditCard")}
                            />
                            <span className="checkmark" />
                            Credit card
                          </label>
                          {/* PayPal Option */}
                          <label className="payment-radio paypal-option mx-4">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="paypal"
                              checked={paymentMethod === "paypal"}
                              onChange={() => setPaymentMethod("paypal")}
                            />
                            <span className="checkmark" />
                            PayPal
                          </label>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group card-label">
                              <label htmlFor="card_name">Name on Card</label>
                              <input
                                className="form-control"
                                id="card_name"
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group card-label">
                              <label htmlFor="card_number">Card Number</label>
                              <input
                                className="form-control"
                                id="card_number"
                                type="text"
                                placeholder="1234  5678  9876  5432"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group card-label">
                              <label htmlFor="expiry_month">Expiry Month</label>
                              <input
                                className="form-control"
                                id="expiry_month"
                                type="text"
                                placeholder="MM"
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group card-label">
                              <label htmlFor="expiry_year">Expiry Year</label>
                              <input
                                className="form-control"
                                id="expiry_year"
                                type="text"
                                placeholder="YY"
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group card-label">
                              <label htmlFor="cvv">CVV</label>
                              <input
                                className="form-control"
                                id="cvv"
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ... (other payment methods) */}

                      {/* ... (other payment methods) */}
                      <div className="terms-accept">
                        <div className="custom-checkbox">
                          <input type="checkbox" id="terms_accept" required />
                          &nbsp;
                          <label htmlFor="terms_accept">
                            I have read and accept{" "}
                            <Link to="#">Terms &amp; Conditions</Link>
                          </label>
                        </div>
                      </div>
                      <div className="submit-section mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                        >
                          Confirm and Pay
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>


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

                          {doctorDetail.name}

                        </h4>
                        <span>

                          {doctorDetail.education}

                        </span>
                        <span>

                          ,  {doctorDetail.conditionstreated}

                        </span>
                      </div>
                    </div>
                    <div className="booking-summary">
                      <div className="booking-item-wrap">
                        <ul className="booking-date">
                          <li>
                            Date: <span className="mx-2">{selectedDate}</span>
                          </li>
                          <li>
                            Time: <span className="mx-2">{selectedTimeSlot}</span>
                          </li>
                        </ul>
                        <ul className="booking-fee">
                          <li>
                            Consulting Fee <span>$100</span>
                          </li>
                          <li>
                            Booking Fee <span>$10</span>
                          </li>
                          <li>
                            Video Call <span>$50</span>
                          </li>
                        </ul>
                        <div className="booking-total">
                          <ul className="booking-total-list">
                            <li>
                              <span>Total</span>
                              <span className="total-cost">$160</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StickyBox>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer {...props} />
    </div>
  );
};

export default Checkout;
