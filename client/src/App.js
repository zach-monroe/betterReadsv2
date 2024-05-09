import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: false, //change to true before build
  });

  return (
    <div>
      <AuthProvider store={store}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="*" exact element={<Home />} />
            <Route path="/New" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
