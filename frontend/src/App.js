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
import MedicalRecordsPage from "./pages/MedicalRecordsPage/MedicalRecordsPage"
import ACSpecialistPage from "./pages/ACSpecialistPage/ACSpecialistPage"
import SpecialistDetailsPage from "./pages/SpecialistDetailsPage/SpecialistDetailsPage"
import DoctorCalendar from './pages/DoctorCalendar/DoctorCalendar'
import VisitCalendarPage from "./pages/VisitCalendarPage/VisitCalendarPage"
import ApprovingVisitPage from "./pages/ApprovingVisitPage/ApprovingVisitPage"
import DoctorCalendarList from "./pages/DoctorCalendarList/DoctorCalendarList"


function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/lekarze' element={<SpecialistListPage />}/>
            <Route path='/rejestracja' element={<RegisterPage />}/>
            <Route path='/regulamin' element={<TermsPage />}/>
            <Route path='/reset-hasla' element={<RemindPasswordPage />}/>
            <Route path='/panel-pacjenta/:id' element={<UserPanelPage />}/>
            <Route path='/panel-pacjenta/' element={<UserPanelPage />}/>
            <Route path='/panel-admina' element={<AdminPanelPage />}/>
            <Route path='/panel-admina/:id' element={<AdminPanelPage />}/>
            <Route path='/profil-pacjenta/:id' element={<PatientProfilePage />}/>
            <Route path='/lista-pacjentow' element={<ListPatientPage />}/>
            <Route path='/lista-lekarzy' element={<ListDoctorPage />}/>
            <Route path='/karta-pacjenta/:id' element={<PatientCardPage />}/>
            <Route path='/karta-doktora/:id' element={<DoctorCardPage />}/>
            <Route path='/dokumentacja-medyczna/:id' element={<MedicalRecordsPage />}/>
            <Route path='/po-wyborze-specjalisty' element={<ACSpecialistPage />}/>
            <Route path='/kalendarz-lekarza/:id' element={<DoctorCalendar />}/>
            <Route path='/kalendarz-lekarza-wybor' element={<DoctorCalendarList />}/>
            <Route path='/specjalista-szczegoly/:id' element={<SpecialistDetailsPage />}/>
            <Route path='/kalendarz-wizyt/:id' element={<VisitCalendarPage />}/>
            <Route path='/zatwierdzanie-wizyt' element={<ApprovingVisitPage />}/>
            <Route path='*' element={<LoginPage />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
