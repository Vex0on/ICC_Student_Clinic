import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const checkRoleAndRedirectPanel = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwt_decode(token);
      const userRole = decoded.role;
      const userId = decoded.id;

      if (userRole === "student") {
        window.location.href = `/panel-pacjenta/${userId}`
        console.log("pacjent")
      } else if (userRole === "doctor"){
        window.location.href = `/panel-admina/${userId}`
        console.log("doktor")
      }
      else if (userRole === "reception"){
        window.location.href = `/panel-admina/${userId}`
        console.log("recepcja")
      }
    } catch (error) {
      console.log('Błąd dekodowania tokenu JWT:', error);
      window.location.href = "";
    }
  } else {
    console.log("cos jest nie tak");
    // window.location.href = "";
  }
};

export default checkRoleAndRedirectPanel;
