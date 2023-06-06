import React from 'react'
import styles from './SecondaryButton.module.scss'

const SecondaryButton = ({ onClick, text }) => {
  return (
    <button className={styles.button__secondary} onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;