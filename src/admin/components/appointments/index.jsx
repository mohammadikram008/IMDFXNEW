import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import axios from "axios";
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
  patient1,
  patient10,
  patient2,
  patient3,
  patient4,
  patient5,
  patient6,
  patient7,
  patient8,
  patient9,
} from "../imagepath";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Appointments = () => {
  // const location = useLocation();
  // console.log("Aloc", location.state.key);
  // const Appointment = location.state.key;
  const [Appointmentswithdetail, setAppointmentsWithDetail] = useState([]);
  const fetchAppointmentswithalldetail = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/appointment-alldetails`);
      setAppointmentsWithDetail(response.data);
      console.log("setAppointmentsWithDetail", response.data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching getDoctorDetail:', error);
      // setLoading(false);
    }
  };
  useEffect(() => {

    fetchAppointmentswithalldetail();
  }, []);
  const data = [
    {
      id: 1,
      DoctorName: "Dr. Darren Elder",
      Speciality: "Dental ",
      PatientName: "Travis Trimble",
      Earned: "$5000.00 ",
      Date: "	5 Nov 2019",
      time: "11.00 AM - 11.35 AM",
      Amount: "$300.00",
      image: doctor_thumb_02,
      images1: patient2,
      Status: "checkbox",
    },
    {
      id: 2,
      DoctorName: "Dr. Deborah Angel",
      Speciality: "Cardiology ",
      PatientName: "Carl Kelly",
      Earned: "$3300.00 ",
      Date: "11 Nov 2019",
      time: "12.00 PM - 12.15 PM",
      Amount: "$150.00",
      image: doctor_thumb_03,
      images1: patient3,
      Status: "checkbox",
    },
    {
      id: 3,
      DoctorName: "Dr. John Gibbs",
      Speciality: "Dental ",
      PatientName: "Walter Roberson",
      Earned: "$4100.00",
      Date: "21 Nov 2019",
      time: "12.10 PM - 12.25 PM",
      Amount: "$300.00",
      image: doctor_thumb_09,
      images1: patient9,
      Status: "checkbox",
    },
    {
      id: 4,
      DoctorName: "Dr. Katharine Berthold",
      Speciality: "Orthopaedics ",
      PatientName: "Elsie Gilley",
      Earned: "$4000.00 ",
      Date: "16 Nov 2019",
      time: "1.00 PM - 1.15 PM",
      Amount: "$250.00",
      image: doctor_thumb_06,
      images1: patient6,
      Status: "checkbox",
    },
    {
      id: 5,
      DoctorName: "Dr. Linda Tobin",
      Speciality: "Neurology ",
      PatientName: "Joan Gardner",
      Earned: "$2000.00 ",
      Date: "18 Nov 2019",
      time: "1.10 PM - 1.25 PM",
      Amount: "$260.00",
      image: doctor_thumb_07,
      images1: patient7,
      Status: "checkbox",
    },
    {
      id: 6,
      DoctorName: "Dr. Marvin Campbell",
      Speciality: "Orthopaedics ",
      PatientName: "Gina Moore",
      Earned: "$3700.00 ",
      Date: "15 Nov 2019",
      time: "1.00 PM - 1.15 PM",
      Amount: "$200.00",
      image: doctor_thumb_05,
      images1: patient5,
      Status: "checkbox",
    },
    {
      id: 7,
      DoctorName: "Dr. Olga Barlow",
      Speciality: "Dental ",
      PatientName: "Robert Rhodes",
      Earned: "$3500.00 ",
      Date: "23 Nov 2019",
      time: "12.10 PM - 12.25 PM",
      Amount: "$300.00",
      image: doctor_thumb_10,
      images1: patient10,
      Status: "checkbox",
    },
    {
      id: 8,
      DoctorName: "Dr. Paul Richard",
      Speciality: "Dermatology ",
      PatientName: "Daniel Griffing",
      Earned: "$3000.00 ",
      Date: "18 Nov 2019",
      time: "11.10 AM - 11.25 AM",
      Amount: "$260.00",
      image: doctor_thumb_08,
      images1: patient8,
      Status: "checkbox",
    },
    {
      id: 9,
      DoctorName: "Dr. Ruby Perrin",
      Speciality: "Dental ",
      PatientName: "Charlene Reed",
      Earned: "$3100.00 ",
      Date: "9 Nov 2019",
      time: "11.00 AM - 11.15 AM",
      Amount: "$200.00",
      image: doctor_thumb_01,
      images1: patient1,
      Status: "checkbox",
    },
    {
      id: 10,
      DoctorName: "Dr. Sofia Brient",
      Speciality: "Urology ",
      PatientName: "Michelle Fairfax",
      Earned: "$3500.00 ",
      Date: "7 Nov 2019",
      time: "1.00 PM - 1.20 PM ",
      Amount: "$150.00",
      image: doctor_thumb_04,
      images1: patient4,
      Status: "checkbox",
    },
  ];
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctorDetail",
      render: (text, record) => (
        <>
          <div className="avatar mx-2">
            <img className="rounded-circle" src={doctor_thumb_05} />
          </div>
          {/* <Link to="/admin/profile" className="text-decoration-none">
            {text.name}
          </Link> */}
          <span to="/admin/profile" className="text-decoration-none">
            {text.name}
          </span>
        </>
      ),
      sorter: (a, b) => a.bookingDetail.doctorDetail.name.length - b.bookingDetail.doctorDetail.name.length,


    },
    {
      title: "Speciality",
      dataIndex: "doctorDetail",
      render: (text, record) => (
        <>

          {text.specialization}

        </>
      ),
      sorter: (a, b) => a.doctorDetail.specialization.length - b.doctorDetail.specialization.length,
    },


    {
      title: "Patient Name",
      dataIndex: "userDetail",
      render: (text, record) => (
        <>
          <div className="avatar mx-2" >
            <img className="rounded-circle" src={patient4} />
          </div>
          {/* <Link to="/admin/profile">{text.username}</Link> */}
          <span to="/admin/profile">{text.username}</span>
        </>
      ),
      sorter: (a, b) => a.userDetail.username.length - b.userDetail.username.length,
    },


    {
      title: "BookingDate",
      dataIndex: "bookingDetail",
      render: (text, record) => (
        <>


          {text.selectedDate}

        </>
      ),
      sorter: (a, b) => a.bookingDetail.selectedDate.length - b.bookingDetail.selectedDate.length,

    },
    {
      title: "Amount",
      dataIndex: "bookingDetail",
      render: (text, record) => (
        <>
          {text.Fees}

        </>
      ),
      sorter: (a, b) => a.bookingDetail.Fees.length - b.bookingDetail.Fees.length,
    },
    // {
    //   title: "Status",
    //   dataIndex: "Status",
    //   render: (text, record) => {
    //     return (
    //       <div className="status-toggle">
    //         <input
    //           id={`rating${record?.id}`}
    //           className="check"
    //           type="checkbox"
    //           defaultChecked="false"
    //         />
    //         <label
    //           htmlFor={`rating${record?.id}`}
    //           className="checktoggle checkbox-bg"
    //         >
    //           checkbox
    //         </label>
    //       </div>
    //     );
    //   },
    //   sorter: (a, b) => a.Status.length - b.Status.length,
    // },
    
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
                <h3 className="page-title">Appointments</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Appointments</li>
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
                        total: Appointmentswithdetail.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={Appointmentswithdetail}
                      rowKey={(record) => record.id}
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

export default Appointments;
