import React,{ useState, useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "./paginationfunction";
import { Link } from "react-router-dom";
import axios from "axios";
const Transaction = () => {
    const [payment, setPayments] = useState([]);
    const doc_id = localStorage.getItem('token');
    const fetchpaymet = async () => {
        try {
          const response = await axios.get(`http://localhost:3005/api/doctorTransactions/${doc_id}`);
          setPayments(response.data);
          console.log("doctorpayments:",response.data);
     
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      useEffect(() => {
        fetchpaymet();
      }, []);

      const columns = [
        {
            title: "Transaction Id",
            dataIndex: "_id",
            render: (text) => (
                <>
                    {/* <Link
                        to="#"
                        className="text-decoration-none text-primary"
                    > */}
                        {text.length > 5 ? text.substring(0, 5) + "..." : text}
                    {/* </Link> */}
                </>
            ),
        },

        {
            title: "Total Amount",
            dataIndex: "Amount",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => (
                <span>
                    {" "}
                    <span className="text-success ">Complete</span>
                </span>
            ),
        },
    ];


    const data = [
        {
            id: 1,
            transactionId: "#IN0001",
            TotalAmount: "$100.00",
            status: "complete",
            CreatedDate: "09 Sep 2019",
            CreateDate: "320,800",
        },
        {
            id: 2,
            transactionId: "#IN0002",
            TotalAmount: "$200.00",
            status: "complete",
            CreatedDate: "12 Jan 2019",
            CreateDate: "206,850",
        },
        {
            id: 3,
            transactionId: "#IN0003",
            TotalAmount: "$250.00",
            status: "complete",
            CreatedDate: "29 Mar 2019",
            CreateDate: "850,000",
        },
        {
            id: 4,
            transactionId: "#IN0004",
            TotalAmount: "$150.00",
            status: "complete",
            CreatedDate: "25 Aor 2011",
            CreateDate: "163,000",
        },
        {
            id: 5,
            transactionId: "#IN0005",
            TotalAmount: "$350.00",
            status: "complete",
            CreatedDate: "28 Nov 2008",
            CreateDate: "170,750",
        },
    ];


    // const columns = [
    //     {
    //         title: "Transaction Id",
    //         dataIndex: "transactionId",
    //         render: (text) => (
    //             <>
    //                 <Link
    //                     to="#"
    //                     className="text-decoration-none text-primary"
    //                 >
    //                     {text.length > 5 ? text.substring(0, 5) + "..." : text}
    //                 </Link>
    //             </>
    //         ),
    //     },

    //     {
    //         title: "Total Amount",
    //         dataIndex: "TotalAmount",
    //     },
    //     {
    //         title: "Status",
    //         dataIndex: "status",
    //         render: (text) => (
    //             <span>
    //                 {" "}
    //                 <span className="btn-success ">{text}</span>
    //             </span>
    //         ),
    //     },
    // ];

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Transactions</h3>

                                </div>
                            </div>
                            <div className="table-responsive">
                                {data?.length > 0 ? <Table

                                    style={{ overflowX: "auto" }}
                                    columns={columns}
                                    dataSource={payment}
                                /> : <h5 className="breadcrumb-item active w-100 text-center my-3">No Transactions</h5>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transaction;