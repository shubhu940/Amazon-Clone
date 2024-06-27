import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { UseAuth } from "../store/auth";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = UseAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { email, password });
    axios
      .post("http://localhost:3000/api/auth/login", { email, password })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        storeTokenInLS(token);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have been successfully logged in!",
        });
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Incorrect email or password",
        });
      });
  };

  return (
    <div className=" container-fluid RegisterLoginSection vh-100 d-flex justify-content-center align-items-center ">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 ">
        <div className="card p-4 RegisterLoginSection ">
          <h2 className="text-center">Welcome Back!</h2>
          <p className="text-center">Please enter your login details below.</p>
          <form onSubmit={handleLogin}>
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
            <div className="d-flex justify-content-between mb-3">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgotpassword">Forgot Password ?</Link>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
