import React from "react";
import { Button } from '@mantine/core';
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className={`${styles.outerContainer}`}>
      <div className={`${styles.container} flex flex-col justify-between`}>
      <div className={`${styles.middleBox} mt-3`}>
        <div className={`${styles.headingBox}`}>tic tac</div>
        <div className={`${styles.headingBox}`}>toe</div>
        <div className={`${styles.headingBox}`}>game</div>
      </div>
      <div className={`${styles.btnBox} flex flex-col mt-16 mb-10`}>
        <Button
          className={`${styles.btn}`}
          style={{ backgroundColor: "#F2C94C" }}
          onClick={()=>{
            navigate('/login')
          }}
        >
          Login
        </Button>
        <Button
          className={`${styles.btn} mt-6`}
          style={{ backgroundColor: " #2F80ED" }}
          onClick={()=>{
            navigate('/register')
          }}
        >
          Register
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Home;
