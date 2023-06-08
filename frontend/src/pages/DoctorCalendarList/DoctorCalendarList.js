import React, { useState, useEffect } from "react"
import axios from "axios";
import styles from "./DoctorCalendarList"
import { useNavigate } from "react-router-dom";
import Header1 from "../../components/Headers/Header1/Header1"

import ProfileImage from "../../utills/images/Avatar.jpg"
import AvatarRow from "../../components/AvatarRow/AvatarRow"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";
import HorizontalSpecialistButton from "../../components/Buttons/HorizontalSpecialistButton/HorizontalSpecialistButton";

const DoctorCalendarList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleSpecialistClickCalendar = (id) => {
    navigate(`/kalendarz-lekarza/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/doctors/")
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={"/panel-admina"} />
      <Header1 text={"Lista lekarzy"} />
      <div className={styles.container__data}>
        {doctors.map(doctor => (
          <HorizontalSpecialistButton
            key={doctor.id}
            text={`${doctor.first_name} ${doctor.last_name}`}
            imageSrc={doctor.user.profile_picture ? `http://localhost:8000/api${doctor.user.profile_picture}` : ProfileImage}
            onClick={() => handleSpecialistClickCalendar(doctor.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorCalendarList
