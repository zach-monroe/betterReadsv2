import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm: "",
    user_fname: "",
    user_lname: "",
  });

  const [error, setError] = useState(0);

  const navigate = useNavigate();

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      });

      if (response.ok) {
        //returns hash temporarily until cookie and headers are correctly configured
        const responseData = await response.json();
        console.log(responseData);
        navigate("/");
      } else {
        //handles if password was not handled correctly
        setError(2);
      }
    } else {
      //handles if user has already made an account with that email. Maybe redirect to login with a message in the props?
      setError(1);
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
      {error === 1 ? (
        <p>Password and Confirmation do not match, please try again.</p>
      ) : null}
      {error === 2 ? <p>User already exists try logging in</p> : null}
    </div>
  );
}

export default SignUp;
