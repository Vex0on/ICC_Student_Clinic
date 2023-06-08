import React from "react"
import styles from "./DoctorCardPage.module.scss"

import Header1 from "../../components/Headers/Header1/Header1"
import Avatar from "../../components/Avatar/Avatar"

import ProfileImage from "../../utills/images/profileimage.jpeg"
import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate"

const DoctorCardPage = () => {

    return(
        <div className={styles.container}>
            <ArrowNavigate linkTo={"/lista-lekarzy"} />
            <Header1 text={"Karta lekarza"} />
            
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
                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>02.05.2022</td>
                                    <td className={styles.table__td}>9:45</td>
                                    <td className={styles.table__td}>Karolina Rewt</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h2>Lista Pacjentów</h2>

                        <div>
                            <table className={`${styles.body__table__medicines} ${styles.body__table}`}>
                                <tr className={styles.table__tr}>
                                    <th className={styles.table__th}>Imię i Nazwisko </th>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Kamil Kowalski</td>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Sebastian Pik</td>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Bartosz Werner</td>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Karol Lwowski</td>
                                </tr>

                                <tr className={styles.table__tr}>
                                    <td className={styles.table__td}>Jan Nowak</td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorCardPage
