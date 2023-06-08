import React from "react"
import styles from "./PatientCardPage.module.scss"
import Header1 from "../../components/Headers/Header1/Header1"
import Avatar from "../../components/Avatar/Avatar"
import { useParams } from "react-router-dom"
import ProfileImage from "../../utills/images/profileimage.jpeg"
import { Link } from "react-router-dom"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"

const PatientCardPage = () => {

    const {id} = useParams();

    return(
        <div className={styles.container}>
            <ArrowNavigate linkTo={"/lista-pacjentow"} />
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

                    <div className={styles.avatar}>
                        <Avatar text={""} imageSrc={ProfileImage} />
                    </div>
                </div>

                <div className={styles.container__data__body}>
                    <div>
                        <h2>Lista wizyt</h2>

                        <div>
                            <table className={styles.body__table}>
                                <tr className={styles.table__tr}>
                                    <th className={styles.table__th}>Data</th>
                                    <th className={styles.table__th}>Godz.</th>
                                    <th className={styles.table__th}>Imię i Nazwisko</th>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>02.05.2022</td>
                                    <td className={styles.table__td}>9:45</td>
                                    <td className={styles.table__td}>Karolina Rewt</td>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>02.05.2022</td>
                                    <td className={styles.table__td}>9:45</td>
                                    <td className={styles.table__td}>Karolina Rewt</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h2>Lista leków</h2>

                        <div>
                            <table className={`${styles.body__table__medicines} ${styles.body__table}`}>
                                <tr className={styles.table__tr}>
                                    <th className={styles.table__th}>Nazwa </th>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Acodin</td>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Iburapid</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>

                <div className={styles.container__data__footer}>
                    <h2>Zalecenia</h2>

                    <div className={styles.footer__data}>
                        <p>
                            Aktywność fizyczna 3 razy w tygodniu
                        </p>
                    </div>
                </div>

                <Link to={`/dokumentacja-medyczna/${id}`}>
                    <h3>Dokumentacja medyczna</h3>
                </Link>
            </div>
        </div>
    )
}

export default PatientCardPage
