import React from "react"
import styles from "./AdminPanelPage.module.scss"

import { AiOutlineTeam , AiOutlineCalendar, AiOutlineCopy, AiOutlineCheck } from "react-icons/ai"

import HorizontalIconButton from "../../components/Buttons/HorizontalIconButton/HorizontalIconButton"
import Header1 from "../../components/Headers/Header1/Header1"
import TertiaryButton from "../../components/Buttons/TertiaryButton/TertiaryButton"

const AdminPanelPage = () => {

    return(
        <div className={styles.container}>
            <div className={styles.container__header}>
                <Header1 text={"Panel admina"} />
            </div>

            <div className={styles.container__tiles}>
                <HorizontalIconButton text={"Kalendarz wizyt"} icon={<AiOutlineCalendar />} linkTo={"/kalendarz-lekarza"} OnClick={null}/>
                <HorizontalIconButton text={"Lista lekarzy"} icon={<AiOutlineTeam/>} linkTo={"/lista-lekarzy"} OnClick={null}/>
                <HorizontalIconButton text={"Lista pacjentów"} icon={<AiOutlineCopy />} linkTo={"/lista-pacjentow"} OnClick={null}/>
                <HorizontalIconButton text={"Zatwierdzanie wizyt"} icon={<AiOutlineCheck />} linkTo={"/zatwierdzanie-wizyt"} OnClick={null}/>
            </div>

            <div className={styles.container__button}>
                <TertiaryButton text={"Wyloguj się"} onClick={null} />
            </div>
        </div>
    )
}

export default AdminPanelPage
