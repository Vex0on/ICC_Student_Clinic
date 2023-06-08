import React, { useState } from "react"
import styles from "./Calendar.module.scss"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

const Calendar = ({ data }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const nextDay = () => {
    if (currentDayIndex < data.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const prevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const day = data[currentDayIndex];

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.button} onClick={prevDay}><AiOutlineArrowLeft className={styles.icon}/></button>
        <h2 className={styles.date}>{day.date}</h2>
        <button className={styles.button} onClick={nextDay}><AiOutlineArrowRight className={styles.icon}/></button>
      </div>
      <div className={styles.body}>
        {day.appointments.map((appointment) => (
          <div key={appointment.time}>
            <p className={styles.data}>
              <div className={styles.time}>{appointment.time}</div>
              <div className={styles.person}>{appointment.person || "Brak"}</div>
              </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
