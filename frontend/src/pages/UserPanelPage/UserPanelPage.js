import React from "react"
import styles from "./UserPanelPage.module.scss"

import { AiOutlineCalendar, AiOutlineCopy, AiOutlineUser } from "react-icons/ai"

import HorizontalImageButton from "../../components/Buttons/HorizontalImageButton/HorizontalImageButton"
import Header1 from "../../components/Headers/Header1/Header1"
import TertiaryButton from "../../components/Buttons/TertiaryButton/TertiaryButton"

import Handshake from "../../utills/images/handshake.jpg"
import Consultation from "../../utills/images/consultation.jpg"
import Pressure from "../../utills/images/pressure.jpg"

const UserPanelPage = () => {

    return(
        <div className={styles.container}>
            <div className={styles.container__header}>
                <Header1 text={"Imię i nazwisko"} />
            </div>

            <div className={styles.container__tiles}>
                <HorizontalImageButton text={"Zarejestruj wizytę"} icon={<AiOutlineCalendar />} imageSrc={Handshake} OnClick={null}/>
                <HorizontalImageButton text={"Dokumentacja medyczna"} icon={<AiOutlineCopy />} imageSrc={Consultation} OnClick={null}/>
                <HorizontalImageButton text={"Profil pacjenta"} icon={<AiOutlineUser />} imageSrc={Pressure} OnClick={null}/>
            </div>

            <div className={styles.container__button}>
                <TertiaryButton text={"Wyloguj się"} onClick={null} />
            </div>
        </div>
    )
}

export default UserPanelPage
