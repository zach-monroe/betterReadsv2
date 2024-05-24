import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import Burger from "./components/BurgerMenu";

function App() {
  return (
    <div className="min-w-128">
      <Router>
        <AuthProvider>
          <Burger />

          <div className=" bg-primary">
            <Routes>
              <Route path="*" exact element={<Home />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="/new" element={<New />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
