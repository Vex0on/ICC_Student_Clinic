import React, { useEffect, useState } from "react"
import styles from "./ACSpecialistPage.module.scss"
import Header1 from "../../components/Headers/Header1/Header1"

import HorizontalSpecialistButton from "../../components/Buttons/HorizontalSpecialistButton/HorizontalSpecialistButton"

import ProfileImage from "../../utills/images/Avatar.jpg"

import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"

const ACSpecialistPage = () => {

    const location = useLocation();
    const buttonText = location?.state?.buttonText;
    const navigate = useNavigate();

    const [specialistData, setSpecialistData] = useState([])

    useEffect(() => {
        fetchSpecialistData();
    }, [])

    const handleSpecialistClick = (id) => {
        navigate(`/specjalista-szczegoly/${id}`);
      };

    const fetchSpecialistData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/doctors/${buttonText}/`);
            setSpecialistData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych: ", error);
        }
    };

    return(
        <div className={styles.container}>
            <Header1 text={buttonText} />

            <div className={styles.container__data}>
                {specialistData.map((specialist) => (
                    <HorizontalSpecialistButton
                        key={specialist.id}
                        text={`Dr. ${specialist.first_name} ${specialist.last_name}`}
                        imageSrc={specialist.user?.profile_picture ? `http://localhost:8000/api/${specialist.user.profile_picture}` : ProfileImage}
                        onClick={() => handleSpecialistClick(specialist.id)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default ACSpecialistPage
