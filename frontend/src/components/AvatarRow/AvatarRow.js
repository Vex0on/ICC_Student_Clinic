import React from "react"

import styles from "./AvatarRow.module.scss"

const AvatarRow = ({ text, imageSrc }) => {
  return (
    <div className={styles.container__avatar}>
      <img src={imageSrc} alt="Zdjecie profilowe" className={styles.image} />
      <div className={styles.text}>{text}</div>
    </div>
  )
}

export default AvatarRow
