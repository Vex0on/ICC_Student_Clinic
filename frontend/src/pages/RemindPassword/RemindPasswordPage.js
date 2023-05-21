import React, { useState } from "react"
import PrimaryButton from "../components/Buttons/PrimaryButton/PrimaryButton"
import Header1 from "../components/Headers/Header1/Header1"
import PrimaryField from "../components/Fields/PrimaryField/PrimaryField"

import styles from "./RemindPasswordPage.module.scss"

const RemindPassowrdPage = () =>{
    const [email, setEmail] = useState('')

    const handleAlert = () =>{
        alert('wyslano')
    }

    return(
    <div className={styles.container}>
        <Header1 text="Przypomnij hasło" />

        <div className={styles.container__links}>
          <p className={styles.container__text}>
            Wpisz Email podany w czasie rejestracji na który zostanie wysłany email przypominający hasło 
          </p>
        </div>
  
        <div className={styles.container__primary__fields}>
          <PrimaryField placeholder={"Email"} value={email} setValue={setEmail}/>
        </div>
  
        <PrimaryButton text="Wyślij" onClick={handleAlert} />
    </div>
    )
}

export default RemindPassowrdPage