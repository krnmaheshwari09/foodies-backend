import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function Signup() {
    // const [credentials, setCredentails] = useState({name:"", email:"", password: "", location:""})
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const response = await axios.post(`${window.location.origin}/api/createuser`,{
            name,
            email,
            password,
            location
          })
          // console.log(response)
          // console.log("status")
          if(response && response.status === 200){
            alert(response.data.message)
            navigate("/login")
          }else{
            alert(response.data.message)
          }
        }catch(err){
          // console.log(err.response)
          alert("Something went wrong")
        }
    }
  return (
    <>
    <div>
      <Navbar/>
    </div>
      <div className="container mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="location">Address</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter address"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to='/login' className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
      <div>
      <Footer/>
    </div>
    </>
  );
}
