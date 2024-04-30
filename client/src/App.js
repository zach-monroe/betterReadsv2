import React, { useState } from "react";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setRoute(to);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/new")}>New</button>
          </li>
        </ul>
      </nav>

      {route === "/" && <Home />}
      {route === "/new" && <New />}
    </div>
  );
}

export default App;
