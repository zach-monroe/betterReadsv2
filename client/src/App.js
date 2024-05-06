import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/New" element={<New />} />
      </Routes>
    </Router>
  );
}

export default App;

//    import React, { useState } from "react";
//    import Home from "./pages/Home";
//    import New from "./pages/New";
//    import NavBar from "./components/NavBar";
//
//    function App() {
//      const [route, setRoute] = useState(window.location.pathname);
//
//      const navigate = (to) => {
//        window.history.pushState({}, "", to);
//        setRoute(to);
//      };
//
//      return (
//        <div>
//          <nav>
//            <ul>
//              <li>
//                <button onClick={() => navigate("/")}>Home</button>
//              </li>
//              <li>
//                <button onClick={() => navigate("/new")}>New</button>
//              </li>
//            </ul>
//          </nav>
//
//          {route === "/" && <Home />}
//          {route === "/new" && <New />}
//        </div>
//      );
//    }
//
//    export default App;
