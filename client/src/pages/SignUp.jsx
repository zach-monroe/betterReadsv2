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

  //handles form changes and adds them to data.
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  //handles submission of form
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
    <div className="pg-primary pt-4">
      <div className="min-h-screen flex justify-center items-center text-primary">
        <div className="bg-material rounded p-8">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="pb-4 text-material">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="min-w-[200px]"
              />
            </div>
            <div className="pb-4 text-material">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="min-w-[200px]"
              />
            </div>
            <div className="pb-4 text-material">
              <input
                type="password"
                name="confirm"
                value={data.confirm}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="min-w-[200px]"
              />
            </div>

            <div className="pb-4 text-material">
              <input
                type="text"
                name="user_fname"
                value={data.user_fname}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="min-w-[200px]"
              />
            </div>
            <div className="pb-4 text-material">
              <input
                type="text"
                name="user_lname"
                value={data.user_lname}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="min-w-[200px]"
              />
            </div>
            <div className="flex justify-center ">
              <input
                className="bg-accent rounded-full px-4 border-primary border-2"
                type="submit"
              />
            </div>
          </form>
          {error?.length > 0 ? <p>{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
