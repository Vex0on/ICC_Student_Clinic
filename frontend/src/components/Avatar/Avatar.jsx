import React from "react"

import styles from "./Avatar.module.scss"

const Avatar = ({ text, imageSrc }) => {
  return (
    <div className={styles.container__avatar}>
      <img src={imageSrc} alt="Zdjecie profilowe" className={styles.image} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default Avatar
