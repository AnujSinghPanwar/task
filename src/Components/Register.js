import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "./Login";

function Register() {
  const navigate = useNavigate();
  const [inpVal, setInpVal] = useState({
    email: "",
    pass: "",
  });
  const [data, setData] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target;
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();
    const { email, pass } = inpVal;

    if (email === "" && pass === "") {
      toast.error("Please fill the field");
    } else if (email === "") {
      toast.error("Email Field is Empty");
    } else if (!email.includes("@")) {
      toast.error("you must be enter valid email");
    } else if (pass === "") {
      toast.error("password fill is empty");
    } else if (pass.length < 8) {
      toast.error("password fill must be 8 character");
    } else {
      localStorage.setItem("userData",JSON.stringify([...data,inpVal]))
      toast.success("User Has Been Add")
      navigate("/")
    }
  };
  
  return (
    <div className="main">
      <form>
        <h2 className="heading">Register</h2>

        <div className="mainInput">
          <label>Email</label>
          <br />
          <input
            placeholder="Enter Your Email"
            type="text"
            onChange={getData}
            name="email"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            placeholder="Enter Your Password"
            type="password"
            name="pass"
            onChange={getData}
          />
          <br />
          <button type="submit" onClick={addData}>
            Signup
          </button>
          <Link className="link" to={"/"}>
            Already Login?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
