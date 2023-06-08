import React, { useState } from "react"
import styles from "./ApprovingVisitPage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"

const ApprovingVisitPage = () => {
    const [visits, setVisits] = useState([
        {
            id: 1,
            date: "2023-06-07",
            time: "10:20",
            patient: "Jan Kowalski",
            doctor: "dr Janina Hask"
        },
        {
            id: 2,
            date: "2023-06-08",
            time: "9:00",
            patient: "Anna Nowak",
            doctor: "dr Janina Hask"
        },
        {
            id: 3,
            date: "2023-06-08",
            time: "9:00",
            patient: "Anna Nowak",
            doctor: "dr Janina Hask"
        },
        {
            id: 4,
            date: "2023-06-08",
            time: "9:00",
            patient: "Anna Nowak",
            doctor: "dr Janina Hask"
        },
        {
            id: 5,
            date: "2023-06-08",
            time: "9:00",
            patient: "Anna Nowak",
            doctor: "dr Janina Hask"
        }
    ])

    const handleAccept = (id) => {
        console.log(`Visit with id: ${id} was accepted`);
    }

    const handleReject = (id) => {
        console.log(`Visit with id: ${id} was rejected`);
    }

    return(
        <div className={styles.container}>
            <Header1 text={"Zatwierdzanie wizyt"} />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Godzina</th>
                        <th>Pacjent</th>
                        <th>Lekarz</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {visits.map(visit => (
                        <tr key={visit.id}>
                            <td>{visit.date}</td>
                            <td>{visit.time}</td>
                            <td>{visit.patient}</td>
                            <td>{visit.doctor}</td>
                            <td className={styles.buttonContainer}>
                                <button className={styles.accept} onClick={() => handleAccept(visit.id)}>Akceptuj</button>
                                <button className={styles.reject} onClick={() => handleReject(visit.id)}>Odrzuć</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ApprovingVisitPage
