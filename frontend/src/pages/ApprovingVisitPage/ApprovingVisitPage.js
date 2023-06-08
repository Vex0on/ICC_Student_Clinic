import React, { useState, useEffect } from "react"
import styles from "./ApprovingVisitPage.module.scss"
import axios from "axios"

import Header1 from "../../components/Headers/Header1/Header1"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"

const ApprovingVisitPage = () => {
    const [visits, setVisits] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/visits/')
            .then(res => {
                const visitsData = res.data
                    .filter(visit => !visit.is_active)
                    .map(visit => ({
                        id: visit.id,
                        date: visit.date,
                        time: visit.time.split(':')[0] + ':' + visit.time.split(':')[1],
                        patient: `${visit.student.first_name} ${visit.student.last_name}`,
                        doctor: `dr ${visit.doctor.first_name} ${visit.doctor.last_name}`
                    }));

                setVisits(visitsData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleAccept = (id) => {
        axios.post(`http://127.0.0.1:8000/api/approve-visit/${id}/`)
            .then(res => {
                setVisits(visits.filter(visit => visit.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleReject = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/reject-visit/${id}/`)
            .then(res => {
                setVisits(visits.filter(visit => visit.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    return(
        <div className={styles.container}>
            <ArrowNavigate linkTo={"/panel-admina"} />
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
 