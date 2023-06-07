import React, { useState } from "react"
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss"

import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton"
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton"
import Header1 from "../../components/Headers/Header1/Header1"
import PrimaryField from "../../components/Fields/PrimaryField/PrimaryField"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.container}>
      <Header1 text={"Logowanie"} />

      <div className={styles.container__primary__fields}>
        <PrimaryField placeholder={"Email"} value={email} setValue={setEmail}/>
        <PrimaryField placeholder={"Hasło"} value={password} setValue={setPassword}/>
      </div>

      <PrimaryButton text="Zaloguj"/>

      <div className={styles.container__secondary__buttons}>
        <Link to="/reset-hasla">
          <SecondaryButton text={"Przypomnij hasło"}/>
        </Link>
        <Link to="/rejestracja">
          <SecondaryButton text={"Zarejestruj się"}/>
        </Link>
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
