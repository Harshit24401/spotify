import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import authService from "../service/profile.js";

function App() {
  const authorizer = () => {
    authService.auth();
  };
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
      <h1>Spotify</h1>
      <div className="card">
        <button onClick={authorizer}>click to authorize</button>
        <p>Spotify-web-app</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and Sopotify logos to learn more
      </p>
    </>
  );
}

export default App;
