import React, { useState } from "react";
import styles from "./SpecialistsListPage.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import SpecializationButton from "../../components/SpecializationButton/SpecializationButton";
import { FaStethoscope } from "react-icons/fa";
import { GiStomach, GiSunglasses, GiNoseFront } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const SpecialistsListPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = (buttonText) => {
    navigate("/po-wyborze-specjalisty", { state: { buttonText } })
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header1 text="Nasi specjaliści" />
      </div>

      <section className={styles.section}>
        <div className={styles.buttonContainer}>
          <SpecializationButton
            text="Internista"
            icon={FaStethoscope}
            onClick={() => handleButtonClick("internista")}
          />
          <SpecializationButton
            text="Gastrolog"
            icon={GiStomach}
            onClick={() => handleButtonClick("gastrolog")}
          />
        </div>
        <div className={styles.buttonContainer}>
          <SpecializationButton
            text="Okulista"
            icon={GiSunglasses}
            onClick={() => handleButtonClick("okulista")}
          />
          <SpecializationButton
            text="Pulmonolog"
            icon={GiNoseFront}
            onClick={() => handleButtonClick("pulmonolog")}
          />
        </div>
      </section>
    </div>
  );
};

export default SpecialistsListPage;
