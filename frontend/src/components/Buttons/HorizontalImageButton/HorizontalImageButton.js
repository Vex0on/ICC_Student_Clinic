import React from "react"
import styles from "./HorizontalImageButton.module.scss"

const HorizontalImageButton = ({text, icon, imageSrc, onClick}) => {

    return(
        <div className={styles.button}>
            <div className={styles.container__image}>
                <img src={imageSrc} alt="Zdjecie" className={styles.image} />
            </div>

            <div className={styles.container__text}>
                <p className={styles.text}>
                    {text}
                </p>
                <p className={styles.icon}>
                    {icon}
                </p>
            </div>
        </div>
    )
}

export default HorizontalImageButton