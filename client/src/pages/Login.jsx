import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = useAuth();
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);
    auth.loginAction({ email: email, password: password });
    return;
  }
  return (
    <div className="min-h-screen pt-28">
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" />
      </form>
      <br />
      <p>OR</p>
      <Link to="/signup">Sign-Up</Link>
    </div>
  );
}

export default Login;
