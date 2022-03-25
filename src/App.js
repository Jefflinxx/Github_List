import "./App.css";
import Homepage from "./components/Homepage";
import User from "./components/User";
import Repos from "./components/Repos";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/users/:username/repos" element={<User />} />
        <Route path="/users/:username/repos/:repo" element={<Repos />} />
      </Routes>
    </div>
  );
}

export default App;
