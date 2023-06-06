import React from "react"
import styles from "./ACSpecialistPage.module.scss"
import Header1 from "../../components/Headers/Header1/Header1"

import HorizontalSpecialistButton from "../../components/Buttons/HorizontalSpecialistButton/HorizontalSpecialistButton"

import ProfileImage from "../../utills/images/profileimage.jpeg"

const ACSpecialistPage = () => {

    return(
        <div className={styles.container}>
            <Header1 text={"Internista"} />

            <div className={styles.container__data}>
                <HorizontalSpecialistButton text={"dr Jan Kowalski" } imageSrc={ProfileImage}/>

                <HorizontalSpecialistButton text={"dr Jan Kowalski" } imageSrc={ProfileImage}/>

                <HorizontalSpecialistButton text={"dr Jan Kowalski" } imageSrc={ProfileImage}/>

                <HorizontalSpecialistButton text={"dr Jan Kowalski" } imageSrc={ProfileImage}/>
            </div>
        </div>
    )
}

export default ACSpecialistPage
