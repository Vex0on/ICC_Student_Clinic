import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MedicalRecords.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import { BiPlusMedical } from "react-icons/bi";
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";
import ProfileImage from "../../utills/images/Avatar.jpg";
import Avatar from "../../components/Avatar/Avatar";

const MedicalRecordsPage = () => {
  const { id } = useParams();
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
      <ArrowNavigate linkTo={`/panel-pacjenta/${id}`} />
      <div className={styles.container__header}>
        <BiPlusMedical className={styles.header__icon} />
        <h1 className={styles.header__text}>Dokumentacja Medyczna</h1>
      </div>

      <div className={styles.container__data__health}>
        <div>
          <h2>Aktualny stan zdrowia</h2>
          <textarea
            className={styles.input__textarea}
            type="textarea"
            value={medicalData.currentHealth}
            readOnly
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
          value={medicalData.sicknessHistory}
          readOnly
        />
      </div>

      <div className={styles.container__textarea}>
        <h2>Plan leczenia</h2>
        <textarea
          className={styles.input__textarea}
          type="textarea"
          value={medicalData.treatmentPlan}
          readOnly
        />
      </div>

      <div className={styles.container__footer}>
        <div className={styles.container__data}>
          <h2>Lista badań diagnostycznych</h2>
          <div className={styles.container__data}>
            <textarea
              className={styles.input__textarea}
              value={medicalData.medicalExamination}
              readOnly
            />
          </div>
        </div>

        <div className={styles.container__data}>
          <h2>Lista lekarstw</h2>
          <div className={styles.container__data}>
            <textarea
              className={styles.input__textarea}
              value={medicalData.medicationList}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
