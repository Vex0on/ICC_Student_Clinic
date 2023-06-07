import React from "react"
import styles from "./HorizontalSpecialistButton.module.scss"

import { BsArrowRight } from "react-icons/bs"

const HorizontalSpecialistButton = ({text, imageSrc, onClick}) => {
    return(
        <div className={styles.button} onClick={onClick}>
            <div>
                <img src={imageSrc} alt="Zdjecie" className={styles.image} />
            </div>

            <div className={styles.text}>
                {text}
            </div>

            <div className={styles.icon}>
                <BsArrowRight />
            </div>
        </div>
    )
}

export default HorizontalSpecialistButton