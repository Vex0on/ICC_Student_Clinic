import React, { useState } from "react";
import styles from "./SpecialistsList.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import SpecializationButton from "../../components/SpecializationButton/SpecializationButton";
import { FaStethoscope } from "react-icons/fa";
import { GiStomach, GiSunglasses, GiNoseFront } from "react-icons/gi";

const SpecialistsList = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonText) => {
    setClickedButton(buttonText);
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
            onClick={handleButtonClick}
          />
          <SpecializationButton
            text="Gastrolog"
            icon={GiStomach}
            onClick={handleButtonClick}
          />
        </div>
        <div className={styles.buttonContainer}>
          <SpecializationButton
            text="Okulista"
            icon={GiSunglasses}
            onClick={handleButtonClick}
          />
          <SpecializationButton
            text="Pulmonolog"
            icon={GiNoseFront}
            onClick={handleButtonClick}
          />
        </div>
      </section>

      {clickedButton && (
        <p className={styles.notification}>
          Kliknąłeś buttona "{clickedButton}", brawo!
        </p>
      )}
    </div>
  );
};

export default SpecialistsList;
