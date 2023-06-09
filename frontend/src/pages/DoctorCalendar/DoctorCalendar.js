import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./DoctorCalendar.module.scss"

import Calendar from "../../components/Calendar/Calendar"
import Header1 from "../../components/Headers/Header1/Header1"
import { AiOutlinePrinter } from "react-icons/ai"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"

const DoctorCardPage = () => {
  
  const { id } = useParams(); 
  const [doctorData, setDoctorData] = useState(null); 

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/visits/doctor/${id}/`)
      .then(response => {
        const processedData = processResponseData(response.data.data); 
        setDoctorData(processedData);
      })
      .catch(err => {
        console.error('Error fetching doctor data', err);
      });
  }, [id]);

  const handlePrint = () => {
    if (doctorData) {
      axios.get(`http://127.0.0.1:8000/api/visits/doctor/${id}/export-csv/`, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'visits.csv');
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          console.error('Error fetching CSV data', err);
        });
      }
    };

  function processResponseData(data) {
    const visitsByDate = data.reduce((acc, visit) => {
      const time = visit.time.slice(0, 5);

      if (!acc[visit.date]) {
        acc[visit.date] = [{
          time,
          person: `${visit.student.first_name} ${visit.student.last_name}`
        }];
      } else {
        acc[visit.date].push({
          time,
          person: `${visit.student.first_name} ${visit.student.last_name}`
        });
      }

      return acc;
    }, {});

    const processedData = Object.entries(visitsByDate).map(([date, appointments]) => ({ date, appointments }));

    return {
      doctor: {
        name: `dr ${data[0].doctor.first_name} ${data[0].doctor.last_name}`
      },
      visits: processedData
    };
  }

  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={"/panel-admina"} />
      <Header1 text={"Kalendarz wizyt"} />
      
      {doctorData && <p className={styles.name}>{doctorData.doctor.name}</p>}
      
      {doctorData && <Calendar data={doctorData.visits} />}

      <AiOutlinePrinter className={styles.icon} onClick={handlePrint} />
    </div>
  );
}

export default DoctorCardPage;