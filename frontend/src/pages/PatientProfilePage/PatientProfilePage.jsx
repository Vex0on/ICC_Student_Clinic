import React from "react"
import styles from "./PatientProfilePage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"
import Avatar from "../../components/Avatar/Avatar"
import InformationsIcon from "../../components/Informations/InformationsIcon/InformationsIcon"

import ProfileImage from "../../utills/images/profileimage.jpeg"

import { AiOutlineHeart } from "react-icons/ai"

const PatientProfilePage = () => {

    return(
        <div className={styles.container}>
            <Header1 text={"Profil pacjenta"} />

            <div>
                <div>
                    <Avatar text={"Krzysztof Nowak"} imageSrc={ProfileImage} />
                </div>

                <div>
                    <InformationsIcon text={"00231468933"} icon={<AiOutlineHeart />} />
                </div>
            </div>

        </div>
    )
}

export default PatientProfilePage
