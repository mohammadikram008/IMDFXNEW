import React, { useEffect, useState } from "react";
import axios from "axios";
import loginBanner from "../../assets/images/login-banner.png";
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { ToastContainer, toast } from "react-toastify";
const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const config = "/";

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => document.body.classList.remove("account-page");
  }, []);

  const handleEmailChange = (e) => {
    console.log("hclick");
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
console.log("Sclick",email);
    // Perform validation on the email if needed

    // Assuming you have an API endpoint for password reset
    const apiUrl = "your_password_reset_api_endpoint";

    try {
      const response = await axios.post("http://localhost:3005/api/reset-user-password", { email });

      // Axios automatically parses the response JSON
      if (response.status === 200) {
        // Handle success, e.g., show a success message to the user
        toast.success("Password reset link sent successfully!");
        console.log("Password reset link sent successfully!");
      } else {
        // Handle error, e.g., show an error message to the user
        toast.error("Failed to send password reset link");
        console.error("Failed to send password reset link");
      }
    } catch (error) {
      // Handle Axios errors, e.g., network error
      console.error("Error sending password reset link:", error.message);
    }
  };

  return (
    <>
      <Header {...props} />
      <>
        {/* Page Content */}
        <div className="content top-space">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Account Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src={loginBanner}
                        className="img-fluid"
                        alt="Login Banner"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>Forgot Password?</h3>
                        <p className="small text-muted">
                          Enter your email to get a password reset link
                        </p>
                      </div>
                      {/* Forgot Password Form */}
                      <form onSubmit={handleResetPassword}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating"
                            value={email}
                            onChange={handleEmailChange}
                            required
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        <div className="text-end">
                          <Link className="forgot-link" to="/login">
                            Remember your password?
                          </Link>
                        </div>
                        <button
                          className="btn btn-primary w-100 btn-lg login-btn"
                          type="submit"
                        >
                          Reset Password
                        </button>
                      </form>
                      {/* /Forgot Password Form */}
                    </div>
                  </div>
                </div>
                {/* /Account Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>

      <Footer {...props} />
    </>
  );
};

export default ForgotPassword;
