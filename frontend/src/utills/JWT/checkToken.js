import { useParams } from "react-router-dom";

const checkToken = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      window.location.href = "http://127.0.0.1:3000";
    }
  };

export default checkToken;