import React from "react";
import styles from "./PatientProfilePage.module.scss";
import { useState, useEffect } from "react";
import Header1 from "../../components/Headers/Header1/Header1";
import Avatar from "../../components/Avatar/Avatar";
import InformationsIcon from "../../components/Informations/InformationsIcon/InformationsIcon";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileImage from "../../utills/images/Avatar.jpg";
import checkToken from "../../utills/JWT/checkToken";
import { AiOutlineHeart, AiOutlineCalendar } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"


const PatientProfilePage = () => {
  const [patientData, setPatientData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientData = async () => {
      checkToken();
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/students/${id}/`
        );
        setPatientData(response.data);
      } catch (error) {
        console.log("Wystąpił błąd podczas pobierania danych pacjenta", error);
      }
    };

    fetchPatientData();
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header1 text={"Profil pacjenta"} />
      <ArrowNavigate linkTo={"/panel-pacjenta"} />
      <div className={styles.container__data}>
        <div>
          <Avatar
            text={`${patientData.first_name} ${patientData.last_name}`}
            imageSrc={
              patientData.user?.profile_picture
                ? `http://localhost:8000/api/${patientData.user.profile_picture}`
                : ProfileImage
            }
          />
        </div>

        <div className={styles.container__icons}>
          <InformationsIcon
            text={patientData.pesel}
            icon={<AiOutlineHeart />}
          />
          <InformationsIcon
            text={patientData.date_of_birth}
            icon={<AiOutlineCalendar />}
          />
          <InformationsIcon text={patientData.address} icon={<LuMapPin />} />
          <InformationsIcon
            text={patientData.phone_number}
            icon={<BsTelephone />}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
