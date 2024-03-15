import React, { useEffect, useState } from "react";
import { IMG01 } from "./img";
import Header from "../../../header";
import Footer from "../../../footer";
import { Link } from "react-router-dom";
import { greenlogo } from "../../../imagepath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useLocation } from 'react-router-dom';
const InvoiceView = (props) => {
  const location = useLocation();
  const history = useHistory()
  // const dataFromState = location.state && location.state.appointment ?location.state.appointment:location.state.data;
  const doc_id = location.state && location.state.id;
  console.log("doc_id",doc_id);
  // useEffect(() => {
  //   // Set isModalOpen to true after 2 seconds
  //   const timeoutId = setTimeout(() => {
  //     history.push('/patient/dashboard')
  //   }, 5000);

  //   // Clean up the timeout to avoid memory leaks
  //   return () => clearTimeout(timeoutId);
  // }, []);
  const userId = localStorage.getItem('token');
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState([]);
  const fetchpaymet = async () => {
    try {
      const response = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/getbookappointmenttime/${userId}`, {doc_id});
      const responseuser = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getpatient/${userId}`);
      setAppointments(response.data);
      console.log("invoce",response.data);
      setUser(responseuser.data);


      console.log("user", responseuser.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);

    }
  };
  useEffect(() => {

    fetchpaymet()
  }, [doc_id]);
  return (
    <div>
      <Header {...props} />
      <>
        {/* Page Content */}
        <div style={{
          paddingTop: "10rem",
          height: "100vh"
        }} className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="invoice-content">
                  {
                    appointments && appointments.map((appointments, index) => (
                      <>

                        <div className="invoice-item">


                          <div className="row">
                            <div className="col-md-6">
                              {/* <div className="invoice-logo">
                        <img src={greenlogo} alt="logo" className="w-50" />
                      </div> */}
                            </div>

                            <div className="col-md-6">
                              <p className="invoice-details">
                                <strong>Order:</strong> #00124 <br />
                                <strong>Issued:</strong> {appointments && appointments.appointmentDetails.bookingDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Invoice Item */}
                        < div className="invoice-item" >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="invoice-info">
                                <strong className="customer-text">
                                  Invoice From
                                </strong>


                                <p className="invoice-details invoice-details-two">
                                  {user.username} <br />
                                  {user.email}
                                  <br />
                                  {/* Newyork, USA <br /> */}
                                </p>



                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="invoice-info invoice-info2">
                                <strong className="customer-text">Invoice To</strong>
                                <p className="invoice-details">
                                  {appointments.doctorDetails.name} <br />
                                  {appointments.doctorDetails.specialization} <br />
                                  {appointments.doctorDetails.email} <br />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Invoice Item */}
                        {/* Invoice Item */}
                        <div className="invoice-item">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="invoice-info">
                                <strong className="customer-text">
                                  Payment Method
                                </strong>
                                <p className="invoice-details invoice-details-two">
                                  Debit Card <br />
                                  {/* XXXXXXXXXXXX-2541 <br /> */}
                                  {appointments ? appointments.doctorDetails.paymethod : "PayPal"}
                                  <br />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Invoice Item */}
                        {/* Invoice Item */}
                        <div className="invoice-item invoice-table-wrap">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="table-responsive">
                                <table className="invoice-table table table-bordered">
                                  <thead style={{ borderBottom: "none" }}>
                                    <tr>
                                      <th>Description</th>
                                      <th className="text-center">Quantity</th>
                                      <th className="text-center">VAT</th>
                                      <th className="text-end">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ borderTop: "none" }}>
                                    <tr>
                                      <td>Video Call Booking</td>
                                      <td className="text-center">1</td>
                                      <td className="text-center">$0</td>
                                      <td className="text-end">$  {appointments.appointmentDetails.Fees}</td>
                                    </tr>
                                    {/* <tr>
                                    <td>Video Call Booking</td>
                                    <td className="text-center">1</td>
                                    <td className="text-center">$0</td>
                                    <td className="text-end">$250</td>
                                  </tr> */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-md-6 col-xl-4 ms-auto">
                              <div className="table-responsive">
                                <table className="invoice-table-two table">
                                  <tbody>
                                    <tr>
                                      <th>Subtotal:</th>
                                      <td>
                                        <span>$ {appointments.appointmentDetails.Fees}</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Discount:</th>
                                      <td>
                                        <span>0%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Total Amount:</th>
                                      <td>
                                        <span>$ {appointments.appointmentDetails.Fees}</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Invoice Item */}
                        {/* Invoice Information */}
                        {/* <div className="other-info">
                        <h4>Other information</h4>
                        <p className="text-muted mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Vivamus sed dictum ligula, cursus blandit risus. Maecenas
                          eget metus non tellus dignissim aliquam ut a ex. Maecenas
                          sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae
                          lorem interdum, eu scelerisque tellus fermentum. Curabitur
                          sit amet lacinia lorem. Nullam finibus pellentesque
                          libero.
                        </p>
                      </div> */}
                      </>
                    ))




                    // :dataFromState && 
                    //   <>

                    //     <div className="invoice-item">


                    //       <div className="row">
                    //         <div className="col-md-6">
                    //           {/* <div className="invoice-logo">
                    //       <img src={greenlogo} alt="logo" className="w-50" />
                    //     </div> */}
                    //         </div>

                    //         <div className="col-md-6">
                    //           <p className="invoice-details">
                    //             <strong>Order:</strong> #00124 <br />
                    //             <strong>Issued:</strong> {dataFromState.appointmentDetails.bookingDate}
                    //           </p>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     {/* Invoice Item */}
                    //     < div className="invoice-item" >
                    //       <div className="row">
                    //         <div className="col-md-6">
                    //           <div className="invoice-info">
                    //             <strong className="customer-text">
                    //               Invoice From
                    //             </strong>


                    //                 <p className="invoice-details invoice-details-two">
                    //                   {user.username} <br />
                    //                   {user.email}
                    //                   <br />
                    //                   {/* Newyork, USA <br /> */}
                    //                 </p>



                    //           </div>
                    //         </div>
                    //         <div className="col-md-6">
                    //           <div className="invoice-info invoice-info2">
                    //             <strong className="customer-text">Invoice To</strong>
                    //             <p className="invoice-details">
                    //               {dataFromState.doctorDetails.name} <br />
                    //               {dataFromState.doctorDetails.specialization} <br />
                    //               {dataFromState.doctorDetails.email} <br />
                    //             </p>
                    //           </div>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     {/* /Invoice Item */}
                    //     {/* Invoice Item */}
                    //     <div className="invoice-item">
                    //       <div className="row">
                    //         <div className="col-md-12">
                    //           <div className="invoice-info">
                    //             <strong className="customer-text">
                    //               Payment Method
                    //             </strong>
                    //             <p className="invoice-details invoice-details-two">
                    //               Debit Card <br />
                    //               {/* XXXXXXXXXXXX-2541 <br /> */}
                    //               { dataFromState? dataFromState.doctorDetails.paymethod:"PayPal"}
                    //               <br />
                    //             </p>
                    //           </div>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     {/* /Invoice Item */}
                    //     {/* Invoice Item */}
                    //     <div className="invoice-item invoice-table-wrap">
                    //       <div className="row">
                    //         <div className="col-md-12">
                    //           <div className="table-responsive">
                    //             <table className="invoice-table table table-bordered">
                    //               <thead style={{ borderBottom: "none" }}>
                    //                 <tr>
                    //                   <th>Description</th>
                    //                   <th className="text-center">Quantity</th>
                    //                   <th className="text-center">VAT</th>
                    //                   <th className="text-end">Total</th>
                    //                 </tr>
                    //               </thead>
                    //               <tbody style={{ borderTop: "none" }}>
                    //                 <tr>
                    //                   <td>Video Call Booking</td>
                    //                   <td className="text-center">1</td>
                    //                   <td className="text-center">$0</td>
                    //                   <td className="text-end">$  {dataFromState.appointmentDetails.Fees}</td>
                    //                 </tr>
                    //                 {/* <tr>
                    //                   <td>Video Call Booking</td>
                    //                   <td className="text-center">1</td>
                    //                   <td className="text-center">$0</td>
                    //                   <td className="text-end">$250</td>
                    //                 </tr> */}
                    //               </tbody>
                    //             </table>
                    //           </div>
                    //         </div>
                    //         <div className="col-md-6 col-xl-4 ms-auto">
                    //           <div className="table-responsive">
                    //             <table className="invoice-table-two table">
                    //               <tbody>
                    //                 <tr>
                    //                   <th>Subtotal:</th>
                    //                   <td>
                    //                     <span>$ {dataFromState.appointmentDetails.Fees}</span>
                    //                   </td>
                    //                 </tr>
                    //                 <tr>
                    //                   <th>Discount:</th>
                    //                   <td>
                    //                     <span>0%</span>
                    //                   </td>
                    //                 </tr>
                    //                 <tr>
                    //                   <th>Total Amount:</th>
                    //                   <td>
                    //                     <span>$ {dataFromState.appointmentDetails.Fees}</span>
                    //                   </td>
                    //                 </tr>
                    //               </tbody>
                    //             </table>
                    //           </div>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     {/* /Invoice Item */}
                    //     {/* Invoice Information */}
                    //     {/* <div className="other-info">
                    //       <h4>Other information</h4>
                    //       <p className="text-muted mb-0">
                    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    //         Vivamus sed dictum ligula, cursus blandit risus. Maecenas
                    //         eget metus non tellus dignissim aliquam ut a ex. Maecenas
                    //         sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae
                    //         lorem interdum, eu scelerisque tellus fermentum. Curabitur
                    //         sit amet lacinia lorem. Nullam finibus pellentesque
                    //         libero.
                    //       </p>
                    //     </div> */}
                    //   </>

                  }



                  {/* /Invoice Information */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div >
  );
};

export default InvoiceView;
