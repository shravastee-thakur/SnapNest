import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withcredentials: true,
        }
      );
      console.log(res.data);
      if (res?.data?.token && res?.data?.data?.name) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.data.name);
        alert("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mt-32 flex justify-center items-center">
      <div className="w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl">
        <h1 className="text-center mt-3 text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="p-4">
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
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="font-semibold">Password</label>
            <input
              onChange={handleChange}
              className="border p-2 rounded-lg"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={user.password}
            />
            <div className="absolute top-9 right-3">
              {!showPassword ? (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  fontSize="small"
                />
              ) : (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  fontSize="small"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-4 ">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold p-2 rounded-lg"
            >
              Login
            </button>
            <p>
              Don't have an account?
              <NavLink
                className={"text-indigo-600 font-semibold"}
                to={"/signup"}
              >
                SignUp
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
