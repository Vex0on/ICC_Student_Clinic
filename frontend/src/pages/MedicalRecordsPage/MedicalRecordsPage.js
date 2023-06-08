import React from "react"
import styles from "./MedicalRecords.module.scss"
import Header1 from "../../components/Headers/Header1/Header1"

import { BiPlusMedical } from "react-icons/bi"

import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"

const MedicalRecordsPage = () => {

    return(
        <div className={styles.container}>
            <ArrowNavigate linkTo={"/panel-pacjenta"} />
            <div className={styles.container__header}>
                <BiPlusMedical className={styles.header__icon} />
                <h1 className={styles.header__text}>Dokumentacja Medyczna</h1>
            </div>

            <div className={styles.container__data__health}>
                <div>
                    <h2>Aktualny stan zdrowia</h2>
                    <textarea className={styles.input__textarea} type="textarea" />
                </div>

                <div className={styles.container__name}> 
                    <p className={styles.name}>
                        Krzysztof <br /> Nowak
                    </p>
                </div>
            </div>

            <div className={styles.container__textarea}>
                <h2>Historia choroby</h2>
                <textarea className={styles.input__textarea}/>
            </div>

            <div className={styles.container__textarea}>
                <h2>Plan leczenia</h2>
                <textarea className={styles.input__textarea} type="textarea" />
            </div>

            <div className={styles.container__footer}>
                <div className={styles.container__data}>
                    <h2>Lista badań diagnostycznych</h2>
                    <div className={styles.container__list}>
                        <p className={styles.data}>Ekg - 2022r.</p>
                        <p className={styles.data}>Morfologia - 2015r.</p>
                        <p className={styles.data}>USG jamy brzusznej - 2013r.</p>
                    </div>
                </div>

                <div className={styles.container__data}>
                    <h2>Lista lekarst</h2>
                    <div className={`${styles.container__list} ${styles.container__list__second}`}>
                        <p className={styles.data}>Iburapid 5 mg tabl.</p>
                        <p className={styles.data}>Trehanol 500 mg tabl.</p>
                        <p className={styles.data}>Acodin N 100 µg tabl.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicalRecordsPage
