import { useParams } from "react-router-dom";

const checkToken = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
<<<<<<< HEAD
      window.location.href = "http://127.0.0.1:3000/login";
=======
      window.location.href = "http://127.0.0.1:3000";
>>>>>>> 3cb4a3705c1958f9e0c5e1384bc884c360ec7c73
    }
  };

export default checkToken;