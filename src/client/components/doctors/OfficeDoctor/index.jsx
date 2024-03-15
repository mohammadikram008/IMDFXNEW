import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {

  IMG02,
  IMG03,
  IMG04,
  IMG05,
  IMG06,
  IMG07,
  IMG08,
  IMG012,
} from "./img";
import IMG01 from "../../../assets/images/profileavatr.png";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import DoctorSidebar from "../sidebar/OfficeSidebar";
import Footer from "../../footer";
import StickyBox from "react-sticky-box";
import Header from "../../header";
import axios from "axios";

const MypPatient = (props) => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const Hos_Id = localStorage.getItem('token');
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/get-doctor-office/${Hos_Id}`);
      setAppointments(response.data);
      console.log("officedoctor", response.data)
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

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      render: (text, record) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record.image} />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Speciality",
      dataIndex: "specialization",
      sorter: (a, b) => a.specialization.length - b.specialization.length,
    },
    {
      title: "Experience",
      render: (record) => (
        <>
          <span className="user-name">{record.Date}</span>
          <br />
          <span>{record.yearofexperience}</span>
        </>
      ),
      sorter: (a, b) => a.length - b.length,
    },
    // {
    //   title: "Earned",
    //   dataIndex: "Earned",
    //   sorter: (a, b) => a.Earned.length - b.Earned.length,
    // },
    {
      title: "Account Status",
      dataIndex: "AccountStatus",
      render: (text, record) => {
        return (
          <div className="status-toggle">
            <input
              id={`rating${record?.id}`}
              className="check"
              type="checkbox"
            //  checked={false}
            />
            <label
              htmlFor={`rating${record?.id}`}
              className="checktoggle checkbox-bg"
            >
              checkbox
            </label>
          </div>
        );
      },
      sorter: (a, b) => a.AccountStatus.length - b.AccountStatus.length,
    },
  ];
  return (
    <div>
      <Header {...props} />
      <>
        {/* Breadcrumb */}
        {/* <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">My Patients</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index-2">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      My Patients
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div> */}
        {/* /Breadcrumb */}
      </>

      <div className="content">
        <div className="container">
          <div className="row mt-5">
            {/* <div className="col-md-2 col-lg-2 col-xl-2 theiaStickySidebar "></div> */}
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <DoctorSidebar />
              </StickyBox>
            </div>

            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: appointments.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        // onShowSizeChange: onShowSizeChange,
                        // itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={appointments}
                      rowKey={(record) => record.id}
                    //  onChange={this.handleTableChange}
                    />
                  </div>

                </div>
              </div>
            </div>
            {/* <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row row-grid">
                {
                  appointments.map((item, index) => (
                    <div className="col-md-6 col-lg-4 col-xl-3">
                      <div className="card widget-profile pat-widget-profile">
                        <div className="card-body mypatient-card">
                          <div className="pro-widget-content">
                            <div className="profile-info-widget">
                              <Link
                                to="/doctor/patient-profile"
                                className="booking-doc-img"
                              >
                                <img src={IMG01} alt="User" />
                              </Link>
                              <div className="profile-det-info">
                                <h3>
                               
                                  {
                                    item.name
                                  }
                                </h3>

                                <div className="patient-details">
                                  <h5>
                                    <b>Patient ID :</b> P0016
                                  </h5>
                                  <h5 className="mb-0">
                                    <i className="fas fa-map-marker-alt"></i>{" "}
                                    Alabama, USA
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="patient-info">
                            <ul>
                              <li>
                                Phone <span>+1 952 001 8563</span>
                              </li>
                              <li>
                                Age <span>38 Years, Male</span>
                              </li>
                              <li>
                                Blood Group <span>AB+</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default MypPatient;
