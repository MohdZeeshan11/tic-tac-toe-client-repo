import { Button } from "@mantine/core";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookiesSession } from "../cookiesSession";
import styles from "./NewGame.module.css";

const NewGame = () => {
  // const [cardList, setCardList] = useState([]);
  // const [userData,setUserData] = useState();
  const navigate = useNavigate();

  // const getAllUserData = async () => {
  //   const resp = await axios
  //     .get("http://localhost:5000/tic-tac-toe/game/v1/user/card/details")
  //     .catch((e) => {
  //       console.error(e);
  //     });
  //   console.log(resp.data);
  //   const newArray = resp.data
  //     .map((item) => {
  //       return item.cardData;
  //     })

  //     const newArray1 =newArray.filter((item1)=>{
  //       console.log('item = ',item1.length);
  //       return item1.length !== 0;
  //     })
  //   // console.log('data = ',newArray1.flat());
  //   setCardList(newArray1.flat());
  // };

  // console.log('list = ',cardList);


  // useEffect(() => {
    // getAllUserData();
  // }, []);
  return (
    <div className={`${styles.outerContainer} px-4 py-4`}>

      <div className={`${styles.container} px-4 py-4 flex flex-col`}>
        <div className="flex flex-col items-center justify-content ">

        {/* {cardList.length === 0 && ( */}
          {/* <div>
          <div className={`${styles.headingBox}`}>No Games</div>
          <div className={`${styles.headingBox}`}>Found</div>
        </div> */}
        <div>
          <div className={`${styles.headingBox}`}>Start</div>
          <div className={`${styles.headingBox}`}>Game</div>
        </div>
        {/* )} */}
          

          <div className="flex flex-col mt-6">
          <Button
              className={`${styles.btn}`}
              style={{ backgroundColor: " #2F80ED",marginBottom:'8px' }}
              onClick={() => {
                if (getCookiesSession('userDataToken')) {
                  deleteCookie('userDataToken');
              }
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              className={`${styles.btn}`}
              style={{ backgroundColor: "#F2C94C" }}
              onClick={() => {
                // navigate("/choose-player");
                navigate("/new-game");
              }}
            >
              Start a new game
            </Button>
            {/* {cardList.length !== 0 && (
            <>
              {cardList.map((item, i) => {
                return <Card key={i} obj={item} />;
              })}
            </>
          )} */}
          </div>
        </div>
      </div>
    </div>
    // <div className={`${styles.outerContainer}`}>
    //  <div className={`${styles.container} px-4 py-4`}>
    //  <div  className="flex flex-col  items-center justify-content " >
    //   <div>shan</div>
    //  <div className={`${styles.gameTitle} ml-2`}>Your Games</div>
  );
};

export default NewGame;
