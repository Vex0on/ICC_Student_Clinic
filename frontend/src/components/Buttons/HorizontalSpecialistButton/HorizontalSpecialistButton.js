import React from "react"
import styles from "./HorizontalSpecialistButton.module.scss"

import { BsArrowRight } from "react-icons/bs"

const HorizontalSpecialistButton = ({text, imageSrc, onClick, onClickLink}) => {
    return(
        <div className={styles.button}>
            <div>
                <img src={imageSrc} alt="Zdjecie" className={styles.image} />
            </div>

            <div className={styles.text}>
                <div>
                    {text}
                </div>
                
                <div  onClick={onClick}>
                    <small><u>Szczegóły</u></small>
                </div>
            </div>

            <div className={styles.icon} onClick={onClickLink}>
                <BsArrowRight />
            </div>
        </div>
    )
}

export default HorizontalSpecialistButton