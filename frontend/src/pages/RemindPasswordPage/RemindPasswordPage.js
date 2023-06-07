import React, { useState } from "react"
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton"
import Header1 from "../../components/Headers/Header1/Header1"
import PrimaryField from "../../components/Fields/PrimaryField/PrimaryField"

import styles from "./RemindPasswordPage.module.scss"
import axios from "axios"

const RemindPasswordPage = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("email", email)

    axios
      .post("http://localhost:8000/auth/users/reset_password/", { email })
      .then((response) => {
        if (response.status === 204) {
          alert("Email z przypomnieniem hasła został wysłany")
        } else {
          alert("Wystąpił błąd")
        }
      })
      .catch((error) => {
        console.log("Not working", error)
      })
  }

  return (
    <div className={styles.container}>
      <Header1 text="Przypomnij hasło" />

      <div className={styles.container__links}>
        <p className={styles.container__text}>
          Wpisz Email podany w czasie rejestracji, na który zostanie wysłany email przypominający hasło
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.container__primary__fields}>
          <PrimaryField placeholder={"Email"} value={email} setValue={setEmail} />
        </div>

        <PrimaryButton text="Wyślij" type="submit" />
      </form>
    </div>
  )
}

export default RemindPasswordPage
