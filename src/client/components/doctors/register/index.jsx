// import React, { useState, useEffect } from "react";
// import { Link ,useHistory} from "react-router-dom";
// import Header from "../../header";
// import Footer from "../../footer";
// import axios from 'axios';

// const DoctorRegister = (props) => {
//   const history = useHistory();
//   const config = "/";
//   useEffect(() => {
//     document.getElementsByTagName("body")[0].className = "account-page";

//     return () => (document.getElementsByTagName("body")[0].className = "");
//   }, []);

//   const [formData, setFormData] = useState({

//     email: "",
//     password: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDoctorRegistration = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("https://imdfx-newserver-production.up.railway.app/api/doctorlogin", formData);

//       if (response.status === 200) {
//         // Registration successful, handle redirection or show a success message
//         const token = response.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("doctorlogin", "doctorlogin");
//         // console.log("Doctor registration successful");
//         history.push("/");
//       } else {
//         console.error("Doctor registration failed");
//       }
//     } catch (error) {
//       console.error("Error during doctor registration:", error);
//     }
//   };

//   return (
//     <>
//       <Header {...props} />
//       <div className="content top-space content-login-page">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-8 offset-md-2">
//               <div className="account-content">
//                 <div className="row align-items-center justify-content-center">
//                   <div className="col-md-12 col-lg-6 login-right">
//                     <div className="login-header heading-text-logins">
//                       <h3>Doctor Login</h3>
//                     </div>

//                     <form onSubmit={handleDoctorRegistration}>
//                       {/* <div className="form-group form-focus">
//                         <input
//                           type="text"
//                           className="form-control floating input-fld"
//                           placeholder="Username"
//                           name="username"
//                           value={formData.username}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         <label className="focus-label">Username</label>
//                       </div> */}
//                       <div className="form-group form-focus">
//                         <input
//                           type="email"
//                           className="form-control floating input-fld"
//                           placeholder="Email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         <label className="focus-label">Email</label>
//                       </div>
//                       <div className="form-group form-focus">
//                         <input
//                           type="password"
//                           className="form-control floating input-fld"
//                           placeholder="Password"
//                           name="password"
//                           value={formData.password}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         <label className="focus-label">Password</label>
//                       </div>
//                       <div className="text-end">
//                         <Link to="/registerdoctor" className="forgot-link">
//                           Register with us?
//                         </Link>
//                       </div>
//                       <button className="login-btn-login" type="submit">
//                         login
//                       </button>
//                       <div className="login-or">
//                         <span className="or-line"></span>
//                         <span className="span-or">or</span>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer {...props} />
//     </>
//   );
// };

// export default DoctorRegister;
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import Header from "../../header";
const DoctorRegister = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("individual");
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };
  const responseMessage = (response) => {
    console.log(response.credential);
    localStorage.setItem('token', response.credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // You can send the account type along with other data to the server
      // const response = await axios.post("https://imdfx-newserver-production.up.railway.app/api/doctorlogin", { email, password, accountType });
      const response = await axios.post("https://imdfx-newserver-production.up.railway.app/api/doctorlogin", { email, password, accountType });

      if (response.status === 200) {
        const token = response.data;
        toast.success("Login successful!");
        localStorage.setItem("token", token);
        localStorage.setItem("doctorlogin", "doctorlogin");
        history.push("/");
      } else if (response.status === 201) { 
        const token = response.data;
        toast.success("Login successful!");
        localStorage.setItem("token", token);
        localStorage.setItem("officelogin", "officelogin");
        history.push("/office/office-dashboard");
      }else{
        console.error("Doctor login failed");
        toast.error("Login failed. Please try again.");

      }
    } catch (error) {
      console.error("Error during doctor login:", error);
      toast.error("Login failed. Please try again.");
    }
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("https://imdfx-newserver-production.up.railway.app/api/doctorlogin", { email, password });

  //     if (response.status === 200) {
  //       // Registration successful, handle redirection or show a success message
  //       const token = response.data;
  //       toast.success("Login successful!");
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("doctorlogin", "doctorlogin");
  //       // console.log("Doctor registration successful");
  //       history.push("/");
  //     } else {
  //       console.error("Doctor registration failed");
  //       toast.error("Login failed. Please try again.");

  //     }
  //   } catch (error) {
  //     console.error("Error during doctor registration:", error);
  //     toast.error("Login failed. Please try again.");

  //   }
  // };
  return (
    <>
      <Header {...props} />

      <>
        {/* Page Content */}
        <div
          style={{
            height: "100vh",
            // zIndex:"-10"
          }}
          className="content content-login-page fixed-top top-space  ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2  ">
                {/* Login Tab Content */}
                <div className="account-content ">
                  <div className="row align-items-center justify-content-center">
                    <div style={{
                      padding: "60px 80px",
                      borderRadius: "40px",
                      height: "60vh"
                    }} className="col-md-12 col-lg-6 login-right with-shadow">
                      <div className="login-header flex-column gap-2   justify-content-center align-items-start heading-text-logins">
                        <span className="fs-5 fw-medium ">Welcome Back Doctor</span>
                        <h3 className="fs-2 fw-bold ">
                          Login <span>IMDFX</span>
                        </h3>
                      </div>
                      <form onSubmit={handleLogin}>
                      <div className="my-2">
                          <label className="focus-label">Account Type</label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input mx-2"
                              type="radio"
                              name="accountType"
                              id="individual"
                              value="individual"
                              checked={accountType === "individual"}
                              onChange={() => handleAccountTypeChange("individual")}
                            />
                            <label className="form-check-label mx-2" htmlFor="individual">
                              Individual
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="accountType"
                              id="office"
                              value="office"
                              checked={accountType === "office"}
                              onChange={() => handleAccountTypeChange("office")}
                            />
                            <label className="form-check-label" htmlFor="office">
                              Join as Office
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-2 my-1 ">
                          <label className="focus-label">Email</label>
                          <input
                            type="email"
                            style={{
                              outline: "none"
                            }}
                            className="border-bottom border-0  border-secondary  w-100 py-3 px-2 "
                            value={email}
                            onChange={handleEmailChange}
                          />
                        </div>
                        <div className="d-flex flex-column position-relative  gap-2 my-1 ">
                          <label className="focus-label">Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            style={{
                              outline: "none"
                            }}
                            className="border-bottom border-0  border-secondary  w-100 py-3 px-2 "
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <span
                            style={{
                              bottom: "10px",
                              right: "5px"
                            }}
                            className="field-icon position-absolute toggle-password"
                            onClick={handleTogglePassword}
                          >
                            {showPassword ? <IoEye /> : <IoIosEyeOff />}
                          </span>
                        </div>
                        
                        <div className="text-end my-1">
                          <Link
                            className="forgot-link text-black "
                            to="/pages/forgot-password"
                          >
                            Forgot Password ?
                          </Link>
                        </div>

                        <div className="d-flex justify-content-center my-1  align-items-center ">
                          <button
                            style={{
                              borderRadius: "10px"
                            }}
                            className="login-btn-login w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div className="login-or">
                          <span className="span-or text-black ">or</span>
                        </div>


                        <div className="text-center dont-have">
                          Don’t have an account?{" "}
                          <Link to="/register">Register</Link>
                        </div>

                      </form>
                    </div>
                    <div style={{
                      padding: "80px",
                      borderRadius: "40px"
                    }} className="col-md-12 col-lg-6 bg-transparent  border-0 login-right with-shadow">
                      <TypeAnimation
                        sequence={[
                          // Same substring at the start will only be typed out once, initially
                          'Find the best Doctors',
                          1000, // wait 1s before replacing "Mice" with "Hamsters"
                          'Find the best Cardiology',
                          1000,
                          'Find the best Dentist',
                          1000,
                          'Find the best Neurologist',
                          1000
                        ]}
                        wrapper="span"
                        speed={10}
                        style={{ fontSize: '5em', display: 'inline-block', color: "white" }}
                        repeat={Infinity}
                      />
                    </div>
                  </div>
                </div>
                {/* /Login Tab Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>

      <ToastContainer />
    </>
  );
};

export default DoctorRegister;
