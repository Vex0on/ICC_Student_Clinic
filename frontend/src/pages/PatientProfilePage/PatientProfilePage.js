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
  const [editingAllergies, setEditingAllergies] = useState(false);
  const [newAllergies, setNewAllergies] = useState("");
  const [originalAllergies, setOriginalAllergies] = useState("");
  const [editingMedications, setEditingMedications] = useState(false);
  const [newMedications, setNewMedications] = useState("");
  const [originalMedications, setOriginalMedications] = useState("");

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

  const handleAllergiesEdit = () => {
    setEditingAllergies(true);
    setNewAllergies(patientData.allergies);
    setOriginalAllergies(patientData.allergies);
  };

  const handleAllergiesSave = async () => {
    checkToken();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/students/${id}/`,
        { allergies: newAllergies }
      );

      console.log(response.data);

      setEditingAllergies(false);
      fetchPatientData();
    } catch (error) {
      console.log("Wystąpił błąd podczas aktualizacji alergii", error);
    }
  };

  const handleAllergiesCancel = () => {
    setEditingAllergies(false);
    setNewAllergies(originalAllergies);
  };

  const handleMedicationsEdit = () => {
    setEditingMedications(true);
    setNewMedications(patientData.medications_taken);
    setOriginalMedications(patientData.medications_taken);
  };

  const handleMedicationsSave = async () => {
    checkToken();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/students/${id}/`,
        { medications_taken: newMedications }
      );
  
      console.log(response.data);
  
      setEditingMedications(false);
      fetchPatientData();
    } catch (error) {
      console.log("Wystąpił błąd podczas aktualizacji przyjmowanych leków", error);
    }
  };

  const handleMedicationsCancel = () => {
    setEditingMedications(false);
    setNewMedications(originalMedications);
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

          {editingAllergies ? (
            <div>
              <input
                type="text"
                value={newAllergies}
                onChange={(e) => setNewAllergies(e.target.value)}
              />
              <button onClick={handleAllergiesSave}>Zapisz</button>
              <button onClick={handleAllergiesCancel}>Anuluj</button>
            </div>
          ) : (
            <div>
              <InformationsIcon
                text={patientData.allergies || "-"}
              />
              <button onClick={handleAllergiesEdit}>Edytuj alergie</button>
            </div>
          )}

          {editingMedications ? (
            <div>
              <input
                type="text"
                value={newMedications}
                onChange={(e) => setNewMedications(e.target.value)}
              />
              <button onClick={handleMedicationsSave}>Zapisz</button>
              <button onClick={handleMedicationsCancel}>Anuluj</button>
            </div>
          ) : (
            <div>
              <InformationsIcon
                text={patientData.medications_taken || "-"}
              />
              <button onClick={handleMedicationsEdit}>Edytuj leki</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
