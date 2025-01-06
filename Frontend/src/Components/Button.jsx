import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const Button = () => {
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) {
//       alert("Please select a file.");
//       return;
//     }

//     setFile(selectedFile);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }
//     console.log("🔑 Token from Local Storage:", localStorage.getItem("token"));

//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/v1/image/upload",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("Upload Success:", res.data);
//     } catch (error) {
//       console.error("Upload Failed:", error.response?.data || error.message);

//       if (error.response?.status === 403) {
//         console.error("🔴 Backend Response:", error.response.data);
//         alert("You are not authorized. Please log in again.");
//         navigate("/login");
//       }
//     }
//   };

//   return (
//     <div className="mt-4">
//       <label>
//         <AddCircleIcon sx={{ fontSize: 40, color: "#15803d" }} />
//         <input
//           onChange={handleChange}
//           style={{ display: "none" }}
//           type="file"
//           accept="image/*"
//         />
//       </label>
//     </div>
//   );
// };

// export default Button;

const Button = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFile(e.target.files);

    const checkToken = localStorage.getItem("token") || 20;
    if (!checkToken) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("image", e.target.files[0]); // Append the file to the FormData

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/image/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`, // Include token here
          },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4">
      <label>
        <AddCircleIcon sx={{ fontSize: 40, color: "#15803d" }} />
        <input
          onChange={handleChange}
          style={{ display: "none" }}
          type="file"
        />
      </label>
    </div>
  );
};

export default Button;
