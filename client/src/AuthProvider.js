import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || ""); // Set token to empty string if not found
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok && res) {
        setUser(res);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");
        return;
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const signupAction = async (data) => {
    try {
      const response = await fetch("/api/register", {
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
        navigate("/");
      } else {
        throw new Error(res.error || "an error occured try again!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const logOut = () => {
    setUser({ name: "", email: "" }); // Reset user state to an empty object
    setToken("");
    localStorage.removeItem("site");
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
