import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  IMG04,
  IMG05,
  IMG06,
  patient,
  patient1,
  patient2,
} from "./img";

const UpcomingTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const docId = localStorage.getItem('token');
  const fetchAppointments = async () => {
    try {


      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/doc_appointments/${docId}`);
      setAppointments(response.data);
      console.log("DOCAPP", response.data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchAppointments();
    // fetchpatientdata();
  }, []);
  return (
    <>
      {/* Upcoming Appointment Tab */}
      <div className="tab-pane show active" id="upcoming-appointments">
        <div className="card card-table mb-0">
          <div className="card-body">
            <div className="table-responsive">
              {/* <table className="table table-hover table-center mb-0">
                <thead style={{borderBottom:"none"}}>
                  <tr>
                    <th>Patient Name</th>
                    <th>Appt Date</th>
                    <th>Purpose</th>
                    <th>Type</th>
                    <th className="text-center">Paid Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody style={{borderTop:"none"}}>
                  <tr>
                    <td>
                      <h2 className="table-avatar">
                        <Link
                          to="/doctor/patient-profile"
                          className="avatar avatar-sm me-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src={patient}
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/doctor/patient-profile">
                          Richard Wilson <span>#PT0016</span>
                        </Link>
                      </h2>
                    </td>
                    <td>
                      11 Nov 2019{" "}
                      <span className="d-block text-info">10.00 AM</span>
                    </td>
                    <td>General</td>
                    <td>New Patient</td>
                    <td className="text-center">$150</td>
                    <td className="text-end">
                      <div className="table-action">
                        <Link to="#" className="btn btn-sm bg-info-light" style={{marginRight:"5px"}}>
                          <i className="far fa-eye" /> View
                        </Link>
                        <Link to="#" className="btn btn-sm bg-success-light" style={{marginRight:"5px"}}>
                          <i className="fas fa-check" /> Accept
                        </Link>
                        <Link to="#" className="btn btn-sm bg-danger-light" >
                          <i className="fas fa-times" /> Cancel
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="table-avatar">
                        <Link
                          to="/doctor/patient-profile"
                          className="avatar avatar-sm me-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src={patient1 }
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/doctor/patient-profile">
                          Charlene Reed <span>#PT0001</span>
                        </Link>
                      </h2>
                    </td>
                    <td>
                      3 Nov 2019{" "}
                      <span className="d-block text-info">11.00 AM</span>
                    </td>
                    <td>General</td>
                    <td>Old Patient</td>
                    <td className="text-center">$200</td>
                    <td className="text-end">
                      <div className="table-action">
                        <Link to="#" className="btn btn-sm bg-info-light" style={{marginRight:"5px"}}>
                          <i className="far fa-eye" /> View
                        </Link>
                        <Link to="#" className="btn btn-sm bg-success-light" style={{marginRight:"5px"}}>
                          <i className="fas fa-check" /> Accept
                        </Link>
                        <Link to="#" className="btn btn-sm bg-danger-light" >
                          <i className="fas fa-times" /> Cancel
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="table-avatar">
                        <Link
                          to="/doctor/patient-profile"
                          className="avatar avatar-sm me-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src={patient2}
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/doctor/patient-profile">
                          Travis Trimble <span>#PT0002</span>
                        </Link>
                      </h2>
                    </td>
                    <td>
                      1 Nov 2019{" "}
                      <span className="d-block text-info">1.00 PM</span>
                    </td>
                    <td>General</td>
                    <td>New Patient</td>
                    <td className="text-center">$75</td>
                    <td className="text-end">
                      <div className="table-action">
                        <Link to="#" className="btn btn-sm bg-info-light" style={{marginRight:"5px"}}>
                          <i className="far fa-eye" /> View
                        </Link>
                        <Link to="#" className="btn btn-sm bg-success-light" style={{marginRight:"5px"}}>
                          <i className="fas fa-check" /> Accept
                        </Link>
                        <Link to="#" className="btn btn-sm bg-danger-light" >
                          <i className="fas fa-times" /> Cancel
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="table-avatar">
                        <Link
                          to="/doctor/patient-profile"
                          className="avatar avatar-sm me-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src={IMG04}
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/doctor/patient-profile">
                          Carl Kelly <span>#PT0003</span>
                        </Link>
                      </h2>
                    </td>
                    <td>
                      30 Oct 2019{" "}
                      <span className="d-block text-info">9.00 AM</span>
                    </td>
                    <td>General</td>
                    <td>Old Patient</td>
                    <td className="text-center">$100</td>
                    <td className="text-end">
                      <div className="table-action">
                        <Link to="#" className="btn btn-sm bg-info-light" style={{marginRight:"5px"}}>
                          <i className="far fa-eye" /> View
                        </Link>
                        <Link to="#" className="btn btn-sm bg-success-light" style={{marginRight:"5px"}}>
                          <i className="fas fa-check" /> Accept
                        </Link>
                        <Link to="#" className="btn btn-sm bg-danger-light" >
                          <i className="fas fa-times" /> Cancel
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="table-avatar">
                        <Link
                          to="/doctor/patient-profile"
                          className="avatar avatar-sm me-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src={IMG05}
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/doctor/patient-profile">
                          Michelle Fairfax <span>#PT0004</span>
                        </Link>
                      </h2>
                    </td>
                    <td>
                      28 Oct 2019{" "}
                      <span className="d-block text-info">6.00 PM</span>
                    </td>
                    <td>General</td>
                    <td>New Patient</td>
                    <td className="text-center">$350</td>
                    <td className="text-end">
                      <div className="table-action">
                        <Link to="#" className="btn btn-sm bg-info-light" style={{marginRight:"5px"}}>
                          <i className="far fa-eye" /> View
                        </Link>
                        <Link to="#" className="btn btn-sm bg-success-light" style={{marginRight:"5px"}}>
                          <i className="fas fa-check" /> Accept
                        </Link>
                        <Link to="#" className="btn btn-sm bg-danger-light" >
                          <i className="fas fa-times" /> Cancel
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="table-avatar">
                        <Link
                          to="/doctor/patient-profile"
                          className="avatar avatar-sm me-2"
                        >
                          <img
                            className="avatar-img rounded-circle"
                            src={IMG06}
                            alt="User Image"
                          />
                        </Link>
                        <Link to="/doctor/patient-profile">
                          Gina Moore <span>#PT0005</span>
                        </Link>
                      </h2>
                    </td>
                    <td>
                      27 Oct 2019{" "}
                      <span className="d-block text-info">8.00 AM</span>
                    </td>
                    <td>General</td>
                    <td>Old Patient</td>
                    <td className="text-center">$250</td>
                    <td className="text-end">
                      <div className="table-action">
                        <Link to="#" className="btn btn-sm bg-info-light" style={{marginRight:"5px"}}>
                          <i className="far fa-eye" /> View
                        </Link>
                        <Link to="#" className="btn btn-sm bg-success-light" style={{marginRight:"5px"}}>
                          <i className="fas fa-check" /> Accept
                        </Link>
                        <Link to="#" className="btn btn-sm bg-danger-light" > 
                          <i className="fas fa-times" /> Cancel
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table> */}
              <table className="table table-hover table-center mb-0">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Appt Date</th>
                    <th>Purpose</th>
                    <th>Type</th>
                    <th className="text-center">Paid Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {loading ? <div><h4>Loading...</h4></div> :
                    appointments.map((appointment,index) => (
                      <tr key={index}>
                        <td>
                          <h2 className="table-avatar">
                            <Link
                              to={`/patient/doctor-profile/${appointment.PatietnDetails._id}`}
                              className="avatar avatar-sm me-2"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                // src={doc_1}
                                src={`https://imdfx-newserver-production.up.railway.app/api/${appointment.PatietnDetails.image}`}
                              // alt="Doctor"
                              />
                            </Link>
                            <Link
                              to={`/patient/doctor-profile/${appointment.PatietnDetails._id}`}
                            >
                              {appointment.PatietnDetails.username}{' '}
                              <span>{appointment.appointmentDetails.bookingDate}</span>
                            </Link>
                          </h2>
                        </td>
                        <td>
                          {appointment.appointmentDetails.selectedDate}{' '}
                          <span className="d-block text-info">
                            {/* {appointment.selectedTimeSlot} */}
                          </span>
                        </td>
                        {/* <td>{appointment.appointmentDetails.bookingDate}</td> */}
                        <td>$108</td>
                        <td>
                          <span className={`badge rounded-pill ${appointment.status === 'Confirm' ? 'bg-success-light' : 'bg-danger-light'}`}>
                            {/* {appointment.status} */}
                            accept
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="table-action">
                            <Link
                              to={`#0`}
                              className="btn btn-sm bg-primary-light"
                            >
                              <i className="fas fa-print"></i> Print
                            </Link>
                            &nbsp;
                            <Link
                              to={`#0`}
                              className="btn btn-sm bg-info-light"
                            >
                              <i className="far fa-eye"></i> View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* /Upcoming Appointment Tab */}
    </>
  );
};

export default UpcomingTab;
