import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <div className="w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl">
        <h1 className="text-center mt-3 text-2xl font-bold">SignUp</h1>
        <p className="text-center font-semibold mt-3">
          New user? Register here
        </p>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Name</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={user.name}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="font-semibold"> Email</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="font-semibold">Password</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={user.password}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 ">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold p-2 rounded-lg "
            >
              Sign Up
            </button>
            <p className="mt-2">
              Already have an account?
              <NavLink
                className={"text-indigo-600 font-semibold"}
                to={"/login"}
              >
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
