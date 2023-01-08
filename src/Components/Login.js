import { Button } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
// import logo from '../Components/left-arrow.png';
import axios from "axios";
import { useDispatch } from "react-redux";
// import { ADD_USER } from "../redux/actionTypes";
import { addUser } from "../redux/reducer/userSlice";
import { headersProvider, setCookiesSession } from "../cookiesSession";
// import { headersProvider, setCookiesSession } from "../cookiesSession";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    errors: {},
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getValueForInput = (incoming) => {
    let value;
    if (incoming.target) {
      if (incoming.target.value !== undefined) {
        value = incoming.target.value;
      }
    } else {
      value = incoming;
    }
    return value;
  };
  const changeHandler = (name) => (inputValue) => {
    const value = getValueForInput(inputValue);
    setError(false);
    setInput((data) => ({
      ...data,
      [name]: value,
      errors: { ...input.errors, [name]: "" },
    }));
  };

  const existsAndLength = (value) => value?.length >= 3;

  const validateEmail = (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const validate = () => {
    const keys = {};
    setInput((data) => ({
      ...data,
      errors: {},
    }));

    if (!existsAndLength(input.email) || !validateEmail(input.email)) {
      keys.email = "Please enter correct email.";
    }
    if (input.password === "") {
      keys.password = "Please enter password";
    }

    if (Object.keys(keys).length) {
      setInput((data) => ({
        ...data,
        errors: keys,
      }));
      return false;
    }
    return true;
  };
    const saveHandler = async () => {
      if (validate()) {
        const resp = await axios.post("http://localhost:5000/tic-tac-toe/game/v1/user/login", {
          email: input.email,
          password: input.password,
        },{
          headers: headersProvider(),
          noTrailingSlash: true,
        }).catch((e) => {
          setError(true)
          console.error(e.message);
          alert('please enter correct email and password');
        });
        dispatch(addUser(resp.data.user));
        // console.log('response = ',resp)
        if (resp) {
          const userJwtToken = resp.data.accessToken
          console.log('token = ',userJwtToken)
          if (userJwtToken) {
            setCookiesSession('userDataToken', userJwtToken, 7);
          }
        }
        // if (resp) {
        //   const UserJwtToken = resp.data.accessToken
        //   // console.log('login user = ',resp.data.user)
        //   // dispatch(({
        //   //   type:ADD_USER,
        //   //   payload:resp.data.user
        //   // }))
        //   // console.log('token = ',UserJwtToken)
        //   if (UserJwtToken) {
        //     // setCookiesSession('userData', trueCounselJwtToken, 7);
        //   }
        // }

        if(resp.data.success){
          navigate("/start-game");
          setError(false)
        }
      }
    };

  return (
    <div className={`${styles.outerContainer}`}>
      <div
        className={`${styles.container} grid grid-cols-1 content-between px-4 py-4`}
      >
        <div>
        <div className="ml-2" onClick={()=>{navigate('/')}} style={{cursor:'pointer',fontSize:'14px'}}>
        ≪ back
      </div>
          <div className={`${styles.createTitle} mt-3`}>Login</div>
          <div className={`${styles.heading} mt-2`}>
            Please enter your details
          </div>
          <div className="flex flex-col mt-4 mx-2">
            <div className={`${styles.fieldTitle}`}>Email</div>
            <input
              className={`${styles.inputField}`}
              placeholder="Type your email here"
              value={input.email}
              type="email"
              onChange={changeHandler("email")}
            />
            <p style={{ color: "red",fontSize:"10px" }}>{input.errors.email}</p>
            <div className={`${styles.fieldTitle}`}>Password</div>
            <input
              className={`${styles.inputField}`}
              type="password"
              placeholder="Type your password here"
              value={input.password}
              onChange={changeHandler("password")}
            />
            <p style={{ color: "red", fontSize: "10px" }}>
              {input.errors.password}
            </p>
          </div>
        </div>


        <div className="mb-10 mt-38">
          {error && (
            <div
              className={`${styles.error}`}
              style={{ backgroundColor: "#EB5757" }}
            >
              Enter correct details.
            </div>
          )}
          <Button
            className={`${styles.btn} mt-2`}
            style={{ backgroundColor: "#F2C94C" }}
              onClick={saveHandler}
          >
            Login
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Login;
