import React from "react"
import styles from "./HorizontalIconButton.module.scss"
import { Link } from "react-router-dom"

const HorizontalIconButton = ({text, icon, onClick, linkTo}) => {

    return(
        <Link to={linkTo}>
            <div className={styles.button}>
                <div className={styles.container__icon}>
                    {icon}
                </div>

                <div className={styles.container__text}>
                    <p className={styles.text}>
                        {text}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default HorizontalIconButton