import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss"
import axios from "axios";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton"
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton"
import Header1 from "../../components/Headers/Header1/Header1"
import PrimaryField from "../../components/Fields/PrimaryField/PrimaryField"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [informationLogin, setInformationLogin] = useState('')

  const navigate = useNavigate()

  const setAuthToken = (token) => {
      if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      else
          delete axios.defaults.headers.common["Authorization"]
   }

  const submitLogin = (e) => {
      e.preventDefault()
      if(email !== "" || password !== ""){
          axios.post('http://127.0.0.1:8000/api/login', { email, password }, { withCredentials: true })
              .then(response => {
                  const token  =  response.data.access
                  console.log(response)
                  localStorage.setItem("token", token)
              
                  setAuthToken(token)

                  navigate('/')
              })
              .catch(err => {
                  setInformationLogin('Nieprawidłowe dane logowania')
              })
      }
      else {
          setInformationLogin('Pola muszą być wypełnione')
      }
  }

  return (
    <div className={styles.container}>
      <Header1 text={"Logowanie"} />

      <div className={styles.container__primary__fields}>
        <PrimaryField placeholder={"Email"} value={email} setValue={setEmail}/>
        <PrimaryField placeholder={"Hasło"} value={password} type="password" setValue={setPassword}/>
      </div>

      <PrimaryButton text="Zaloguj" onClick={submitLogin}/>

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
