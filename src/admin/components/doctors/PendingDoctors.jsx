import React ,{useEffect,useState}from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import SidebarNav from "../sidebar";

import {
  doctor_thumb_01,
  doctor_thumb_02,
  doctor_thumb_03,
  doctor_thumb_04,
  doctor_thumb_05,
  doctor_thumb_06,
  doctor_thumb_07,
  doctor_thumb_08,
  doctor_thumb_09,
  doctor_thumb_10,
} from "../imagepath";
import { Link } from "react-router-dom";
import axios from "axios";

const PendingDoctors = () => {
  const location = useLocation();
  // console.log("Dloc",location.state.key);
//   const doctor= location ?location.state.key:'';
  const [doctor, setDoctor] = useState([]);
  const fetchdoctor = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/pendingdoctordetail`);
      setDoctor(response.data);
      // console.log("setDoctor", response.data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching getDoctorDetail:', error);
      // setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchdoctor();
   
  }, []);
  const data = [
    {
      id: 1,
      DoctorName: "Dr. Darren Elder",
      Speciality: "Dental ",
      Earned: "$5000.00 ",
      Date: "11 Jun 2019",
      time: "4.50 AM",
      image: doctor_thumb_02,
      AccountStatus: "checkbox",
    },
    {
      id: 2,
      DoctorName: "Dr. Deborah Angel",
      Speciality: "Cardiology ",
      Earned: "$3300.00 ",
      Date: "4 Jan 2018",
      time: "9.40 AM",
      image: doctor_thumb_03,
      AccountStatus: "checkbox",
    },
    {
      id: 3,
      DoctorName: "Dr. John Gibbs",
      Speciality: "Dental ",
      Earned: "$4100.00",
      Date: "21 Apr 2018",
      time: "02.59 PM",
      image: doctor_thumb_09,
      AccountStatus: "checkbox",
    },
    {
      id: 4,
      DoctorName: "Dr. Katharine Berthold",
      Speciality: "Orthopaedics ",
      Earned: "$4000.00 ",
      Date: "23 Mar 2019",
      time: "02.50 PM",
      image: doctor_thumb_06,
      AccountStatus: "checkbox",
    },
    {
      id: 5,
      DoctorName: "Dr. Linda Tobin",
      Speciality: "Neurology ",
      Earned: "$2000.00 ",
      Date: "14 Dec 2018",
      time: "01.59 AM",
      image: doctor_thumb_07,
      AccountStatus: "checkbox",
    },
    {
      id: 6,
      DoctorName: "Dr. Marvin Campbell",
      Speciality: "Orthopaedics ",
      Earned: "$3700.00 ",
      Date: "24 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_05,
      AccountStatus: "checkbox",
    },
    {
      id: 7,
      DoctorName: "Dr. Olga Barlow",
      Speciality: "Dental ",
      Earned: "$3500.00 ",
      Date: "15 Feb 2018",
      time: "03.59 AM",
      image: doctor_thumb_10,
      AccountStatus: "checkbox",
    },
    {
      id: 8,
      DoctorName: "Dr. Paul Richard",
      Speciality: "Dermatology ",
      Earned: "$3000.00 ",
      Date: "11 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_08,
      AccountStatus: "checkbox",
    },
    {
      id: 9,
      DoctorName: "Dr. Ruby Perrin",
      Speciality: "Dental ",
      Earned: "$3100.00 ",
      Date: "14 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_01,
      AccountStatus: "checkbox",
    },
    {
      id: 10,
      DoctorName: "Dr. Sofia Brient",
      Speciality: "Urology ",
      Earned: "$3500.00 ",
      Date: "5 Jul 2019",
      time: "12.59 AM",
      image: doctor_thumb_04,
      AccountStatus: "checkbox",
    },
  ];
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
      title: "Approved Acounts",
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
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">List of Doctors</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Doctors</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: doctor.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={doctor}
                      rowKey={(record) => record.id}
                      //  onChange={this.handleTableChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingDoctors;
