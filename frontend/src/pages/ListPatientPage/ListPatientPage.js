import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "./ListPatientPage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"
import { Link } from "react-router-dom"
import ProfileImage from "../../utills/images/Avatar.jpg"
import AvatarRow from "../../components/AvatarRow/AvatarRow"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"


const ListPatientPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/")
      .then(response => {
        setPatients(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={"/panel-admina"} />
      <Header1 text={"Lista pacjentow"} />
      <div className={styles.container__data}>
        {patients.map(patient => (
          <Link to={`/karta-pacjenta/${patient.id}`}>
          <AvatarRow
            text={`${patient.first_name} ${patient.last_name}`}
            imageSrc={patient.user.profile_picture ? `http://localhost:8000/api${patient.user.profile_picture}` : ProfileImage}
            key={patient.id}
          />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListPatientPage
