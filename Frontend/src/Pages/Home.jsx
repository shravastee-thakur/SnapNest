import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("name"));
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/image/getImages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      setFile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-xl lg:text-3xl text-center font-semibold mt-5">
          Welcome {loggedInUser}
        </h1>

        {/* buttons */}
        <div className="flex justify-center">
          <Button />

          <button
            onClick={() => {
              localStorage.clear(), navigate("/login");
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg m-4"
          >
            Logout
          </button>
        </div>

        {/* images */}
        {file?.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {file.map((item) => (
              <div className="m-5" key={item._id}>
                <img
                  src={item.ImageURL}
                  alt={item.originalName}
                  className="w-80 h-80"
                />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-2xl text-center">No images found</h1>
        )}
      </div>
    </>
  );
};

export default Home;
