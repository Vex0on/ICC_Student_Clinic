import React, { useState } from "react"

import styles from "./LoginPage.module.scss"

import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton"
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton"
import Header1 from "../../components/Headers/Header1/Header1"
import PrimaryField from "../../components/Fields/PrimaryField/PrimaryField"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAlert = () => {
    alert("Klik")
  }

  return (
    <div className={styles.container}>
      <Header1 text="Logowanie" />

      <div className={styles.container__primary__fields}>
        <PrimaryField placeholder={"Email"} value={email} setValue={setEmail}/>
        <PrimaryField placeholder={"Hasło"} value={password} setValue={setPassword}/>
      </div>

      <PrimaryButton text="Zaloguj" onClick={handleAlert} />

      <div className={styles.container__secondary__buttons}>
        <SecondaryButton text="Przypomnij hasło" onClick={handleAlert} />
        <SecondaryButton text="Zarejestruj się" onClick={handleAlert} />
      </div>

      <div className={styles.container__links}>
        <a className={styles.link} href="#">
          Poznaj naszą kadrę
        </a>
      </div>
    </div>
  )
}

export default LoginPage
