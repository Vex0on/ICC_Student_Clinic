import React from "react"
import styles from "./DoctorCalendar.module.scss"

import Calendar from "../../components/Calendar/Calendar"
import Header1 from "../../components/Headers/Header1/Header1"
import { AiOutlinePrinter } from "react-icons/ai"

const DoctorCardPage = () => {
  const data = [
    {
      doctor: {
        name: "dr Jan Nowak"
      },
      visits: [
        {
          "date": "2023-06-10",
          "appointments": [
            { "time": "09:00", "person": "Jan Kowalski" },
            { "time": "09:40", "person": "Anna Nowak" },
            { "time": "11:00", "person": "Piotr Nowak" },
            { "time": "12:20", "person": "Maria Kowalska" },
            { "time": "14:20", "person": "Krzysztof Kowalski" },
            { "time": "15:40", "person": "Anna Zielińska" },
          ]
        },
        {
          "date": "2023-07-10",
          "appointments": [
            { "time": "09:00", "person": "Jan Kowalski" },
            { "time": "09:40", "person": "Karol" },
            { "time": "11:00", "person": "Król" },
            { "time": "11:40", "person": "Karolina" },
            { "time": "12:20", "person": "Maria Kowalska" },
            { "time": "14:20", "person": "Krzysztof Kowalski" },
            { "time": "15:40", "person": "Anna Zielińska" },
          ]
        }
      ]
    }
  ];

  return(
    <div className={styles.container}>
      <Header1 text={"Kalendarz wizyt"} />
      <p className={styles.name}>dr Alan Popowicz</p>
      <Calendar data={data[0].visits} />
      <AiOutlinePrinter className={styles.icon}/>
    </div>
  )
}

export default DoctorCardPage;
