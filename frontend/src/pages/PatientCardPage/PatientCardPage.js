import React from "react"
import styles from "./PatientCardPage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"
import Avatar from "../../components/Avatar/Avatar"

import ProfileImage from "../../utills/images/profileimage.jpeg"


const PatientCardPage = () => {

    return(
        <div className={styles.container}>
            <Header1 text={"Karta pacjenta"} />
            
            <div className={styles.container__data}>
                <div className={styles.container__data__header}>
                    <div className={styles.data}>
                        <h2>Dane osobowe</h2>

                        <div>
                            <p>arkadiuszwąski</p>
                            <p>arekwąski@gmail.com</p>
                            <p>724 876 402</p>
                        </div>
                    </div>

                    <div>
                        <Avatar text={""} imageSrc={ProfileImage} />
                    </div>
                </div>

                <div className={styles.container__data__body}>
                    <div>
                        <h2>Lista wizyt</h2>

                        <div>
                            <table>
                                <tr>
                                    <th>Data</th>
                                    <th>Godz.</th>
                                    <th>Imię i Nazwisko</th>
                                </tr>

                                <tr>
                                    <td>02.05.2022</td>
                                    <td>9:45</td>
                                    <td>Karolina Rewt</td>
                                </tr>

                                <tr>
                                    <td>02.05.2022</td>
                                    <td>9:45</td>
                                    <td>Karolina Rewt</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h2>Lista leków</h2>

                        <div>
                            <table>
                                <tr>
                                    <td>Acodin</td>
                                </tr>

                                <tr>
                                    <td>Iburapid</td>
                                </tr>

                                <tr>
                                    <td>Trehanol</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div className={styles.container__data__footer}>
                    <h2>Zalecenia</h2>

                    <div>
                        <p>
                            Aktywność fizyczna 3 razy w tygodniu
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientCardPage
