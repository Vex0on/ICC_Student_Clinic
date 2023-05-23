import React from "react";
import styles from "./SpecializationButton.module.scss";

const SpecializationButton = ({ text, icon: Icon, onClick }) => {
  const handleClick = () => {
    onClick(text);
  };

  return (
    <div className={styles.button} onClick={handleClick}>
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default SpecializationButton;
