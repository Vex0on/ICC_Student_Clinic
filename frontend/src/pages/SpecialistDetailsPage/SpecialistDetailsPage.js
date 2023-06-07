import React, { useEffect, useState } from "react"
import styles from "./SpecialistDetailsPage.module.scss"
import Header1 from "../../components/Headers/Header1/Header1"

import ProfileImage from "../../utills/images/Avatar.jpg"

import axios from "axios";

const SpecialistDetailsPage = ({doctor_id = 2}) => {

    const [specialistData, setSpecialistData] = useState({
        specialization: "",
        first_name: "",
        last_name: "",
        years_of_experience: "",
        oder_specializations: "",
        user: [],
    })

    useEffect(() => {
        fetchSpecialistData();
    }, [])

    const fetchSpecialistData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/doctors/${doctor_id}/`);
            setSpecialistData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych: ", error);
        }
    };

    return(
        <div className={styles.container}>
            <Header1 text={specialistData.specialization} />

            <div className={styles.container__main}>
                <div className={styles.container__header}>
                    <img src={specialistData.user.profile_picture ? `http://localhost:8000/api/${specialistData.user.profile_picture}` : ProfileImage} alt="Zdjecie" className={styles.image} />
                    <p className={styles.name}>dr {specialistData.first_name} {specialistData.last_name}</p>
                </div>

                <div className={styles.container__footer}>
                    <p className={styles.text}>
                        <strong>Doświadczenie:</strong> {specialistData.years_of_experience} lat <br />
                        <strong>Dodatkowe specjalizacje:</strong> <br />
                        {specialistData.oder_specializations ? specialistData.oder_specializations : "Brak"}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SpecialistDetailsPage