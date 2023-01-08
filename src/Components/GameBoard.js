import { Button } from "@mantine/core";
import React from "react";
import { useState } from "react";
import styles from "./GameBoard.module.css";
import SquareBox from "./SquareBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  // deleteCookie,
  // getCookiesSession,
  headersProvider,
} from "../cookiesSession";
// import { ADD_USER } from "../redux/actionTypes";
// import { headersProvider } from "../cookiesSession";

const GameBoard = () => {
  const [boxValue, setBoxValue] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winnerVal] = useState(false);
  // const [playerData,setPlayerData] = useState({});
  // const [currentValue, setCurrentValue] = useState('');
  // const [value, setValue] = useState("");

  const userData = useSelector((state) => state.userData);

  console.log("userLoginData = ", userData);

  const navigate = useNavigate();
  // const { playerId } = useParams();
  const checkWinner = () => {
    const winnerArrary = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerArrary) {
      const [a, b, c] = logic;
      if (
        boxValue[a] !== null &&
        boxValue[a] === boxValue[b] &&
        boxValue[a] === boxValue[c]
      ) {
        return boxValue[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const clickHandler = async (index) => {
    if (boxValue[index] === "X" || boxValue[index] === "O") {
      return;
    }
    if (isWinner === "X" || isWinner === "O") {
      console.log("return ");
      return;
    }
    const copyBoxValue = [...boxValue];
    copyBoxValue[index] = isXTurn ? "X" : "O";
    console.log("current value = ", copyBoxValue[index]);
    // setCurrentValue(copyBoxValue[index]);
    // console.log('current value = ',currentValue==='X'?'O':'X');
    setBoxValue(copyBoxValue);
    // console.log('index = ',index+" and value of index is == ",boxValue[index]);
    setIsXTurn(!isXTurn);

    await axios
      .patch(
        "https://server-tic-tac-toe.onrender.com/tic-tac-toe/game/v1/user/board-data",
        {
          playerId: userData._id,
          boardData: [...copyBoxValue],
        },
        {
          headers: headersProvider(),
        }
      )
      .catch((e) => {
        console.error(e);
      });
  };

  // const getSinglePlayer = async () => {
  //   const resp = await axios.get(`http://localhost:5000/tic-tac-toe/game/v1/user/get-single-Player/${playerId}`)
  //   .catch((e) => {
  //     console.error(e.message);
  //     alert('something wrong');
  //   })
  //   if(resp.data.success){
  //     setPlayerData(resp.data.user);
  //   }
  // }
  const getCurrentPlayerData = async () => {
    console.log("userData id = ", userData._id);
    const resp = await axios
      .get(
        `https://server-tic-tac-toe.onrender.com/tic-tac-toe/game/v1/user/get-single-Player/${userData._id}`,
        { headers: headersProvider() }
      )
      .catch((e) => {
        console.error(e.message);
        // alert("something wrong");
      });
    if (resp.data.success) {
      setBoxValue(resp.data.user.boardData);
    }
  };

  const startAnotherGame = async (isWinner) => {
    setBoxValue(Array(9).fill(null));
    await axios
      .patch("https://server-tic-tac-toe.onrender.com/tic-tac-toe/game/v1/user/board-data", {
        playerId: userData._id,
        boardData: Array(9).fill(null),
      },{
        headers: headersProvider(),
      })
      .catch((e) => {
        console.error(e);
      });
    setIsXTurn(true);
  };

  // const startAnotherGame = async (isWinner) => {
  //   // console.log("Winner is = ",isWinner)
  //   // let winner ;
  //   // if(isWinner === false){
  //   //   console.log('game draw');
  //   //   winner = 'Draw';
  //   // }else{
  //   //   winner = isWinner;
  //   // }

  //   // await axios.post(`http://localhost:5000/tic-tac-toe/game/v1/user/add-card`,
  //   //     {
  //   //       playerId: userData._id,
  //   //       boardData: [...boxValue],
  //   //       winner:winner,
  //   //       time: new Date(),
  //   //       // oppositePlayerId: playerId,
  //   //       // oppositePlayerName: playerData.name,
  //   //     }
  //   //   )
  //   //   .catch((e) => {
  //   //     console.error(e);
  //   //   });
  //   // await axios.patch("http://localhost:5000/tic-tac-toe/game/v1/user/board-data",
  //   // {
  //   //   playerId: userData._id,
  //   //   boardData: Array(9).fill(null),
  //   // })
  //   // .catch((e) => {
  //   //   console.error(e);
  //   // });
  //   setBoxValue(Array(9).fill(null));
  //   setIsXTurn(true);
  // };
  // const  submitGame =  ()=>{
  //   console.log('game submit');
  // }

  useEffect(() => {
    // getSinglePlayer();
    getCurrentPlayerData();
  }, []);

  return (
    <div className={`${styles.outerContainer}`}>
      <div
        className={`${styles.container}  grid grid-cols-1 content-between px-4 py-4`}
      >
        <div className="flex flex-col">
          <div
            className="ml-2"
            onClick={() => {
              //   setBoxValue(Array(9).fill(null));
              //   if (getCookiesSession('userDataToken')) {
              //     deleteCookie('userDataToken');
              // }

              navigate("/start-game");
            }}
            style={{ cursor: "pointer" }}
          >
            ≪ back
          </div>
          <div className={`${styles.gameTitle} ml-2 mt-2 flex justify-center`}>
            {/* Playing with {playerData.name}</div> */}
            Tic Tac Toe
          </div>
          <div className="ml-2 mt-2">
            {/* {isXTurn === true ? "Your piece" : "Their piece"} */}
          </div>
          <div
            className="ml-2"
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: isXTurn === true ? "#2C8DFF" : "#FF4F4F",
              borderRadius: "63.9998px",
            }}
          >
            {/* {isXTurn === true ? "X" : "O"} */}
          </div>

          <div className={`${styles.gameHeading} mt-2`}>
            {!isWinner &&
              boxValue.filter((item) => {
                return item !== null;
              }).length !== 9 && (
                <div className="flex flex-row justify-center items-center mt-3">
                  {winnerVal === "X" || winnerVal === "O" ? (
                    <>{winnerVal === "X" ? "You win" : "They win"}</>
                  ) : (
                    // <>{isXTurn === true ? "Your move" : "Their move"}</>
                    <>{isXTurn === true ? "X turn" : "O turn"}</>
                    // <>{isXTurn === true ? "Play" : "Play"}</>
                  )}
                </div>
              )}
            {isWinner && (
              <div className="flex flex-row justify-center items-center mt-3">
                {isWinner === "X" ? "X Win" : "O Win"}
              </div>
            )}

            {boxValue.filter((item) => {
              return item !== null;
            }).length === 9 &&
              !isWinner && (
                <div className="flex flex-row justify-center items-center mt-3">
                  Draw
                </div>
              )}
          </div>
          <div className={`${styles.boardContainer} mt-4 justify-center`}>
            <>
              <div className={`${styles.boardRow}`}>
                <SquareBox
                  value={boxValue[0]}
                  onClick={() => clickHandler(0)}
                />
                <SquareBox
                  value={boxValue[1]}
                  onClick={() => clickHandler(1)}
                />
                <SquareBox
                  value={boxValue[2]}
                  onClick={() => clickHandler(2)}
                />
              </div>
              <div className={`${styles.boardRow}`}>
                <SquareBox
                  value={boxValue[3]}
                  onClick={() => clickHandler(3)}
                />
                <SquareBox
                  value={boxValue[4]}
                  onClick={() => clickHandler(4)}
                />
                <SquareBox
                  value={boxValue[5]}
                  onClick={() => clickHandler(5)}
                />
              </div>
              <div className={`${styles.boardRow}`}>
                <SquareBox
                  value={boxValue[6]}
                  onClick={() => clickHandler(6)}
                />
                <SquareBox
                  value={boxValue[7]}
                  onClick={() => clickHandler(7)}
                />
                <SquareBox
                  value={boxValue[8]}
                  onClick={() => clickHandler(8)}
                />
              </div>
            </>
          </div>
          {isWinner && (
            <div
              className="ml-2 flex justify-center"
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                color: isWinner === "X" ? "#2C8DFF" : "#FF4F4F",
                borderRadius: "63.9998px",
              }}
            >
              {isWinner === "X" ? "X Win" : "O Win"}
            </div>
          )}
          {boxValue.filter((item) => {
            return item !== null;
          }).length === 9 &&
            !isWinner && (
              <div
                div
                className="ml-2 flex justify-center"
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "green",
                  borderRadius: "63.9998px",
                }}
              >
                Draw
              </div>
            )}
        </div>

        <div className="mb-10">
          {/* {!isWinner && boxValue.filter((item) => {
              return item !== null;
            }).length !== 9 && (
            <Button
              className={`${styles.btn} mt-14`}
              style={
                isXTurn === true
                  ? { backgroundColor: "#F2C94C" }
                  : { backgroundColor: "" }
              }
              disabled={isXTurn === true ? false : true}
              onClick={() => {
                submitGame();
              }}
            >
              {isXTurn === true ? "Submit" : `Waiting for ${playerData.name}`}
            </Button>
          )} */}
          {(isWinner ||
            boxValue.filter((item) => {
              return item !== null;
            }).length === 9) && (
            <Button
              className={`${styles.btn} mt-0`}
              style={{ backgroundColor: "#F2C94C" }}
              onClick={() => {
                startAnotherGame(isWinner);
              }}
            >
              {isWinner ? "Start another game" : "Start another game"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
