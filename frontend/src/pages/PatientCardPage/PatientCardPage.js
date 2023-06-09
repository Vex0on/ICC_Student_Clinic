import React, { useEffect, useState } from "react";
import styles from "./PatientCardPage.module.scss";
import Header1 from "../../components/Headers/Header1/Header1";
import Avatar from "../../components/Avatar/Avatar";
import ProfileImage from "../../utills/images/Avatar.jpg";
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TertiaryButton from "../../components/Buttons/TertiaryButton/TertiaryButton";

const PatientCardPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [patientCardData, setPatientCardData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    user: [],
    visits: [],
    visit_info: [],
  });

  const [editingMedications, setEditingMedications] = useState(false);
  const [editingRecommendations, setEditingRecommendations] = useState(false);
  const [newMedications, setNewMedications] = useState("");
  const [newRecommendations, setNewRecommendations] = useState("");
  const [originalMedications, setOriginalMedications] = useState("");
  const [originalRecommendations, setOriginalRecommendations] = useState("");

  useEffect(() => {
    fetchPatientCardData(id);
  }, []);

  const fetchPatientCardData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/patient-card/${id}/`
      );
      console.log(response.data)
      setPatientCardData(response.data);
      setOriginalMedications(response.data.visit_info.medications);
      setOriginalRecommendations(response.data.visit_info.recommendations);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych: ", error);
    }
  };

  const handleMedicationsEdit = () => {
    setNewMedications(patientCardData.visit_info.medications);
    setEditingMedications(true);
  };

  const handleRecommendationsEdit = () => {
    setNewRecommendations(patientCardData.visit_info.recommendations);
    setEditingRecommendations(true);
  };

  const handleCancelEdit = () => {
    setEditingMedications(false);
    setEditingRecommendations(false);
    setNewMedications(originalMedications);
    setNewRecommendations(originalRecommendations);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/visit-info/${patientCardData.visit_info.id}/`,
        {
          medications: newMedications,
          recommendations: newRecommendations,
        }
      );
      setPatientCardData((prevState) => ({
        ...prevState,
        visit_info: response.data,
      }));
      setOriginalMedications(response.data.medications);
      setOriginalRecommendations(response.data.recommendations);
      setEditingMedications(false);
      setEditingRecommendations(false);
    } catch (error) {
      console.error("Wystąpił błąd podczas zapisywania zmian: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={"/panel-pacjenta"} />
      <Header1 text={"Karta pacjenta"} />

      <div className={styles.container__data}>
        <div className={styles.container__data__header}>
          <div className={styles.data}>
            <h2>Dane osobowe</h2>

            <div>
              <p>
                {`${patientCardData.first_name} ${patientCardData.last_name}`}
              </p>
              <p>{patientCardData.user?.email}</p>
              <p>{patientCardData.phone_number}</p>
            </div>
          </div>

          <div className={styles.avatar}>
            <Avatar
              text={""}
              imageSrc={
                patientCardData.user?.profile_picture
                  ? `http://localhost:8000/api/${patientCardData.user.profile_picture}`
                  : ProfileImage
              }
            />
          </div>
        </div>

        <div className={styles.container__data__body}>
          <div>
            <h2>Lista wizyt</h2>

            <div>
              <table className={styles.body__table}>
                <thead>
                  <tr className={styles.table__tr}>
                    <th className={styles.table__th}>Data</th>
                    <th className={styles.table__th}>Godz.</th>
                    <th className={styles.table__th}>Imię i Nazwisko</th>
                  </tr>
                </thead>
                <tbody>
                  {patientCardData.visits.map((visit, index) => (
                    <tr key={index} className={styles.table__tr}>
                      <td className={styles.table__td}>{visit.date}</td>
                      <td className={styles.table__td}>
                        {visit.time.split(":")[0] +
                          ":" +
                          visit.time.split(":")[1]}
                      </td>
                      <td className={styles.table__td}>
                        {visit.doctor.first_name} {visit.doctor.last_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2>Lista leków</h2>

            <div>
              {editingMedications ? (
                <div>
                  <input
                    type="text"
                    value={newMedications}
                    onChange={(e) => setNewMedications(e.target.value)}
                  />
                  <button onClick={handleSaveChanges}>Zapisz</button>
                  <button onClick={handleCancelEdit}>Anuluj</button>
                </div>
              ) : (
                <table
                  className={`${styles.body__table__medicines} ${styles.body__table}`}
                >
                  <thead>
                    <tr className={styles.table__tr}>
                      <th className={styles.table__th}>Nazwa </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.table__tr}>
                      <td className={styles.table__td}>
                        {patientCardData.visit_info.medications}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {!editingMedications && (
                <button onClick={handleMedicationsEdit}>Edytuj</button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.container__data__footer}>
          <h2>Zalecenia</h2>

          <div className={styles.footer__data}>
            {editingRecommendations ? (
              <div>
                <input
                  type="text"
                  value={newRecommendations}
                  onChange={(e) => setNewRecommendations(e.target.value)}
                />
                <button onClick={handleSaveChanges}>Zapisz</button>
                <button onClick={handleCancelEdit}>Anuluj</button>
              </div>
            ) : (
              <p>{patientCardData.visit_info.recommendations}</p>
            )}
            {!editingRecommendations && (
              <button onClick={handleRecommendationsEdit}>Edytuj</button>
            )}
          </div>
        </div>
      </div>
      <div>
              <TertiaryButton text="Dokumentacja medyczna" onClick={() => navigate(`/dokumentacja-medyczna/${id}`)} />
            </div>
    </div>
  );
};

export default PatientCardPage;