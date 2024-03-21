import React ,{useEffect,useState}from "react";
import axios from "axios";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import SidebarNav from "../sidebar";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  patient1,
  patient10,
  patient11,
  patient12,
  patient13,
  patient14,
  patient15,
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

const Patients = () => {
  // const location = useLocation();
  // console.log("Ploc",location.state.key);
  // const Patient=location.state.key;
  const [Patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const fetchpatient = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/getpatient`);
      setPatient(response.data);
      
      console.log("setDoctor", response.data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching getDoctorDetail:', error);
      // setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchpatient();
   
  }, []);
  const data = [
    {
      id: 1,
      PatientID: "#PT001",
      PatientName: "Charlene Reed",
      Age: "29",
      Address: "4417 Goosetown Drive, Taylorsville, North Carolina, 28681",
      Phone: "8286329170",
      VisitLast: "20 Oct 2019",
      Paid: "$100.00",
      image: patient1,
    },
    {
      id: 2,
      PatientID: "#PT001",
      PatientName: "Travis Trimble",
      Age: "23",
      Address: "4026 Fantages Way, Brunswick, Maine, 04011 ",
      Phone: "2077299974",
      VisitLast: "22 Oct 2019",
      Paid: "$200.00",
      image: patient2,
    },
    {
      id: 3,
      PatientID: "#PT001",
      PatientName: "Carl Kelly",
      Age: "29",
      Address: "2037 Pearcy Avenue, Decatur, Indiana, 46733 ",
      Phone: "2607247769",
      VisitLast: "21 Oct 2019",
      Paid: "$250.00",
      image: patient3,
    },
    {
      id: 4,
      PatientID: "#PT001",
      PatientName: "Michelle Fairfax",
      Age: "25",
      Address: "2037 Pearcy Avenue, Decatur, Indiana, 46733 ",
      Phone: "5043686874",
      VisitLast: "21 Sep 2019",
      Paid: "$150.00",
      image: patient4,
    },
    {
      id: 5,
      PatientID: "#PT001",
      PatientName: "Gina Moore",
      Age: "23",
      Address: "888 Everette Alley, Hialeah, Florida, 33012 ",
      Phone: "9548207887",
      VisitLast: "18 Sep 2019",
      Paid: "$350.00",
      image: patient5,
    },
    {
      id: 6,
      PatientID: "#PT001",
      PatientName: "Elsie Gilley",
      Age: "16",
      Address: "644 Coffman Alley, Bowling Green, Kentucky, 42101 ",
      Phone: "3153844562",
      VisitLast: "18 Sep 2019",
      Paid: "$300.00",
      image: patient6,
    },
    {
      id: 7,
      PatientID: "#PT001",
      PatientName: "Joan Gardner",
      Age: "25",
      Address: "2399 Hillview Drive, San Francisco, California, 94103 ",
      Phone: "7072202603",
      VisitLast: "18 Sep 2019",
      Paid: "$250.00",
      image: patient7,
    },
    {
      id: 8,
      PatientID: "#PT001",
      PatientName: "Daniel Griffing",
      Age: "21",
      Address: "4914 Hilltop Haven Drive, Passaic, New Jersey, 07055 ",
      Phone: "9737739497",
      VisitLast: "7 Sep 2019",
      Paid: "$150.00",
      image: patient8,
    },
    {
      id: 9,
      PatientID: "#PT001",
      PatientName: "Walter Roberson",
      Age: "18",
      Address: "1299 Star Trek Drive, Panama City, Florida, 32405 ",
      Phone: "8503584445",
      VisitLast: "11 Sep 2019",
      Paid: "$100.00",
      image: patient9,
    },
    {
      id: 10,
      PatientID: "#PT001",
      PatientName: "Robert Rhodes",
      Age: "19",
      Address: "1214 Hamill Avenue, Del Mar, California, 92014 ",
      Phone: "8582595285",
      VisitLast: "12 Sep 2019",
      Paid: "$120.00",
      image: patient10,
    },
    {
      id: 11,
      PatientID: "#PT0011",
      PatientName: "Harry Williams",
      Age: "9",
      Address: "4566 Sampson Street, Denver, Colorado, 80202 ",
      Phone: "3036077075",
      VisitLast: "14 Sep 2019",
      Paid: "$130.00",
      image: patient11,
    },
    {
      id: 12,
      PatientID: "#PT0012",
      PatientName: "Robert Johnston",
      Age: "29",
      Address: "1996 Crummit Lane, Beatrice, Nebraska, 68310 ",
      Phone: "4022231492",
      VisitLast: "7 Nov 2019",
      Paid: "$160.00",
      image: patient12,
    },
    {
      id: 13,
      PatientID: "#PT0013",
      PatientName: "Tracy Mason",
      Age: "32",
      Address: "4211 Vesta Drive, TOLEDO, Washington, 98591 ",
      Phone: "7737265795",
      VisitLast: "9 Nov 2019",
      Paid: "$290.00",
      image: patient13,
    },
    {
      id: 14,
      PatientID: "#PT0014",
      PatientName: "Daniel Finch",
      Age: "23",
      Address: "186 Bryan Street, Greensboro, North Carolina, 27409 ",
      Phone: "3362314023",
      VisitLast: "5 Nov 2019",
      Paid: "$300.00",
      image: patient14,
    },
    {
      id: 15,
      PatientID: "#PT0015",
      PatientName: "Jessica Garza",
      Age: "10",
      Address: "4672 Rose Street, Schaumburg, Illinois, 60173 ",
      Phone: "7082788201",
      VisitLast: "6 Nov 2019",
      Paid: "$310.00",
      image: patient15,
    },
  ];
  const columns = [
    // {
    //   title: "Patient ID",
    //   dataIndex: "PatientID",
    //   sorter: (a, b) => a.PatientID.length - b.PatientID.length,
    // },
    {
      title: "Patient Name",
      dataIndex: "username",
      render: (text, record) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={patient10} />
          </Link>
          <Link to="/admin/profile" style={{
            color: "black"
          }}>{text}</Link>
            <span
          >{text}</span>
        </>
      ),
      sorter: (a, b) => a.PatientName.length - b.PatientName.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <>{text}</>,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "ID",
      dataIndex: "_id",
      sorter: (a, b) => a._id.length - b._id.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => {
        return (
          <div className="status-toggle">
            <input
              id={`rating${record?.id}`}
              className="check"
              type="checkbox"
              defaultChecked="false"
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
      sorter: (a, b) => a.Status.length - b.Status.length,
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
                <h3 className="page-title">List of Patient</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Patient</li>
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
                        total: Patient.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={Patient}
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

export default Patients;
