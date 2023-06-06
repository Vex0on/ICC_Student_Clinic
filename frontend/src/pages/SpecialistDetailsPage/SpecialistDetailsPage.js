import React from "react"
import styles from "./SpecialistDetailsPage.module.scss"
import Header1 from "../../components/Headers/Header1/Header1"

import ProfileImage from "../../utills/images/profileimage.jpeg"

const SpecialistDetailsPage = () => {
    return(
        <div className={styles.container}>
            <Header1 text={"Internista"} />

            <div className={styles.container__main}>
                <div className={styles.container__header}>
                    <img src={ProfileImage} alt="Zdjecie" className={styles.image} />
                    <p className={styles.name}>dr Jan Olecki</p>
                </div>

                <div className={styles.container__footer}>
                    <p className={styles.text}>
                        <strong>Doświadczenie:</strong> 18 lat <br />
                        <strong>Dodatkowe specjalizacje:</strong> <br />
                        -Urolog
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SpecialistDetailsPage