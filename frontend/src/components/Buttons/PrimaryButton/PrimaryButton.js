import React from 'react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton = ({ onClick, text }) => {
  return (
    <button className={styles.button__primary} onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;