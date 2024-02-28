import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaymentForm } from "./PaymentForm";
import { useState, useEffect } from "react";
import React from "react";
import { generateAccessToken } from "./generateAccessToken";

const CreditCard = () => {
    const [clientToken, setClientToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const accessToken = await generateAccessToken()
            console.log(accessToken)
            setClientToken(JSON.stringify(accessToken))
        }
        getToken()
    }, []);
    return (
        <>
            {clientToken ? (
                <PayPalScriptProvider options={{
                    clientId:
                        "AduyjUJ0A7urUcWtGCTjanhRBSzOSn9_GKUzxWDnf51YaV1eZNA0ZAFhebIV_Eq-daemeI7dH05KjLWm",
                    components: "buttons,hosted-fields",
                    dataClientToken: clientToken,
                    intent: "capture",
                    vault: false
                }}>
                    <PaymentForm />
                </PayPalScriptProvider>
            ) : (
                <h4>WAITING ON CLIENT TOKEN</h4>
            )}
        </>
    );
};

export default CreditCard;
