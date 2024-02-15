import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import Header from "../../header";
import Footer from "../../footer";
const Index = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        email: "",
        password: "",
        specialization: "",
        conditionstreated: "",
        aboutself: "",
        education: "",
        college: "",
        license: "",
        yearofexperience: "",
        once: [],
        daily: [],
        weekly: [],
    });
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const fieldName = name.split(".");
        if (fieldName.length === 3) {
            const [nestedField, subField, subSubField] = fieldName;
            setFormData({
                ...formData,
                [nestedField]: {
                    ...formData[nestedField],
                    [subField]: {
                        ...formData[nestedField][subField],
                        [subSubField]: value,
                    },
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const alldata = new FormData();

            alldata.append('image', selectedFile);

            if (formData.once) {
                formData.once.forEach((item, index) => {
                    Object.entries(item).forEach(([key, value]) => {
                        alldata.append(`once[${index}].${key}`, value);
                    });
                });
            }

            if (formData.daily) {
                formData.daily.forEach((item, index) => {
                    Object.entries(item).forEach(([key, value]) => {
                        alldata.append(`daily[${index}].${key}`, value);
                    });
                });
            }

            if (formData.weekly) {
                formData.weekly.forEach((item, index) => {
                    Object.entries(item).forEach(([key, value]) => {
                        alldata.append(`weekly[${index}].${key}`, value);
                    });
                });
            }

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'once' && key !== 'daily' && key !== 'weekly') {
                    if (typeof value === 'object') {
                        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                            alldata.append(`${key}.${nestedKey}`, nestedValue);
                        });
                    } else {
                        alldata.append(key, value);
                    }
                }
            });

            const response = await axios.post('http://localhost:3005/api/doctorpersnoldetails', alldata);

            if (response.status === 200) {
                console.log('response', response);
                toast.success('Registration successful!');
                // navigation("/Doctordashboard");
            } else {
                console.error('Registration failed');
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    //   const navigation = useNavigate();

    return (
        <>
            <Header />
            <div className="container  d-flex justify-content-center align-items-center  ">
                <div className="card-resgister p-5 " style={{ width: "30rem", marginTop: "10rem", border: "none" }}>
                    <h2 className="text-center text-dark font-weight-bold mb-4 ">Doctor Register Form</h2>
                    <form onSubmit={handleRegistration}>
                        <div className="mb-4">
                            <label htmlFor="image" className="form-label text-gray-600">
                                Upload Image
                            </label>
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="inputGroupFile">
                                    Choose file
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {selectedFile && <span className="text-gray-600">{selectedFile.name}</span>}
                        </div>
                        <div class="my-4 d-flex align-items-center">
                            <div class="border-top border-secondary flex-grow-1"></div>
                            <p class="mx-4 text-center font-weight-bold text-secondary">
                            Basic Information
                            </p>
                            <div class="border-top border-secondary flex-grow-1"></div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="specialization" className="form-label text-gray-600">
                                Specialization
                            </label>
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="conditionstreated" className="form-label text-gray-600">
                                Conditions Treated
                            </label>
                            <input
                                type="text"
                                id="conditionstreated"
                                name="conditionstreated"
                                value={formData.conditionstreated}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="aboutself" className="form-label text-gray-600">
                                About Self
                            </label>
                            <textarea
                                id="aboutself"
                                name="aboutself"
                                value={formData.aboutself}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div class="my-4 d-flex align-items-center">
                            <div class="border-top border-secondary flex-grow-1"></div>
                            <p class="mx-4 text-center font-weight-bold text-secondary">
                            Education
                            </p>
                            <div class="border-top border-secondary flex-grow-1"></div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="education" className="form-label text-gray-600">
                                Education
                            </label>
                            <input
                                type="text"
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="college" className="form-label text-gray-600">
                                College/School
                            </label>
                            <input
                                type="text"
                                id="college"
                                name="college"
                                value={formData.college}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="license" className="form-label text-gray-600">
                                License
                            </label>
                            <input
                                type="text"
                                id="license"
                                name="license"
                                value={formData.license}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="yearofexperience" className="form-label text-gray-600">
                                YearOfExperience
                            </label>
                            <input
                                type="text"
                                id="yearofexperience"
                                name="yearofexperience"
                                value={formData.yearofexperience}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        {/* Once */}
                        <div class="my-4 d-flex align-items-center">
                            <div class="border-top border-secondary flex-grow-1"></div>
                            <p class="mx-4 text-center font-weight-bold text-secondary">
                            Once
                            </p>
                            <div class="border-top border-secondary flex-grow-1"></div>
                        </div>
                        {/* <label htmlFor="date" className="block text-gray-800 text-sm font-bold mb-2 items-center justify-center">
                            Once
                        </label> */}

                        <div className="mb-4">
                            <label htmlFor="name" className="form-label text-gray-600">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="once.date"
                                value={formData.once.date}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="form-label text-gray-600">
                                Time From
                            </label>
                            <input
                                type="text"
                                id="timefrom"
                                name="once.timefrom"
                                value={formData.once.timefrom}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label text-gray-600">
                                Time Till
                            </label>
                            <input
                                type="text"
                                id="timetill"
                                name="once.timetill"
                                value={formData.once.timetill}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="consultationfees" className="block text-gray-600 text-sm font-medium mb-2">
                                Consultation Fees
                            </label>
                            <input
                                type="text"
                                id="consultationfees"
                                name="once.consultationfees"
                                value={formData.once.consultationfees}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div class="my-4 d-flex align-items-center">
                            <div class="border-top border-secondary flex-grow-1"></div>
                            <p class="mx-4 text-center font-weight-bold text-secondary">
                                Daily
                            </p>
                            <div class="border-top border-secondary flex-grow-1"></div>
                        </div>
                        {/* Daily */}
                        {/* <label htmlFor="date" className="block text-gray-800 text-sm font-bold mb-2 items-center justify-center">
                            Daily
                        </label> */}
                        <div className="mb-4">
                            <label htmlFor="datefrom" className="block text-gray-600 text-sm font-medium mb-2">
                                Date From
                            </label>
                            <input
                                type="date"
                                id="datefrom"
                                name="daily.datefrom"
                                value={formData.daily.datefrom}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="datetill" className="block text-gray-600 text-sm font-medium mb-2">
                                Date Till
                            </label>
                            <input
                                type="date"
                                id="datetill"
                                name="daily.datetill"
                                value={formData.daily.datetill}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="timefrom" className="block text-gray-600 text-sm font-medium mb-2">
                                Time From
                            </label>
                            <input
                                type="text"
                                id="timefrom"
                                name="daily.timefrom"
                                value={formData.daily.timefrom}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label text-gray-600">
                                Time Till
                            </label>
                            <input
                                type="text"
                                id="timetill"
                                name="daily.timetill"
                                value={formData.daily.timetill}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="consultationfees" className="block text-gray-600 text-sm font-medium mb-2">
                                Consultation Fees
                            </label>
                            <input
                                type="text"
                                id="consultationfees"
                                name="daily.consultationfees"
                                value={formData.daily.consultationfees}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        {/* Weekly */}
                        <div class="my-4 d-flex align-items-center">
                            <div class="border-top border-secondary flex-grow-1"></div>
                            <p class="mx-4 text-center font-weight-bold text-secondary">
                            Weekly
                            </p>
                            <div class="border-top border-secondary flex-grow-1"></div>
                        </div>
                        {/* <label htmlFor="day" className="block text-gray-800 text-sm font-bold mb-2 items-center justify-center">
                            Weekly
                        </label> */}
                        <div className="mb-4">
                            <label htmlFor="day" className="block text-gray-600 text-sm font-medium mb-2">
                                Day
                            </label>
                            <input
                                type="text"
                                id="day"
                                name="weekly.day"
                                value={formData.weekly.day}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="timefrom" className="block text-gray-600 text-sm font-medium mb-2">
                                Time From
                            </label>
                            <input
                                type="text"
                                id="timefrom"
                                name="weekly.timefrom"
                                value={formData.weekly.timefrom}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label text-gray-600">
                                Time Till
                            </label>
                            <input
                                type="text"
                                id="timetill"
                                name="weekly.timetill"
                                value={formData.weekly.timetill}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="consultationfees" className="block text-gray-600 text-sm font-medium mb-2">
                                Consultation Fees
                            </label>
                            <input
                                type="text"
                                id="consultationfees"
                                name="weekly.consultationfees"
                                value={formData.weekly.consultationfees}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <button className="login-btn-login w-100" type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <Footer  />
            <ToastContainer />
        </>
    );
};

export default Index;
