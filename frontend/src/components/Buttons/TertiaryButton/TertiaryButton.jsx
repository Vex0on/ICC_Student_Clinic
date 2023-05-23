import React from 'react'
import styles from './TertiaryButton.module.scss'

const TertiaryButton = ({ onClick, text }) => {
  return (
    <button className={styles.button__tertiary} onClick={onClick}>
      {text}
    </button>
  );
};

export default TertiaryButton;