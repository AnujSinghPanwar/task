import React, { useState } from "react";
import Register from "./Register";
import Welcome from "./Home";
import "../Style/design.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inpVal, setInpVal] = useState({
    email: "",
    pass: "",
  });
  const [data, setData] = useState([]);

  // const useremail = localStorage.getItem("email")
  //   ? localStorage.getItem("email")
  //   : "task@gmail.com";
  // const password = localStorage.getItem("password")
  //   ? localStorage.getItem("password")
  //   : "12345678";

  const getData = (e) => {
    const { value, name } = e.target;
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, pass } = inpVal;

    const getUserDaata = localStorage.getItem("userData")
    console.log(getUserDaata);
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
      if (getUserDaata && getUserDaata.length) {
        const userDataa = JSON.parse(getUserDaata);
        const userLogin = userDataa.filter((ele, i) => {
          return ele.email === email && ele.pass === pass;
        });
        console.log(userLogin);
        if (userLogin.length === 0) {
          toast.error("email and password doesn't match");
        }
         else {
          toast.success("Welcome");
          navigate("/dashboard");
        }
      }
    }
  };

  return (
    <div className="main">
      <form>
        <h2 className="heading">Login</h2>

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
            onChange={getData}
            name="pass"
          />
          <br />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <Link className="link" to={"/register"}>
            I haven't Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
