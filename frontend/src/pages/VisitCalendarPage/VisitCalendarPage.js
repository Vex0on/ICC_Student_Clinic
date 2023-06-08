import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useParams } from 'react-router-dom'
import { addDays, format } from 'date-fns'

import Header1 from '../../components/Headers/Header1/Header1'
import ArrowNavigate from '../../components/ArrowNavigate/ArrowNavigate'

import styles from "./VisitCalendarPage.module.scss"
import { AiOutlineCalendar, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

const VisitCalendarPage = () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    const { id: doctorId } = useParams();

    const times = ["09:00", "09:40", "10:20", "11:00", "11:40", "12:20", "13:00", "13:40", "14:20", "15:00", "15:40", "16:20"]
    const [doctor, setDoctor] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date())
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/visits/')
            .then(response => {
                const doctorAppointments = response.data.filter(visit => visit.doctor.id == doctorId).map(visit => ({
                    date: visit.date,
                    time: visit.time.split(":")[0] + ":" + visit.time.split(":")[1], 
                }));

                setAppointments(doctorAppointments);
                console.log(doctorAppointments);
            })
            .catch(err => {
                console.error('Error fetching visits', err);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/doctors/`)
            .then(response => {
                const foundDoctor = response.data.find(doc => doc.id === parseInt(doctorId));
                setDoctor(foundDoctor);
            })
            .catch(err => {
                console.error('Error fetching doctor', err);
            });
    }, [doctorId]);

    const confirmAppointment = () => {
        const appointmentData = {
            student: userId,
            doctor: doctorId,
            date: selectedAppointment?.date,
            time: selectedAppointment?.time,
        };
    
        axios.post('http://127.0.0.1:8000/api/book-visit/', appointmentData)
            .then(response => {
                console.log(`Wizyta potwierdzona na ${selectedAppointment?.date} o godzinie ${selectedAppointment?.time}`);
                setAppointments(prevAppointments => [...prevAppointments, selectedAppointment]); // dodaj nową wizytę do stanu
                setShowModal(false);
            })
            .catch(err => {
                console.error('Error booking visit', err);
            });
    }
    

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
    
        const now = new Date();
        const selectedDate = new Date(date + 'T' + time + ':00');
    
        if (!isBooked && selectedDate > now) {
            setSelectedAppointment({ date, time });
            setShowModal(true);
        }
    };

    return (
        <div className={styles.container}>
            <ArrowNavigate linkTo={"/panel-pacjenta"} />
            <Header1 text={"Umów wizytę"} />

            {doctor && <p className={styles.header1}>Umawiasz się do: <strong> dr {doctor.first_name} {doctor.last_name}</strong></p>}


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
                                const isPast = new Date(day + 'T' + time + ':00') < new Date();
                                return (
                                    <td 
                                        key={day+time} 
                                        className={`${(isBooked || isPast) ? styles.booked : styles.available} ${styles.td}`} 
                                        onClick={() => !isPast && handleCellClick(day, time)}
                                    >
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
                            <button onClick={confirmAppointment}>Tak</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitCalendarPage;
