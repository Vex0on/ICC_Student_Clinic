import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AiOutlineTeam , AiOutlineCalendar, AiOutlineCopy, AiOutlineCheck } from "react-icons/ai"
import styles from "./AdminPanelPage.module.scss";
import checkToken from "../../utills/JWT/checkToken";

import HorizontalIconButton from "../../components/Buttons/HorizontalIconButton/HorizontalIconButton";
import Header1 from "../../components/Headers/Header1/Header1";
import TertiaryButton from "../../components/Buttons/TertiaryButton/TertiaryButton";

const AdminPanelPage = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        checkToken();
        const token = localStorage.getItem("token");
        const { role } = JSON.parse(atob(token.split(".")[1]));

            <div className={styles.container__tiles}>
                <HorizontalIconButton text={"Kalendarz wizyt"} icon={<AiOutlineCalendar />} linkTo={"/kalendarz-lekarza"} OnClick={null}/>
                <HorizontalIconButton text={"Lista lekarzy"} icon={<AiOutlineTeam/>} linkTo={"/lista-lekarzy"} OnClick={null}/>
                <HorizontalIconButton text={"Lista pacjentów"} icon={<AiOutlineCopy />} linkTo={"/lista-pacjentow"} OnClick={null}/>
                <HorizontalIconButton text={"Zatwierdzanie wizyt"} icon={<AiOutlineCheck />} linkTo={"/zatwierdzanie-wizyt"} OnClick={null}/>
            </div>
        let response;
        if (role === "doctor") {
          response = await axios.get(`http://127.0.0.1:8000/api/doctors/${id}/`);
        } else if (role === "reception") {
          response = await axios.get(`http://127.0.0.1:8000/api/receptions/${id}/`);
        }
        setUserData(response.data);
      } catch (error) {
        console.log("Wystąpił błąd podczas pobierania danych użytkownika", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleProfileClick = (endpoint) => {
    navigate(endpoint);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <Header1 text={"Panel admina"} />
      </div>

      <div className={styles.container__tiles}>
        <HorizontalIconButton text={"Kalendarz wizyt"} icon={<AiOutlineCalendar />} OnClick={null} />
        <HorizontalIconButton text={"Lista lekarzy"} icon={<AiOutlineTeam />} OnClick={() => handleProfileClick("/lista-lekarzy")} />
        <HorizontalIconButton text={"Lista pacjentów"} icon={<AiOutlineCopy />} OnClick={() => handleProfileClick("/lista-pacjentow")} />
      </div>

      <div className={styles.container__button}>
        <TertiaryButton text={"Wyloguj się"} onClick={null} />
      </div>
    </div>
  );
};

export default AdminPanelPage;
