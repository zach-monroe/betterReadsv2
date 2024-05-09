import React, { useState } from "react";
//import { useSignIn } from "react-auth-kit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  // const signIn = useSignIn();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);
    const request = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(request);
    const response = await request.json();
    console.log(response.token); //Token is properly sent to front end. Need to configure basic authentication through react-auth-kit.
    navigate("/");
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
