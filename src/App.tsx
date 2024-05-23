import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AppDashboard } from "./AppDashboard";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Cosmic Dashboard</h1>
      HOMEPAGE: Coming Soon APOD
      <div className="card">
        <Link to="/dashboard">Dashboard View</Link>
      </div>
      <p className="read-the-docs">
        Click <a href="#">here</a> to learn more
      </p>
    </>
  );
}

export default App;
