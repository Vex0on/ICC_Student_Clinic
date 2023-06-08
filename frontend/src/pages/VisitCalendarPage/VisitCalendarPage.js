import React, { useState } from 'react'
import { addDays, format } from 'date-fns'

import Header1 from '../../components/Headers/Header1/Header1'

import styles from "./VisitCalendarPage.module.scss"
import { AiOutlineCalendar, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

const VisitCalendarPage = () => {
    const times = ["9:00", "9:40", "10:20", "11:00", "11:40", "12:20", "13:00", "13:40", "14:20", "15:00", "15:40", "16:20"]

    const [currentDate, setCurrentDate] = useState(new Date())
    const [appointments, setAppointments] = useState([
        {
            "date": "2023-06-08",
            "time": "9:00"
        },
        {
            "date": "2023-06-07",
            "time": "10:20"
        },
    ])

    const handlePrevClick = () => {
        if (format(currentDate, 'yyyy-MM-dd') !== format(new Date(), 'yyyy-MM-dd')) {
            setCurrentDate(prevDate => addDays(prevDate, -5));
        }
    }
    
    const handleNextClick = () => {
        setCurrentDate(prevDate => addDays(prevDate, 5));
    }

    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const getFiveDays = (startDate) => {
        return Array.from({length: 5}, (_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'))
    }

    const days = getFiveDays(currentDate)

    const handleCellClick = (date, time) => {
        const isBooked = appointments.some(app => app.date === date && app.time === time);
        if (!isBooked) {
            setSelectedAppointment({ date, time });
            setShowModal(true);
        }
    };

    return (
        <div className={styles.container}>
            <Header1 text={"Umów wizytę"} />

            <p className={styles.header1}>Umawiasz się do: <strong> dr Janina Hask</strong></p>

            <p className={styles.header2}><AiOutlineCalendar className={styles.icon} /> <span>Wybierz dzień i godzinę wizytę</span></p>

            <div className={styles.container__buttons}>
                <button className={styles.button} onClick={handlePrevClick}><AiOutlineArrowLeft className={styles.icon}/></button>
                <button className={styles.button} onClick={handleNextClick}><AiOutlineArrowRight className={styles.icon}/></button>
            </div>

            <table className={styles.table}>
                <thead className={styles.head}>
                    <tr>
                        {days.map(day => <th className={styles.th} key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {times.map(time => (
                        <tr key={time}>
                            {days.map(day => {
                                const isBooked = appointments.some(app => app.date === day && app.time === time);
                                return (
                                    <td key={day+time} className={`${isBooked ? styles.booked : styles.available} ${styles.td}`} onClick={() => handleCellClick(day, time)}>
                                        {time}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Potwierdź wizytę</h2>
                        <p>Czy na pewno chcesz umówić wizytę na <strong>{selectedAppointment?.date}</strong> o godzinie <strong>{selectedAppointment?.time}</strong>?</p>
                        <div className={styles.buttonsContainer}>
                            <button onClick={() => setShowModal(false)}>Nie</button>
                            <button onClick={() => {
                                console.log(`Wizyta potwierdzona na ${selectedAppointment?.date} o godzinie ${selectedAppointment?.time}`);
                                setShowModal(false);
                            }}>Tak</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitCalendarPage;
