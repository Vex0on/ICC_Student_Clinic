import React, { useState } from "react";
import styles from "./SpecialistsListPage.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import SpecializationButton from "../../components/SpecializationButton/SpecializationButton";
import { FaStethoscope } from "react-icons/fa";
import { GiStomach, GiSunglasses, GiNoseFront } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";
import jwt_decode from 'jwt-decode';


const SpecialistsListPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const userId = decoded.id;

  const handleButtonClick = (buttonText) => {
    navigate("/po-wyborze-specjalisty", { state: { buttonText } })
  };

  return (
    <div className={styles.container}>

      <ArrowNavigate linkTo={`/panel-pacjenta/${userId}`} />
      <div className={styles.headerContainer}>
        <Header1 text="Nasi specjaliści" />
      </div>

      <section className={styles.section}>
        <div className={styles.buttonContainer}>
          <SpecializationButton
            text="Internista"
            icon={FaStethoscope}
            onClick={() => handleButtonClick("Internista")}
          />
          <SpecializationButton
            text="Gastrolog"
            icon={GiStomach}
            onClick={() => handleButtonClick("Gastrolog")}
          />
        </div>
        <div className={styles.buttonContainer}>
          <SpecializationButton
            text="Okulista"
            icon={GiSunglasses}
            onClick={() => handleButtonClick("Okulista")}
          />
          <SpecializationButton
            text="Pulmonolog"
            icon={GiNoseFront}
            onClick={() => handleButtonClick("Pulmonolog")}
          />
        </div>
      </section>
    </div>
  );
};

export default SpecialistsListPage;
