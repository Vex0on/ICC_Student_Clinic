import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import styles from "./MedicalRecords.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import { BiPlusMedical } from "react-icons/bi";
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";
import ProfileImage from "../../utills/images/Avatar.jpg";
import Avatar from "../../components/Avatar/Avatar";

const MedicalRecordsPage = () => {
  const { id } = useParams();
  
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const userRole = decoded.role;

  const [medicalData, setMedicalData] = useState({
    currentHealth: "",
    sicknessHistory: "",
    treatmentPlan: "",
    medicationList: "",
    medicalExamination: "",
    firstName: "",
    lastName: "",
    profilePicture: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setMedicalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/documentations/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_health: medicalData.currentHealth,
          sickness_history: medicalData.sicknessHistory,
          treatment_plan: medicalData.treatmentPlan,
          medication_list: medicalData.medicationList,
          medical_examination: medicalData.medicalExamination,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
    } catch (error) {
      console.error("Error saving medical data:", error);
    }
  };

  useEffect(() => {
    const fetchMedicalData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/documentations/${id}/`);
        const data = await response.json();
        setMedicalData({
          currentHealth: data.current_health,
          sicknessHistory: data.sickness_history,
          treatmentPlan: data.treatment_plan,
          medicationList: data.medication_list,
          medicalExamination: data.medical_examination,
          firstName: data.student.first_name,
          lastName: data.student.last_name,
          profilePicture: data.student.user?.profile_picture
        });
      } catch (error) {
        console.error("Error fetching medical data:", error);
      }
    };

    fetchMedicalData();
  }, [id]);

  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={userRole === "doctor" ? `/karta-pacjenta/${id}` : `/panel-pacjenta/${id}`} />
      <div className={styles.container__header}>
        <BiPlusMedical className={styles.header__icon} />
        <h1 className={styles.header__text}>Dokumentacja Medyczna</h1>
      </div>

      <div className={styles.container__data__health}>
        <div>
          <h2>Aktualny stan zdrowia</h2>
          <textarea
            className={styles.input__textarea}
            name="currentHealth"
            value={medicalData.currentHealth}
            readOnly={userRole !== "doctor"}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Avatar
            text={`${medicalData.firstName} ${medicalData.lastName}`}
            imageSrc={
              medicalData.profilePicture
                ? `http://localhost:8000/api/${medicalData.profilePicture}`
                : ProfileImage
            }
          />
        </div>
      </div>

      <div className={styles.container__textarea}>
        <h2>Historia choroby</h2>
        <textarea
          className={styles.input__textarea}
          name="sicknessHistory"
          value={medicalData.sicknessHistory}
          readOnly={userRole !== "doctor"}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.container__textarea}>
        <h2>Plan leczenia</h2>
        <textarea
          className={styles.input__textarea}
          name="treatmentPlan"
          value={medicalData.treatmentPlan}
          readOnly={userRole !== "doctor"}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.container__footer}>
        <div className={styles.container__data}>
          <h2>Lista badań diagnostycznych</h2>
          <div className={styles.container__data}>
            <textarea
              className={styles.input__textarea}
              name="medicalExamination"
              value={medicalData.medicalExamination}
              readOnly={userRole !== "doctor"}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.container__data}>
          <h2>Lista lekarstw</h2>
          <div className={styles.container__data}>
            <textarea
              className={styles.input__textarea}
              name="medicationList"
              value={medicalData.medicationList}
              readOnly={userRole !== "doctor"}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {userRole === "doctor" && (
        <button onClick={handleSubmit}>Edytuj</button>
      )}
      
    </div>
  );
};

export default MedicalRecordsPage;
