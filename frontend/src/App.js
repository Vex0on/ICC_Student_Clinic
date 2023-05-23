import styles from "./styles/app.module.scss"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import SpecialistListPage from "./pages/SpecialistsListPage/SpecialistsListPage"
import RemindPasswordPage from "./pages/RemindPasswordPage/RemindPasswordPage"
import UserPanelPage from "./pages/UserPanelPage/UserPanelPage"



function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/lekarze' element={<SpecialistListPage />}/>
            <Route path='/reset-hasla' element={<RemindPasswordPage />}/>
            <Route path='/panel-pacjenta' element={<UserPanelPage />}/>
            <Route path='*' element={<LoginPage />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
