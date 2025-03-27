import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import axios from "axios";
import "./signup.css";
import HeadingComp from "./HeadingComp";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ Initialize navigation
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${window.location.origin}/api/v1/signin`, Inputs);
        
        if (response.data.success) {
          sessionStorage.setItem("id", response.data.user._id);
          dispatch(authActions.login());

            // console.log("User ID:", response.data.user._id); 
            navigate("/todo"); // Redirect to To-Do page
        } else {
            console.log("Login failed:", response.data.message);
        }
    } catch (error) {
        console.error("Signin failed");
    }
};


  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="IN" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={Inputs.email}
                onChange={change}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={Inputs.password}
                onChange={change}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
