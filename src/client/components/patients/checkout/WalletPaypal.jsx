import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { generateAccessToken } from "./generateAccessToken";
import Modal from "./Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, setIsModalOpen, pricing, setSelectedAmount }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const history = useHistory()

    const userId = localStorage.getItem('token');
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
                        description: "hello oye ya kia hn",
                        soft_descriptor: "Hii Its",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: pricing,
                                },
                            },
                        ],
                    }),
                }
            );
            const response = await res.json();
            console.log("create",response);
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
            console.log("onApprove",response);
            const message = "Your Transection Add Successfull"
            // Make your API request using Axios

           const Amount=pricing;
            const resp = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/addpaymentwallet/${userId}`, {Amount});
            // const notify = await axios.post(`https://imdfx-newserver-production.up.railway.app/api/usertransectionnotification/${userId}`, { message });
            // console.log("walet topup",response);
            toast.success("Payment Add SuccessFully");

            setIsModalOpen(true)
            const timeoutId = setTimeout(() => {
                setIsModalOpen(false);
                setSelectedAmount(!pricing)
            }, 5000);

            // Clean up the timeout to avoid memory leaks
            return () => clearTimeout(timeoutId);
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
export default function WalletPaypal({ pricing, setSelectedAmount }) {
    const history = useHistory()
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div style={{
                maxWidth: "1000px",
                zIndex: "1"
            }} className="w-100 p-5 ">
                <PayPalScriptProvider
                    options={{
                        clientId: "test",
                        components: "buttons",
                        currency: "USD",
                        disableFunding: "",
                    }}
                >
                    <ButtonWrapper showSpinner={true} pricing={pricing} setIsModalOpen={setIsModalOpen} setSelectedAmount={setSelectedAmount} />
                </PayPalScriptProvider >
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="d-flex justify-content-center align-items-center gap-3 py-5 flex-column w-100">
                    <img src="/payment-success.png" alt="success" className="w-25 h-25 rounded-circle " />
                    <h2 style={{
                        color: "#005bff"
                    }} className="fs-5 fw-bold my-2">Payment Successful</h2>
                    <p className="my-2 text-center">Success! you will recieve <br /> confirmation email</p>
                    <button style={{
                        backgroundColor: "#005bff"
                    }} className="btn text-white  py-2 px-5 fw-medium " onClick={() => {
                        setIsModalOpen(false)
                        setSelectedAmount(!pricing)
                    }} type="text">Done</button>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
}