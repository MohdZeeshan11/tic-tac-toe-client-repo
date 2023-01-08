import { Button } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    errors: {},
  });

  const [isSuccess,setIsSuccess] = useState(false)

  // console.log(input.password)
  const navigate = useNavigate();

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
    setIsSuccess(false)
    const value = getValueForInput(inputValue);
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
    if (!existsAndLength(input.name)) {
      keys.name = "Please enter 3 or more characters.";
    }
    if (!existsAndLength(input.userName)) {
      keys.userName = "Please enter 3 or more characters.";
    }
    if (!existsAndLength(input.password)) {
      keys.password = "Please enter 3 or more characters.";
    }
    if (!existsAndLength(input.email) || !validateEmail(input.email)) {
      keys.email = "Please enter correct email.";
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
    // console.log("button clicked");
    if (validate()) {
      const resp = await axios.post("https://server-tic-tac-toe.onrender.com/tic-tac-toe/game/v1/user/register", {
          name: input.name,
          email: input.email,
          userName: input.userName,
          password: input.password,
        })
        .catch((e) => {
          setIsSuccess(false)
          console.error(e);
        });

        if(resp.data.success){
          // navigate("/");
          alert("User registered successfully");
          setIsSuccess(true)
        }else{
          alert(resp.data.error)
        }
    }
  };

  return (
    <div className={`${styles.outerContainer}`}>
      <div className={`${styles.container} grid grid-cols-1 content-between px-4 py-4`}>
        <div className="flex flex-col">
          <div
            className="ml-2 -mt-3"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer",fontSize:'14px' }}
          >
            ≪ back
          </div>
          <div className={`${styles.createTitle} mt-2`}>Create account</div>
          <div className={`${styles.heading} mt-1`}>
            Let’s get to know you better!
          </div>
          <div className="flex flex-col mx-2">
            <div className={`${styles.fieldTitle}`}>Name</div>
            <input
              className={`${styles.inputField}`}
              placeholder="Type your name here"
              value={input.name}
              type="text"
              onChange={changeHandler("name")}
            />
            <p style={{ color: "red",fontSize:"10px" }}>{input.errors.name}</p>
            <div className={`${styles.fieldTitle}`}>Username</div>
            <input
              className={`${styles.inputField}`}
              placeholder="Type your username here"
              value={input.userName}
              type="text"
              onChange={changeHandler("userName")}
            />
            <p style={{ color: "red",fontSize:"10px" }}>{input.errors.userName}</p>
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
            <p style={{ color: "red",fontSize:"10px" }}>{input.errors.password}</p>
          </div>
        </div>
        <div className="flex flex-col mt-3 mb-3">
        { isSuccess && (
        <div 
          className={`${styles.successMsg}`}
          style={{ backgroundColor: "#6FCF97" }}
        >
          Congratulations!!! Account created.
        </div>
         )}
          <Button
            className={`${styles.btn} mt-2`}
            style={isSuccess === true?{backgroundColor:""}:{ backgroundColor: "#F2C94C" }}
            onClick={saveHandler}
            disabled={isSuccess===true?true:false}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
