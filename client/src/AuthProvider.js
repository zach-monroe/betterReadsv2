import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || ""); // Set token to empty string if not found
  const navigate = useNavigate();

  //Initializes user data from local storage if present. Allowing data to persist between sessions.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("site");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.stringify(storedToken));
    }
  }, []);

  //Handles login.
  const loginAction = async (data) => {
    try {
      //fetching user information from server
      const response = await fetch("http://18.219.34.33:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //returning and reformating user data into json.
      const res = await response.json();
      if (response.ok && res) {
        setUser(res);
        setToken(res.token);
        localStorage.setItem("site", res.token); //puts token in local storage so data persists
        localStorage.setItem("user", JSON.stringify(res)); //puts user data in local storage so data persists  NOTE: Will need to make sure this does not cause race conditions
        navigate("/");
        return;
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      throw err; //throws error to be displayed in Login.Jsx
    }
  };

  const signupAction = async (data) => {
    try {
      const response = await fetch("http://18.219.34.33:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok) {
        setUser(res);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      } else {
        throw new Error(res.error || "an error occured try again!");
      }
    } catch (err) {
      console.log(err);
      throw err; //throws error to be displayed in SignUp.jsx
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, signupAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
