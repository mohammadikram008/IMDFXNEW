import React, { useState,useEffect } from "react";

import axios from "axios";
import DashboardSidebar from "../dashboard/sidebar/sidebar.jsx";
import { Modal } from "react-bootstrap";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";

const MedicalDetails = (props) => {
  const [show, setShow] = useState(false);
  const [medicalrecords, setMedicalRecord] = useState([]);
  const [operation, setOperation] = useState("add");
  const [formData, setFormData] = useState({
    bmi: "",
    hr: "",
    Weight: "",
    Fbc: "",
    dob: "", 
  });
  let count=1;
  const userId = localStorage.getItem('token');
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    try {
       // Check the operation flag and call the corresponding API
    if (operation === "add") {
      const response = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/medicaldetails/${userId}`, formData);
      setShow(false);
    } else if (operation === "edit") {
      const response = await axios.put(`https://imdfx-newserver-production.up.railway.app/api/updatemedicaldetails/${userId}`, formData);
      // Make an HTTP request to your API endpoint
      
      setShow(false);
      // Handle the response as needed
      console.log("API Response:", response.data);
    }
    
    } catch (error) {
      // Handle errors
      console.error("API Error:", error);
    }
  };
  const deleteDataApi = async () => {
    try {
      
      // Call your delete API
      const response = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/deletemedicaldetails/${userId}`);
      setShow(true);
      setShow(false);
      console.log(response.data);
      
      // Handle success or update state as needed
    } catch (error) {
      console.error("Error deleting data:", error);
      // Handle error
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchmedical = async () => {

    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getmedicaldetails/${userId}`);
      setMedicalRecord(response.data);
      console.log("setMedicalRecord", response.data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchmedical()

  }, [show]);
  const openModalForAdd = () => {
    setOperation("add");
    setShow(true);
  };

  const openModalForEdit = () => {
    setOperation("edit");
    setShow(true);
    // Fetch and populate the form data for editing
    // You may want to implement this based on your requirement
  };
  return (
    <div>
      <Header {...props} />
      {/* <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <h2 className="breadcrumb-title">Medical Details</h2>

                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index-2">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Medical Details
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DashboardSidebar />
              </StickyBox>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 mt-5">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title float-start">
                        Medical details
                      </h4>
                      <Link
                        to="#modal_medical_form"
                        className="btn btn-primary float-end"
                        onClick={()=>openModalForAdd()}
                      >
                        Add Details
                      </Link>
                    </div>
                    <div className="card-body ">
                      {/* Dependent Tab */}
                      <div className="card card-table mb-0">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>#</th>
                                 
                                  <th>BMI</th>
                                  <th className="text-center">Heart Rate</th>
                                  <th className="text-center">FBC Status</th>
                                  <th>Weight</th>
                                  <th>Order date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  medicalrecords && medicalrecords.map((item, index) => (
                                    <tr key={index}>
                                      <td>1</td>
                                   
                                      <td>{item.bmi}</td>
                                      <td className="text-center">{item.hr}</td>
                                      <td className="text-center">{item.Fbc}</td>
                                      <td>{item.Weight} Kg</td>
                                      <td>
                                     {item.dob}
                                        {/* <span className="d-block text-info">
                                          10.00 AM
                                        </span> */}
                                      </td>
                                      <td>
                                        <div className="table-action">
                                          <Link
                                            to="#edit_medical_form"
                                            onClick={()=>openModalForEdit()}
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="fas fa-edit" /> Edit
                                          </Link>{" "}
                                          &nbsp;
                                          <Link
                                            to="#"
                                            onClick={()=>deleteDataApi()}
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="fas fa-trash-alt" />{" "}
                                            Delete
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
                      {/* /Dependent Tab */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar mt-5"></div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ marginTop: "75px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="modal-title">Add new data</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div>
              <form
                onSubmit={handleFormSubmit}
              // action="#"
              // encType="multipart/form-data"
              // autoComplete="off"
              // method="post"


              >
                <div className="modal-body">
                  <input type="hidden" defaultValue name="id" />
                  <input type="hidden" defaultValue="insert" name="method" />
                  <div className="form-group">
                    <label className="control-label mb-10">
                      {" "}
                      BMI <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="bmi"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.bmi}
                      defaultValue="23.7"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label mb-10">Heart rate </label>
                    <input
                      type="text"
                      name="hr"
                      className="form-control"
                      value={formData.hr}
                      onChange={handleInputChange}
                    // defaultValue={89}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label mb-10">Weight</label>
                    <input
                      type="text"
                      name="Weight"
                      onChange={handleInputChange}
                      value={formData.Weight}
                      className="form-control"
                      defaultValue={74}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label mb-10">Fbc</label>
                    <input
                      type="text"
                      name="Fbc"
                      onChange={handleInputChange}
                      value={formData.Fbc}
                      className="form-control"
                      defaultValue={140}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label mb-10">Created Date </label>
                    <input
                      type="date"
                      name="dob"
                      id="editdob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer text-center">

                  <button type="submit" className="btn btn-outline btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Footer {...props} />
    </div>
  );
};

export default MedicalDetails;
