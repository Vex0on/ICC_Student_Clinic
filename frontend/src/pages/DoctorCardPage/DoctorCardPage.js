import React, { useState, useEffect } from "react";
import styles from "./DoctorCardPage.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import Avatar from "../../components/Avatar/Avatar";
import { useParams } from "react-router";
import axios from "axios";
import ProfileImage from "../../utills/images/Avatar.jpg";
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";

const DoctorCardPage = () => {
  const { id } = useParams();

  const [doctorCardData, setDoctorCardData] = useState({
    doctor: {
      first_name: "",
      last_name: "",
      phone_number: "",
      user: { email: "" },
    },
    visits: [],
  });

  useEffect(() => {
    fetchDoctorCardData(id);
  }, []);

  const fetchDoctorCardData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/doctor-card/${id}/`
      );
      setDoctorCardData(response.data);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych: ", error);
    }
  };

  const uniquePatientNames = Array.from(
    new Set(
      doctorCardData.visits.map(
        (visit) => `${visit.student.first_name} ${visit.student.last_name}`
      )
    )
  );

  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={"/lista-lekarzy"} />
      <Header1 text={"Karta lekarza"} />

      <div className={styles.container__data}>
        <div className={styles.container__data__header}>
          <div className={styles.data}>
            <h2>Dane osobowe</h2>

            <div>
              <p>{`${doctorCardData.doctor.first_name} ${doctorCardData.doctor.last_name}`}</p>
              <p>{doctorCardData.doctor.user.email}</p>
              <p>{doctorCardData.doctor.phone_number}</p>
            </div>
          </div>

          <div className={styles.avatar}>
            <Avatar
              text={""}
              imageSrc={
                doctorCardData.doctor.user.profile_picture
                  ? `http://localhost:8000/api/${doctorCardData.doctor.user.profile_picture}`
                  : ProfileImage
              }
            />
          </div>
        </div>

        <div className={styles.container__data__body}>
          <div>
          <h2 className={styles.visitsTable}>Lista Wizyt</h2>

            <div className={styles.visitsTable}>
            <table className={styles.body__table}>
                <tr className={styles.table__tr}>
                <th className={styles.table__th}>Data</th>
                <th className={styles.table__th}>Godz.</th>
                <th className={styles.table__th}>Imię i Nazwisko</th>
                </tr>

                {doctorCardData.visits.map((visit) => (
                <tr key={visit.id} className={styles.table__tr}>
                    <td className={styles.table__td}>{visit.date}</td>
                    <td className={styles.table__td}>
                    {visit.time.split(":")[0] + ":" + visit.time.split(":")[1]}
                    </td>
                    <td className={styles.table__td}>
                    {visit.student.first_name} {visit.student.last_name}
                    </td>
                </tr>
                ))}
            </table>
            </div>

          </div>

          <div>
             <h2 className={styles.patientsTable}>Lista Pacjentów</h2>

            <div className={styles.patientsTable}>
              <table
                className={`${styles.body__table__medicines} ${styles.body__table}`}
              >
                <tr className={styles.table__tr}>
                  <th className={styles.table__th}>Imię i Nazwisko</th>
                </tr>

                {uniquePatientNames.map((name) => (
                  <tr key={name} className={styles.table__tr}>
                    <td className={styles.table__td}>{name}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCardPage;
