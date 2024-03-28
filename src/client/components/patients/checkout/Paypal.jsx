import React, { Fragment, useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import GooglePayButton from '@google-pay/button-react';

import "react-toastify/dist/ReactToastify.css";

import { generateAccessToken } from "./generateAccessToken";
import Modal from "./Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// This value is from the props in the UI
const style = { layout: "vertical" };
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, setIsModalOpen, formdata }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const history = useHistory()
    // console.log("MdF",modelform);
    console.log("MdF", formdata);

    const userId = localStorage.getItem('token');
    const handleFormData = async (formdata) => {
        try {
            console.log("handledata",formdata);
            const Amount=formdata.Fees;
            const doc_id=formdata.doc_id
            const message = "Your Transaction is Successfull.Wait for confirmation"
            // Make your API request using Axios
            const response = await axios.post('https://imdfx-newserver-production.up.railway.app/api/bookappointment', formdata);
            const resp = await axios.post(`http://localhost:3005/api/addpaymentwallet/${userId}/${doc_id}`,{Amount});
            const notify = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/usertransectionnotification/${userId}`, { message });
            
         
            // Add any further logic here based on the API response
            toast.success("Payment Add SuccessFully");
            console.log('API response:', resp.data);
            history.push({
                pathname: '/patient/invoice-view',
                state: { id: formdata.doc_id }
            });
            // history.push('/patient/invoice-view')
            // history.push(`/patient/booking-success`)

        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error('Error making API request:', error);
        }
    }
    async function createOrder() {
        try {
            const accessToken = await generateAccessToken();
            // replace this url with your server
            const res = await fetch(
                "https://api-m.sandbox.paypal.com/v2/checkout/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                        intent: "CAPTURE",
                        description: "complete Transaction",
                        soft_descriptor: "done",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value:`${formdata.Fees}`,
                                },
                            },
                        ],
                    }),
                }
            );
            const response = await res.json();
            return response.id;
        } catch (error) {
            console.log(error);
        }
    }
    async function onApprove(data) {
        // replace this url with your server
        try {
            const accessToken = await generateAccessToken();
            const res = await fetch(
                `https://api-m.sandbox.paypal.com/v2/checkout/orders/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const response = await res.json();
            // const amount=response.purchase_units.map((item)=>item.payments.map((newitem)=>newitem.captures))
            // console.log("account Responce",amount);
            console.log("Onapproved", formdata);
            handleFormData(formdata);
            setIsModalOpen(true);
            // const timeoutId = setTimeout(() => {
            //     setIsModalOpen(false);
            //     history.push('/patient/dashboard')
            // }, 10000);

            // Clean up the timeout to avoid memory leaks
            // return () => clearTimeout(timeoutId);
        } catch (error) {
            console.log(error);
        }
        ;
    }
    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={undefined}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
};
export default function Paypal({ modelform }) {
    const history = useHistory()
    // const formdata = modelform
    const bookingDate = new Date();
    console.log("paypal props", modelform);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>

            <div style={{
                maxWidth: "1000px",
                zIndex: "1"
            }} className="w-100 p-5 ">
                <div>
                    <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                    },
                                },
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: '100.00',
                                currencyCode: 'USD',
                                countryCode: 'US',
                            },
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('load payment data', paymentRequest);
                        }}
                    />
                </div>
                <PayPalScriptProvider
                    options={{
                        clientId: "test",
                        components: "buttons",
                        currency: "USD",
                        disableFunding: "",
                    }}
                >
                    <ButtonWrapper showSpinner={true} setIsModalOpen={setIsModalOpen} formdata={modelform} />
                </PayPalScriptProvider >

            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="d-flex justify-content-center align-items-center gap-3 py-5 flex-column w-100">
                    <img src="/payment-success.png" alt="success" className="w-25 h-25 rounded-circle " />
                    <h2 className="fs-5 fw-bold text-success my-2">Payment Successful</h2>
                    <p className="my-2 text-center">Success! you will recieve <br /> confirmation email</p>
                    <button className="btn btn-primary py-2 px-5 fw-medium " onClick={() => {
                        setIsModalOpen(false)
                        history.push({
                            pathname: '/patient/invoice-view',
                            state: { id: modelform.doc_id }
                        });
                    }} type="text">Done</button>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
}