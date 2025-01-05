import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("name"));
  }, []);
  return (
    <>
      <div>
        <h1 className="text-xl lg:text-3xl text-center font-semibold mt-5">
          Welcome, {loggedInUser}
        </h1>

        <div className="flex justify-center">
          <Button />

          <button
            onClick={() => {
              localStorage.clear(), navigate("/login");
            }}
            className="bg-orange-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg m-4"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
