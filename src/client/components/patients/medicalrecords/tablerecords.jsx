import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { uploadicon } from "../../imagepath";
import { FormCheck } from "react-bootstrap";
const Tablerecords = () => {
  const [show, setShow] = useState(false);

  const userId = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: userId,
    BloodReport: {
      selectedFile: null,
      checked: false
    },
    STscan: {
      selectedFile: null,
      checked: false
    },
    MRI: {
      selectedFile: null,
      checked: false
    }
  });

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        checked: type === "checkbox" ? checked : prevData[name].checked
      }
    }));
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        selectedFile: file
      }
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const allData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key].checked && formData[key].selectedFile) {
          allData.append(key, formData[key].selectedFile);
        }
      });

      allData.append("userId", userId);

      const response = await axios.post("http://localhost:3005/api/medicalreport", allData);

      console.log(response.data);

      setFormData((prevData) => ({
        ...prevData,
        BloodReport: {
          ...prevData.BloodReport,
          selectedFile: null,
          checked: false
        },
        STscan: {
          ...prevData.STscan,
          selectedFile: null,
          checked: false
        },
        MRI: {
          ...prevData.MRI,
          selectedFile: null,
          checked: false
        }
      }));
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleFormClear = () => {
    setFormData({
      userId: userId,
      BloodReport: {
        selectedFile: null,
        checked: false
      },
      STscan: {
        selectedFile: null,
        checked: false
      },
      MRI: {
        selectedFile: null,
        checked: false
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body pt-0">
              <nav className="user-tabs mb-4">
                <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                  <li className="nav-item">
                    <p>Medical Report</p>
                  </li>
                </ul>
              </nav>
              <div className="tab-content pt-0">
                <div className="card card-table mb-0">
                  <div className="card-body">
                    <div className="card card-table">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover table-center border ">
                            <thead>
                              <tr>
                                <th style={{ minWidth: "200px" }}>Name</th>
                                <th style={{ minWidth: "200px" }}>File</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: "1px solid black" }}>
                                <td style={{ borderRight: "1px solid #ccc" }}>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label" style={{ fontSize: "14px", fontWeight: "bold" }} >
                                   
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="BloodReport"
                                        checked={formData.BloodReport.checked}
                                        onChange={handleInputChange}
                                      />
                                      BloodReport
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  {formData.BloodReport.checked && (
                                    <input
                                      type="file"
                                      className="form-control"
                                      onChange={(e) => handleFileChange(e, "BloodReport")}
                                    />
                                  )}
                                </td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid black" }}>
                                <td style={{ borderRight: "1px solid #ccc" }}>
                                  <div className="form-check form-check-inline" >
                                    <label className="form-check-label" style={{ fontSize: "14px", fontWeight: "bold" }}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="STscan"
                                        checked={formData.STscan.checked}
                                        onChange={handleInputChange}
                                      />{" "}
                                      STscan
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  {formData.STscan.checked && (
                                    <input
                                      type="file"
                                      className="form-control"
                                      onChange={(e) => handleFileChange(e, "STscan")}
                                    />
                                  )}
                                </td>
                              </tr>
                              <tr >
                                <td style={{ borderRight: "1px solid #ccc" }}> 
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label" style={{ fontSize: "14px", fontWeight: "bold" }}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="MRI"
                                        checked={formData.MRI.checked}
                                        onChange={handleInputChange}
                                      />{" "}
                                      MRI
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  {formData.MRI.checked && (
                                    <input
                                      type="file"
                                      className="form-control"
                                      onChange={(e) => handleFileChange(e, "MRI")}
                                    />
                                  )}
                                </td>
                              </tr>


                            </tbody>
                          </table>

                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="submit-section">
                          <button
                            className="btn btn-primary submit-btn"
                            onClick={handleFormSubmit}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary submit-btn"
                            onClick={handleFormClear}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Tablerecords;
