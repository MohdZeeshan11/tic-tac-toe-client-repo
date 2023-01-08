import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NewGame from "./Components/NewGame";
import Register from "./Components/Register";
// import ChoosePlayer from "./Components/ChoosePlayer";
import GameBoard from "./Components/GameBoard";
// import Card from './Components/Card';
// import NewGame from './Components/NewGame';
// import { StartGame } from './Components/StartGame';
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/start-game" exact element={<NewGame />} />
      {/* <Route path="/choose-player" exact element={<ChoosePlayer />} /> */}
      <Route path="/new-game" exact element={<GameBoard />} />
    </Routes>
  );
}

export default App;
