import React, { useState } from "react";
import Footer from "../../footer";
import PatientSidebar from "../patienttsidebar";
import Header from "../../header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DoctorSidebar from "../sidebar";
const AddPescription = (props) => {
  const location = useLocation();
  const data = location.state.item;
  const docId = localStorage.getItem('token');
  console.log("USE", data)
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    userId: data.userDetail._id,
    doc_id: docId,
    name: "",
    quantity: "",
    days: "",
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async () => {
    // e.preventDefault();
    console.log("click");

    try {
      const allData = new FormData();

      // Append form data
      allData.append("userId", data.userDetail._id);
      allData.append("doc_id", docId);
      allData.append("name", formData.name);
      allData.append("quantity", formData.quantity);
      allData.append("days", formData.days);
      allData.append("morning", formData.morning);
      allData.append("afternoon", formData.afternoon);
      allData.append("evening", formData.evening);
      allData.append("night", formData.night);

      // Append file
      if (selectedFile) {
        allData.append("image", selectedFile);
      }
      // Make API request to save the form data
      const response = await axios.post("https://imdfx-newserver-production.up.railway.app/api/Prescription", allData);

      // Handle success or update state as needed
      console.log(response.data);

      // Clear the form after submission
      setFormData({
        name: "",
        quantity: "",
        days: "",
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFormclear = () => {
    setFormData({
      name: "",
      quantity: "",
      days: "",
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
    });
  }
  // const docId = localStorage.getItem('token');
  // const fetchAppointments = async () => {
  //   try {
  //     const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/mypatient/${docId}`);
  //     setAppointments(response.data);
  //     console.log("mypatient", response.data)
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchAppointments();
  //   // fetchpatientdata();
  // }, []);
  return (
    <div>
      <Header {...props} />
      {/* Breadcrumb */}
      {/* <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Add Prescription</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Add Prescription
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar">
              <div className="profile-sidebar">
                {/* <PatientSidebar /> */}
                <DoctorSidebar />
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Add Prescription</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="biller-info">
                        <h4 className="d-block">{data.userDetail.username}</h4>
                        <span className="d-block text-sm text-muted">
                          {data.userDetail.email}
                        </span>
                        {/* <span className="d-block text-sm text-muted">
                          Newyork, United States
                        </span> */}
                      </div>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <div className="billing-info">
                        <h4 className="d-block">{data.bookingDetail.selectedDate}</h4>
                        {/* <span className="d-block text-muted">#INV0001</span> */}
                      </div>
                    </div>
                  </div>
                  {/* 
                  <div className="add-more-item text-end">
                    <Link to="#0">
                      <i className="fas fa-plus-circle"></i> Add Item
                    </Link>
                  </div> */}

                  <div className="card card-table">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center">
                          <thead>
                            <tr>
                              <th style={{ minWwidth: "200p" }}>Name</th>
                              <th style={{ minWidth: "80px" }}>Quantity</th>
                              <th style={{ minWidth: "80px" }}>Days</th>
                              <th style={{ minwWidth: "100px" }}>Time</th>
                              <th style={{ minWidth: "80px" }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                              <td>
                                <input className="form-control" type="text" />
                              </td>
                              <td>
                                <input className="form-control" type="text" />
                              </td>
                              <td>
                                <input className="form-control" type="text" />
                              </td>
                              <td>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Morning
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Afternoon
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Evening
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />{" "}
                                    Night
                                  </label>
                                </div>
                              </td>
                              <td>
                                <Link
                                  to="#0"
                                  className="btn bg-danger-light trash"
                                >
                                  <i className="far fa-trash-alt"></i>
                                </Link>
                              </td>
                            </tr> */}
                            <tr>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="quantity"
                                  value={formData.quantity}
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="days"
                                  value={formData.days}
                                  onChange={handleInputChange}
                                />
                              </td>
                              <td>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="morning"
                                      checked={formData.morning}
                                      onChange={handleInputChange}
                                    />{" "}
                                    Morning
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="afternoon"
                                      checked={formData.afternoon}
                                      onChange={handleInputChange}
                                    />{" "}
                                    Afternoon
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="evening"
                                      checked={formData.evening}
                                      onChange={handleInputChange}
                                    />{" "}
                                    Evening
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="night"
                                      checked={formData.night}
                                      onChange={handleInputChange}
                                    />{" "}
                                    Night
                                  </label>
                                </div>

                              </td>

                            </tr>
                         


                          </tbody>
                        </table>
                        <div  className="upload-pdf text-center">
                                <div className="mb-4">
                                
                                  <div className="input-group">
                                    {/* <label className="input-group-text" htmlFor="inputGroupFile">
                                      upload
                                    </label> */}
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="inputGroupFile"
                                      onChange={handleFileChange}
                                    />
                                  </div>
                                  {selectedFile && <span className="text-gray-600">{selectedFile.name}</span>}
                                </div>
                              </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="row">
                    <div className="col-md-12 text-end">
                      <div className="signature-wrap">
                        <div className="signature">Click here to sign</div>
                        <div className="sign-name">
                          <p className="mb-0">( Dr. Darren Elder )</p>
                          <span className="text-muted">Signature</span>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-md-12">
                      <div className="submit-section">
                        <button
                          // type="submit"
                          className="btn btn-primary submit-btn"
                          onClick={() => handleFormSubmit()}
                        >
                          Save
                        </button>
                        <button
                          type="reset"
                          className="btn btn-secondary submit-btn"
                          onClick={handleFormclear}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default AddPescription;
