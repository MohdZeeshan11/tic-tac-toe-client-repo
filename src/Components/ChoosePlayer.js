import { Button } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChoosePlayer.module.css";
// import logo from "../Components/left-arrow.png";
import axios from "axios";
// import { headersProvider } from "../cookiesSession";
const ChoosePlayer = () => {
  const [input, setInput] = useState({
    email: "",
    errors: {},
  });
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
    if (validate()) {
        const resp =  await axios.post("https://server-tic-tac-toe.onrender.com/tic-tac-toe/game/v1/user/getPlayer", {
            email: input.email,
          },{
            // headers: headersProvider(),
          }).catch((e) => {
            alert('email not exists')
            console.error(e);
          });
          //  console.log(resp?.data?.id)
           if(resp?.data?.success){
             navigate(`/new-game/${resp?.data?.id}`)
           }
    }
  };

  return (
    <div className={`${styles.outerContainer}`}>
      <div className={`${styles.container} px-4 py-4`}>
        <div  className="flex flex-col items-center justify-content ">
            
          <div >
            <div
              className="ml-2"
              onClick={() => {
                navigate("/start-game");
              }}
              style={{ cursor: "pointer" }}
            >
              ≪
            </div>
            <div className={`${styles.createTitle} mt-6`}>Start a new game</div>
            <div className={`${styles.heading} mt-2`}>
              Whom do you want to play with?
            </div>
            <div className="flex flex-col mt-8 mx-2">
              <div className={`${styles.fieldTitle}`}>Email</div>
              <input
                className={`${styles.inputField}`}
                placeholder="Type their email here"
                value={input.email}
                onChange={changeHandler("email")}
              />
              <p style={{ color: "red" }}>{input.errors.email}</p>
            </div>
          </div>

          <div className="flex flex-col mt-10">
            <Button
              className={`${styles.btn}`}
              style={{ backgroundColor: "#F2C94C" }}
              onClick={saveHandler}
            >
              Start game
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChoosePlayer;
