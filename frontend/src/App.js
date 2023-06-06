import styles from "./styles/app.module.scss"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import SpecialistListPage from "./pages/SpecialistsListPage/SpecialistsListPage"
import RemindPasswordPage from "./pages/RemindPasswordPage/RemindPasswordPage"
import UserPanelPage from "./pages/UserPanelPage/UserPanelPage"
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage"
import PatientProfilePage from "./pages/PatientProfilePage/PatientProfilePage"
import ListPatientPage from "./pages/ListPatientPage/ListPatientPage"
import ListDoctorPage from "./pages/ListDoctorPage/ListDoctorPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import TermsPage from "./pages/TermsPage/TermsPage"
import PatientCardPage from "./pages/PatientCardPage/PatientCardPage"
import DoctorCardPage from "./pages/DoctorCardPage/DoctorCardPage"


function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/lekarze' element={<SpecialistListPage />}/>
            <Route path='/reset-hasla' element={<RemindPasswordPage />}/>
            <Route path='/panel-pacjenta' element={<UserPanelPage />}/>
            <Route path='/panel-admina' element={<AdminPanelPage />}/>
            <Route path='/profil-pacjenta' element={<PatientProfilePage />}/>
            <Route path='/lista-pacjentow' element={<ListPatientPage />}/>
            <Route path='/lista-lekarzy' element={<ListDoctorPage />}/>
            <Route path='/karta-pacjenta' element={<PatientCardPage />}/>
            <Route path='/karta-doktora' element={<DoctorCardPage />}/>
            <Route path='/dokumentacja-medyczna' element={<MedicalRecordsPage />}/>
            <Route path='*' element={<LoginPage />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
