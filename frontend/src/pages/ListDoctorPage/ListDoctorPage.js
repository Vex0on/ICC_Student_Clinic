import React, { useState } from "react"

import styles from "./ListDoctorPage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"

import ProfileImage from "../../utills/images/profileimage.jpeg"
import AvatarRow from "../../components/AvatarRow/AvatarRow"

const patients = [
  { name: "Krzysztof Nowak", avatar: ProfileImage },
  { name: "Jan Kowalski", avatar: ProfileImage },
  { name: "Anna Zielinska", avatar: ProfileImage },
  { name: "Tomasz Dąbrowski", avatar: ProfileImage },
  { name: "Joanna Nowak", avatar: ProfileImage },
  { name: "Piotr Wójcik", avatar: ProfileImage },
  { name: "Krzysztof Nowak", avatar: ProfileImage },
  { name: "Jan Kowalski", avatar: ProfileImage },
  { name: "Anna Zielinska", avatar: ProfileImage },
  { name: "Tomasz Dąbrowski", avatar: ProfileImage },
  { name: "Joanna Nowak", avatar: ProfileImage },
  { name: "Krzysztof Nowak", avatar: ProfileImage },
  { name: "Jan Kowalski", avatar: ProfileImage },
  { name: "Anna Zielinska", avatar: ProfileImage },
  { name: "Tomasz Dąbrowski", avatar: ProfileImage },
  { name: "Joanna Nowak", avatar: ProfileImage },
]

const ListDoctorPage = () => {
  return (
    <div className={styles.container}>
        <Header1 text={"Lista lekarzy"} />
        <div className={styles.container__data}>
          {patients.map(patient => (
            <AvatarRow text={patient.name} imageSrc={patient.avatar} key={patient.name} />
          ))}
        </div>
    </div>
  )
}

export default ListDoctorPage
