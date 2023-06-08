import React from "react"
import styles from "./PatientProfilePage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"
import Avatar from "../../components/Avatar/Avatar"
import InformationsIcon from "../../components/Informations/InformationsIcon/InformationsIcon"

import ProfileImage from "../../utills/images/profileimage.jpeg"

import { AiOutlineHeart, AiOutlineCalendar } from "react-icons/ai"
import { LuMapPin } from "react-icons/lu"
import { BsTelephone } from "react-icons/bs"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"

const PatientProfilePage = () => {

    return(
        <div className={styles.container}>
            <ArrowNavigate linkTo={"/panel-pacjenta"} />
            <Header1 text={"Profil pacjenta"} />

            <div className={styles.container__data}>
                <div>
                    <Avatar text={"Krzysztof Nowak"} imageSrc={ProfileImage} />
                </div>

                <div className={styles.container__icons}>
                    <InformationsIcon text={"00231468933"} icon={<AiOutlineHeart />} />
                    <InformationsIcon text={"14.03.2000"} icon={<AiOutlineCalendar />} />
                    <InformationsIcon text={"Juliana Tuwima 26 10-088 Olsztyn"} icon={<LuMapPin />} />
                    <InformationsIcon text={"600 676 454"} icon={<BsTelephone />} />
                </div>
            </div>

        </div>
    )
}

export default PatientProfilePage
