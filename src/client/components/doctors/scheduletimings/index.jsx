import React, { useEffect, useState } from "react";
import DoctorSidebar from "../sidebar";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { Modal } from "react-bootstrap";
import Header from "../../header";
import axios from "axios";
const ScheduleTiming = (props) => {
  const [addListEmp, setAddListEmp] = useState([""]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const docId = localStorage.getItem('token');
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
      setAppointments(response.data);
      console.log("mypatient", response.data)
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
  const handelAddEmp = () => {
    setAddListEmp([...addListEmp, " "]);
  };
  useEffect(() => { }, []);

  const handelRemoveEmp = (index) => {
    const listEmp = [...addListEmp];
    listEmp.splice(index, 1);
    setAddListEmp(listEmp);
  };
  const handleCall = () => {
    console.log("call");
    myMeeting();
  }
  const handleMessage = () => {
    console.log("message");
  }


  // Use a static room ID for all calls
  const staticRoomID = 'yourStaticRoomID';

  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const myMeeting = async (element) => {
    // generate Kit Token
    const appID = 2137259645;
    const serverSecret = "ee104c1fbf40ac2fc78e322a2356d319";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      staticRoomID, // Use the static room ID
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
    zp.joinRoom({
      container: element,
      // Remove sharedLinks code
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div>
      <Header {...props} />

      {/* Breadcrumb */}
      {/* <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Schedule Timings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Schedule Timings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container">
          <div className="row mt-5">
            {/* <div className="col-md-2 col-lg-2 col-xl-2 "></div> */}
            <div className="col-md-5 col-lg-4 col-xl-3  theiaStickySidebar">
              <DoctorSidebar />
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Schedule Timings</h4>
                      <div className="profile-box">
                        {/* <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label>Timing Slot Duration</label>
                              <select className="form-select form-control">
                                <option>30 mins</option>
                                <option>15 mins</option>
                                <option defaultValue="defaultValue">
                                  30 mins
                                </option>
                                <option>45 mins</option>
                                <option>1 Hour</option>
                              </select>
                            </div>
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card schedule-widget mb-0">
                              {/* <!-- Schedule Header --> */}
                              <div className="schedule-header">
                                {/* <!-- Schedule Nav --> */}
                                <div className="schedule-nav">
                                  <ul className="nav nav-tabs nav-justified">
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        // data-bs-toggle="tab"
                                        to="#slot_sunday"
                                      >
                                        Sunday
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        to="#slot_monday"
                                      >
                                        Monday
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        to="#slot_tuesday"
                                      >
                                        Tuesday
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        to="#slot_wednesday"
                                      >
                                        Wednesday
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        to="#slot_thursday"
                                      >
                                        Thursday
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        to="#slot_friday"
                                      >
                                        Friday
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link
                                        className="nav-link"
                                        data-bs-toggle="tab"
                                        to="#slot_saturday"
                                      >
                                        Saturday
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                {/* <!-- /Schedule Nav --> */}
                              </div>
                              {/* <!-- /Schedule Header -->
															
															<!-- Schedule Content --> */}
                              <div className="tab-content schedule-cont">
                                {/* <!-- Sunday Slot --> */}
                                <div id="slot_sunday" className="tab-pane fade">
                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Time Slots</span>
                                    <Link
                                      className="edit-link"
                                      data-bs-toggle="modal"
                                      to="#add_time_slot"
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </Link>
                                  </h4>
                                  <p className="text-muted mb-0">
                                    Not Available
                                  </p>
                                </div>
                                {/* <!-- /Sunday Slot -->

																<!-- Monday Slot --> */}
                                {
                                  appointments && appointments.map((item, index) => (

                                    <div className="doc-times" key={index}>
                                      <div className="doc-slot-list d-flex">
                                       <h5 className="d-flex "> 
                                         {item.PatietnDetails && item.PatietnDetails.username} 
                                          <p className="mx-4">
                                         Time:  8:00 pm - 11:30 pm
                                          </p>
                                        </h5>
                                        {/* <Link to="#" className="delete_schedule">
                                         <i className="fa fa-times"></i>
                                       </Link> */}
                                       <div className="d-flex">

                                        <div to="#" className="delete_schedule mx-3"  onClick={() => handleCall()}>
                                          <i className="fa fa-video"></i>
                                        </div>
                                        {/* <div
                                          className="myCallContainer"
                                          ref={myMeeting}
                                          style={{ width: '100px', height: '10px' }}
                                        ></div> */}
                                        <Link to="/doctor/chat-doctor" className="delete_schedule "
                                        //  onClick={() => handleMessage()}
                                         >
                                          <i className="fa fa-message"></i>
                                        </Link>
                                        </div>
                                      </div>

                                    </div>
                                  ))

                                }
                                {/* <!-- /Monday Slot -->

																<!-- Tuesday Slot --> */}
                                <div
                                  id="slot_tuesday"
                                  className="tab-pane fade"
                                >
                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Time Slots</span>
                                    <Link
                                      className="edit-link"
                                      data-bs-toggle="modal"
                                      to="#add_time_slot"
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </Link>
                                  </h4>
                                  <p className="text-muted mb-0">
                                    Not Available
                                  </p>
                                </div>
                                {/* <!-- /Tuesday Slot -->

																<!-- Wednesday Slot --> */}
                                <div
                                  id="slot_wednesday"
                                  className="tab-pane fade"
                                >
                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Time Slots</span>
                                    <Link
                                      className="edit-link"
                                      data-bs-toggle="modal"
                                      to="#add_time_slot"
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </Link>
                                  </h4>
                                  <p className="text-muted mb-0">
                                    Not Available
                                  </p>
                                </div>
                                {/* <!-- /Wednesday Slot --> */}

                                {/* <!-- Thursday Slot --> */}
                                <div
                                  id="slot_thursday"
                                  className="tab-pane fade"
                                >
                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Time Slots</span>
                                    <Link
                                      className="edit-link"
                                      data-bs-toggle="modal"
                                      to="#add_time_slot"
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </Link>
                                  </h4>
                                  <p className="text-muted mb-0">
                                    Not Available
                                  </p>
                                </div>
                                {/* <!-- /Thursday Slot --> */}

                                {/* <!-- Friday Slot --> */}
                                <div id="slot_friday" className="tab-pane fade">
                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Time Slots</span>
                                    <Link
                                      className="edit-link"
                                      data-bs-toggle="modal"
                                      to="#add_time_slot"
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </Link>
                                  </h4>
                                  <p className="text-muted mb-0">
                                    Not Available
                                  </p>
                                </div>
                                {/* <!-- /Friday Slot --> */}

                                {/* <!-- Saturday Slot --> */}
                                <div
                                  id="slot_saturday"
                                  className="tab-pane fade"
                                >
                                  <h4 className="card-title d-flex justify-content-between">
                                    <span>Time Slots</span>
                                    <Link
                                      className="edit-link"
                                      data-bs-toggle="modal"
                                      to="#add_time_slot"
                                    >
                                      <i className="fa fa-plus-circle"></i> Add
                                      Slot
                                    </Link>
                                  </h4>
                                  <p className="text-muted mb-0">
                                    Not Available
                                  </p>
                                </div>
                                {/* <!-- /Saturday Slot --> */}
                              </div>
                              {/* <!-- /Schedule Content --> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-2 col-lg-2 col-xl-2  "></div> */}
          </div>
        </div>
      </div>

      <Footer {...props} />

      {/* <!-- Add Time Slot Modal --> */}
      <div className="modal fade custom-modal" id="add_time_slot">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Time Slots</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="hours-info">
                  {addListEmp.map((add, index) => (
                    <>
                      <div key={index} className="row form-row hours-cont">
                        <div className="col-12 col-md-10">
                          <div className="row form-row">
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>Start Time</label>
                                <select className="form-select form-control">
                                  <option>30 mins</option>
                                  <option>12.00 am</option>
                                  <option>12.30 am</option>
                                  <option>1.00 am</option>
                                  <option>1.30 am</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>End Time</label>
                                <select className="form-select form-control">
                                  <option>30 mins</option>
                                  <option>12.00 am</option>
                                  <option>12.30 am</option>
                                  <option>1.00 am</option>
                                  <option>1.30 am</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-2">
                          <label className="d-md-block d-sm-none d-none">
                            &nbsp;
                          </label>
                          <Link
                            to="#"
                            className="btn btn-danger trash"
                            onClick={() => handelRemoveEmp(index)}
                          >
                            <i className="far fa-trash-alt"></i>
                          </Link>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                <div className="add-more mb-3">
                  <Link to="#" className="add-hours" onClick={handelAddEmp}>
                    <i className="fa fa-plus-circle"></i> Add More
                  </Link>
                </div>
                <div className="submit-section text-center">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Add Time Slot Modal -->
		
		<!-- Edit Time Slot Modal --> */}
      <div
        className="modal fade custom-modal"
        id="edit_time_slot"
        style={{ marginTop: "50px" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Time Slots</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="hours-info">
                  <div className="row form-row hours-cont">
                    <div className="col-12 col-md-10">
                      <div className="row form-row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Start Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option defaultValue>12.00 am</option>
                              <option>12.30 am</option>
                              <option>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>End Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option>12.00 am</option>
                              <option defaultValue>12.30 am</option>
                              <option>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row form-row hours-cont">
                    <div className="col-12 col-md-10">
                      <div className="row form-row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Start Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option>12.00 am</option>
                              <option defaultValue>12.30 am</option>
                              <option>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>End Time</label>
                            <select className="form-select form-control">
                              <option>30 mins</option>
                              <option>12.00 am</option>
                              <option>12.30 am</option>
                              <option defaultValue>1.00 am</option>
                              <option>1.30 am</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-2">
                      <label className="d-md-block d-sm-none d-none">
                        &nbsp;
                      </label>
                      <Link to="#" className="btn btn-danger trash">
                        <i className="far fa-trash-alt"></i>
                      </Link>
                    </div>
                  </div>
                  {addListEmp.map((add, index) => (
                    <div key={index} className="row form-row hours-cont">
                      <div className="col-12 col-md-10">
                        <div className="row form-row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label>Start Time</label>
                              <select className="form-select form-control">
                                <option>30 mins</option>
                                <option>12.00 am</option>
                                <option>12.30 am</option>
                                <option defaultValue>1.00 am</option>
                                <option>1.30 am</option>
                              </select>
                            </div>
                          </div>

                          <div key={index} className="col-12 col-md-6">
                            <div className="form-group">
                              <label>End Time</label>
                              <select className="form-select form-control">
                                <option>30 mins</option>
                                <option>12.00 am</option>
                                <option>12.30 am</option>
                                <option>1.00 am</option>
                                <option defaultValue>1.30 am</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-2">
                        <label className="d-md-block d-sm-none d-none">
                          &nbsp;
                        </label>
                        <Link
                          to="#"
                          className="btn btn-danger trash"
                          onClick={() => handelRemoveEmp(index)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="add-more mb-3">
                  <Link to="#" className="add-hours" onClick={handelAddEmp}>
                    <i className="fa fa-plus-circle"></i> Add More
                  </Link>
                </div>
                <div className="submit-section text-center">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTiming;
