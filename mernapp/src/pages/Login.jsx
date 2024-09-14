import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function Login() {
  // const [credentials, setCredentails] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/loginuser`, {
        email,
        password
      });
      if (response && response.status === 200) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("authToken", response.data.authToken);
        alert(response.data.message);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            Create account
          </Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
