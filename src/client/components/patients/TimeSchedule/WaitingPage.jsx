import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WaitingPage = () => {
    const { selectedDateTime } = useParams();
    console.log(selectedDateTime)
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    // function convertMinutesToDate(totalMinutes) {
    //     const currentDate = new Date();
    //     const targetDate = new Date(currentDate.getTime() + totalMinutes * 60000);

    //     const year = targetDate.getFullYear();
    //     const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    //     const day = targetDate.getDate().toString().padStart(2, '0');

    //     return `${year},${month},${day}`;
    // }

    useEffect(() => {
        // Update the countdown every second
        const interval = setInterval(() => {
            const now = new Date();
            // const formattedDate = convertMinutesToDate(timeDifference);
            // console.log(formattedDate)
            const diff = new Date(selectedDateTime) - now;
            // console.log(diff)
            // Calculate the days, hours, minutes, and seconds remaining
            const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
            // Update the state
            setDays(daysLeft);
            setHours(hoursLeft);
            setMinutes(minutesLeft);
            setSeconds(secondsLeft);
        }, 1000);
        // Clear the interval when the countdown is complete
        return () => clearInterval(interval);
    }, []);
    return (
        <section style={{
            height: "100vh",
            width: "100vw"
        }} className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center text-center align-items-center flex-column gap-3">
                <h2 className="fw-bold fs-5">Your Appointment will started after this Countdown</h2>
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <span style={{
                        fontSize: "5vw"
                    }} className="fw-bolder text-primary">{days}</span>
                    <span style={{
                        fontSize: "5vw"
                    }} className="fw-bolder text-primary">:</span>
                    <span style={{
                        fontSize: "5vw"
                    }} className="fw-bolder text-primary">{hours}</span>
                    <span style={{
                        fontSize: "5vw"
                    }} className="fw-bolder text-primary">{minutes}</span>
                    <span style={{
                        fontSize: "5vw"
                    }} className="fw-bolder text-primary">:</span>
                    <span style={{
                        fontSize: "5vw"
                    }} className="fw-bolder text-primary">{seconds}</span>
                </div>
                <div className="d-flex gap-2 justify-content-center align-items-center ">
                    <button className={`px-4 py-2 bg-white  text-black rounded-2 border text-uppercase `}>Back to Home</button>

                    <button className={`px-4 py-2 bg-primary  text-white rounded-2 border text-uppercase `}>Join Call</button>
                </div>
            </div>
        </section>
    );
};

export default WaitingPage;
