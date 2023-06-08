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
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState("");

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    checkToken();
    try {
      const response = await axios.get(`http://localhost:8000/api/students/${id}/`);
      setPatientData(response.data);
    } catch (error) {
      console.log("Wystąpił błąd podczas pobierania danych pacjenta", error);
    }
  };

  const handlePhoneNumberEdit = () => {
    setEditingPhoneNumber(true);
    setNewPhoneNumber(patientData.phone_number);
    setOriginalPhoneNumber(patientData.phone_number);
  };

  const handlePhoneNumberSave = async () => {
    checkToken();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/students/${id}/`,
        { phone_number: newPhoneNumber }
      );

      console.log(response.data);

      setEditingPhoneNumber(false);
      fetchPatientData();
    } catch (error) {
      console.log("Wystąpił błąd podczas aktualizacji numeru telefonu", error);
    }
  };

  const handlePhoneNumberCancel = () => {
    setEditingPhoneNumber(false);
    setNewPhoneNumber(originalPhoneNumber);
  };

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header1 text={"Profil pacjenta"} />
      <ArrowNavigate linkTo={`/panel-pacjenta/${id}`} />
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
          <InformationsIcon 
            text={patientData.address} 
            icon={<LuMapPin />} 
          />
          {editingPhoneNumber ? (
          <div>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
            <button onClick={handlePhoneNumberSave}>Zapisz</button>
            <button onClick={handlePhoneNumberCancel}>Anuluj</button>
          </div>
        ) : (
          <div>
            <InformationsIcon
              text={patientData.phone_number}
              icon={<BsTelephone />}
            />
            <button onClick={handlePhoneNumberEdit}>Edytuj numer telefonu</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
