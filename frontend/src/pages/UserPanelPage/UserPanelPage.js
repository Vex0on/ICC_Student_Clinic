import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserPanelPage.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineCopy, AiOutlineUser } from "react-icons/ai";
import HorizontalImageButton from "../../components/Buttons/HorizontalImageButton/HorizontalImageButton";
import Header1 from "../../components/Headers/Header1/Header1";
import TertiaryButton from "../../components/Buttons/TertiaryButton/TertiaryButton";
import checkToken from "../../utills/JWT/checkToken";
import Handshake from "../../utills/images/handshake.jpg";
import Consultation from "../../utills/images/consultation.jpg";
import Pressure from "../../utills/images/pressure.jpg";

const UserPanelPage = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        checkToken();
        const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}/`);
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
        <Header1 text={`${userData.first_name} ${userData.last_name}`} />
      </div>

        <div className={styles.container__tiles}>
            <HorizontalImageButton text={"Zarejestruj wizytę"} icon={<AiOutlineCalendar />} linkTo={"/lekarze"} imageSrc={Handshake} OnClick={null}/>
            <HorizontalImageButton text={"Dokumentacja medyczna"} icon={<AiOutlineCopy />} linkTo={`/dokumentacja-medyczna/${id}`} imageSrc={Consultation} OnClick={null}/>
            <HorizontalImageButton text={"Profil pacjenta"} icon={<AiOutlineUser />} linkTo={`/profil-pacjenta/${id}`} imageSrc={Pressure} OnClick={null}/>
        </div>

      <div className={styles.container__button}>
        <TertiaryButton text="Wyloguj się" onClick={() => {localStorage.removeItem("token"); navigate("/")}} />
      </div>
    </div>
  );
};

export default UserPanelPage;
