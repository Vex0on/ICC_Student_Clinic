import React from "react"
import styles from "./HorizontalIconButton.module.scss"

const HorizontalIconButton = ({text, icon, onClick}) => {

    return(
        <div className={styles.button} onClick={onClick}>
            <div className={styles.container__icon}>
                {icon}
            </div>

            <div className={styles.container__text}>
                <p className={styles.text}>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default HorizontalIconButton