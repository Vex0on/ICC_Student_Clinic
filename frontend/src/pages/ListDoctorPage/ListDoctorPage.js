import React, { useState, useEffect } from "react"
import axios from "axios";
import styles from "./ListDoctorPage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"

import ProfileImage from "../../utills/images/profileimage.jpeg"
import AvatarRow from "../../components/AvatarRow/AvatarRow"

const ListDoctorPage = () => {
  const [doctors, setDoctors] = useState([]);

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
      <Header1 text={"Lista lekarzy"} />
      <div className={styles.container__data}>
        {doctors.map(doctor => (
          <AvatarRow
            text={`${doctor.first_name} ${doctor.last_name}`}
            imageSrc={doctor.user.profile_picture ? `http://localhost:8000/api${doctor.user.profile_picture}` : ProfileImage}
            key={doctor.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ListDoctorPage
