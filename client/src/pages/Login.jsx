import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const auth = useAuth();

  //submission handling.
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //uses authentication handling set up in parent
      await auth.loginAction({ email: email, password: password });
    } catch (err) {
      setError(err.message);
    }

    return;
  }
  return (
    <div className="bg-primary pt-4">
      <div className="min-h-screen flex justify-center items-center text-primary">
        <div className="bg-material rounded p-8">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="pb-4 text-material">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                required
              />
            </div>
            <div className="pb-4 text-material">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
              />
            </div>
            <div className="flex justify-center">
              <input
                className="bg-accent rounded-full px-4 border-primary border-2"
                type="submit"
                value="Log-In"
              />
            </div>
          </form>
          {error && (
            <p className="flex justify-center pt-4 text-center text-primary">
              {error}
            </p>
          )}
          <div className="flex justify-center pt-4">
            <p>- OR -</p>
          </div>
          <div className="flex justify-center pt-4 ">
            <Link
              className="bg-material text-accent border-accent border-2 rounded-full px-4"
              to="/signup"
            >
              Sign-Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
