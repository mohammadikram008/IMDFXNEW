import React, { useState } from "react";
import axios from "axios";
import { uploadicon } from "../../imagepath";
import { FormCheck } from "react-bootstrap";
import boold from '../../../assets/images/icons/Blood.png'
import CTScan from '../../../assets/images/icons/Ctscan.png'
import MRI from '../../../assets/images/icons/mri.png'
const Tablerecords = () => {
  const userId = localStorage.getItem('token');
  const [formData, setFormData] = useState({
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

  const handleInputChange = (name, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        checked: checked
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
      // Prepare form data
      const allData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key].checked && formData[key].selectedFile) {
          allData.append(key, formData[key].selectedFile);
        }
      });

      console.log("formData",formData);
      // Send form data to the backend
      const response = await axios.post(`http://localhost:3005/api/medicalreport/${userId}`, allData);

      console.log(response.data);

      // Reset form data after successful submission
      setFormData((prevData) => ({
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

  return (
    <div className="row mt-5">
      {/* Blood Reports */}
      <div className="col-md-12 mt-5">
        <div className="card">
          <div className="card-body  card-inner-body ">
            <div className="blood-card-image-div">
              <img src={boold} alt="Upload icon" className="" />
            </div>
            <div className="blood-card-heading">
              <h5 className="card-title">Blood Reports</h5>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.BloodReport.checked}
                  onChange={(e) => handleInputChange("BloodReport", e.target.checked)}
                />
                <label className="form-check-label">Include Blood Reports</label>
              </div>
            </div>
            {formData.BloodReport.checked && (
              <input type="file" onChange={(e) => handleFileChange(e, "BloodReport")} />
            )}
          </div>
        </div>
      </div>

      {/* CT scan */}
      <div className="col-md-12">
        <div className="card">
          <div className="card-body card-inner-body">
            <div className="blood-card-image-div">
              <img src={CTScan} alt="Upload icon" />
            </div>
            <div className="blood-card-heading">
              <h5 className="card-title">CT scan</h5>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.STscan.checked}
                  onChange={(e) => handleInputChange("STscan", e.target.checked)}
                />
                <label className="form-check-label">Include CT scan</label>
              </div>
            </div>
            {formData.STscan.checked && (
              <input type="file" onChange={(e) => handleFileChange(e, "STscan")} />
            )}
          </div>
        </div>
      </div>

      {/* MRI */}
      <div className="col-md-12">
        <div className="card">
          <div className="card-body card-inner-body">
            <div className="blood-card-image-div">
              <img src={MRI} alt="Upload icon" />
            </div>
            <div className="blood-card-heading">
              <h5 className="card-title">MRI</h5>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.MRI.checked}
                  onChange={(e) => handleInputChange("MRI", e.target.checked)}
                />
                <label className="form-check-label">Include MRI</label>
              </div>
            </div>
            {formData.MRI.checked && (
              <input type="file" onChange={(e) => handleFileChange(e, "MRI")} />
            )}
          </div>
        </div>
      </div>
      <div className="col-md-12">
        
          <p>Your Reports will share automatically with doctor's at the time of appointments</p>
   
      
      </div>

      {/* Submit button */}
      <div className="col-md-12 mt-3">
        <button className="btn btn-primary mr-2" onClick={handleFormSubmit}>Save</button>
        {/* <button className="btn btn-secondary" onClick={() => setFormData({ ...formData })}>Clear</button> */}
      </div>
    </div>
  );
};

export default Tablerecords;
