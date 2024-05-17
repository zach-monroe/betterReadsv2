import React from "react";
import { useState } from "react";
import { useAuth } from "../AuthProvider";

function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm: "",
    user_fname: "",
    user_lname: "",
  });

  const [error, setError] = useState(null);

  const auth = useAuth();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (data.password === data.confirm) {
      try {
        await auth.signupAction(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    } else {
      //
      //handles if password does not match confirmation
      setError("Password and Confirmation do not match, please try again!");
      setData((prevValue) => ({
        ...prevValue,
        password: "",
        confirm: "",
      }));
    }
  }

  return (
    <div className="min-h-screen pt-28">
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirm"
          value={data.confirm}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <input
          type="text"
          name="user_fname"
          value={data.user_fname}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          type="text"
          name="user_lname"
          value={data.user_lname}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input type="submit" />
      </form>
      {error?.length > 0 ? <p>{error}</p> : null}
    </div>
  );
}

export default SignUp;
