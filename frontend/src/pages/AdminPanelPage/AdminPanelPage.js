import React from "react"
import styles from "./AdminPanelPage.module.scss"

import { AiOutlineTeam , AiOutlineCalendar, AiOutlineCopy } from "react-icons/ai"

import HorizontalIconButton from "../../components/Buttons/HorizontalIconButton copy/HorizontalIconButton"
import Header1 from "../../components/Headers/Header1/Header1"
import TertiaryButton from "../../components/Buttons/TertiaryButton/TertiaryButton"

const AdminPanelPage = () => {

    return(
        <div className={styles.container}>
            <div className={styles.container__header}>
                <Header1 text={"Panel admina"} />
            </div>

            <div className={styles.container__tiles}>
                <HorizontalIconButton text={"Kalendarz wizyt"} icon={<AiOutlineCalendar />} OnClick={null}/>
                <HorizontalIconButton text={"Lista lekarzy"} icon={<AiOutlineTeam/>} OnClick={null}/>
                <HorizontalIconButton text={"Lista pacjentów"} icon={<AiOutlineCopy />} OnClick={null}/>
            </div>

            <div className={styles.container__button}>
                <TertiaryButton text={"Wyloguj się"} onClick={null} />
            </div>
        </div>
    )
}

export default AdminPanelPage
