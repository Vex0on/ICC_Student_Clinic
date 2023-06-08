import React from "react"

import styles from "./InformationsIcon.module.scss"

const InformationsIcon = ({ text, icon }) => {
  return (
    <div className={styles.container__informations}>
        <div className={styles.icon}>
            {icon}
        </div>
        
        <div className={styles.text}>
            {text}
        </div>
    </div>
  )
}

export default InformationsIcon
