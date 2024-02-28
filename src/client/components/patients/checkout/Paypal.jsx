import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { generateAccessToken } from "./generateAccessToken";
import Modal from "./Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// This value is from the props in the UI
const style = { layout: "vertical" };
// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, setIsModalOpen }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const history = useHistory()

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
                                    value: 100.00,
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
            console.log(response);
            setIsModalOpen(true)
            const timeoutId = setTimeout(() => {
                setIsModalOpen(false);
                history.push('/patient/dashboard')
            }, 10000);

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
export default function Paypal() {
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
                    <ButtonWrapper showSpinner={true} setIsModalOpen={setIsModalOpen} />
                </PayPalScriptProvider >
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="d-flex justify-content-center align-items-center gap-3 py-5 flex-column w-100">
                    <img src="/payment-success.png" alt="success" className="w-25 h-25 rounded-circle " />
                    <h2 className="fs-5 fw-bold text-success my-2">Payment Successful</h2>
                    <p className="my-2 text-center">Success! you will recieve <br /> confirmation email</p>
                    <button className="btn btn-primary py-2 px-5 fw-medium " onClick={() => {
                        setIsModalOpen(false)
                        history.push('/patient/dashboard')
                    }} type="text">Done</button>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
}