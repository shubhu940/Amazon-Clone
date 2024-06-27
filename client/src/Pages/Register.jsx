import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMobileAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { UseAuth } from "../store/auth";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = UseAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { name, email, mobile, password });
    axios
      .post("http://localhost:3000/api/auth/register", { name, email, mobile, password })
      .then((response) => {
         // const token = response.data.token;
        // storeTokenInLS(token);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have been successfully registered! Please login",
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid RegisterLoginSection vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card p-4 RegisterLoginSection">
          <h2 className="text-center">Create an account</h2>
          <p className="text-center">Please enter your details below to create an account.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <input
                placeholder="Name"
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FontAwesomeIcon icon={faUser} className="icons ms-2" />
            </div>
            <div className="mb-3 input-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FontAwesomeIcon icon={faEnvelope} className="icons ms-2" />
            </div>
            <div className="mb-3 input-group">
              <input
                placeholder="Mobile"
                type="text"
                className="form-control"
                pattern="[6-9][0-9]{9}"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faMobileAlt} className="icons ms-2" />
            </div>
            <div className="input-group mb-3">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                className="icons ms-2"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="forgotpass d-flex justify-content-between mb-3">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 loginbtn">
              Register
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
