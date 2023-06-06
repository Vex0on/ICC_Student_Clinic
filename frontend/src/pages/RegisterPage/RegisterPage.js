import React, { useState } from "react"

import styles from "./RegisterPage.module.scss";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Header1 from "../../components/Headers/Header1/Header1";
import Header2 from "../../components/Headers/Header2/Header2";
import PrimaryField from "../../components/Fields/PrimaryField/PrimaryField";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import TermsAgreement from "../../components/TermsAgreement/TermsAgreement";


const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [password, setPassword] = useState('');
    const [indexNumber, setIndexNumber] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [pesel, setPesel] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');

    const handleClick = () => {
        alert("Klik")
    }

    return (
        <div className={styles.container}>
            <div className={styles.arrowLeft}>
                <Link to="/"><FiArrowLeft /></Link>
            </div>
            <Header1 text={"Rejestracja"} />
            <Header2 text={"Dane logowania"} />

            <div className={styles.container__primary__fields}>
                <PrimaryField placeholder={"Email"} value={email} setValue={setEmail}/>
                <PrimaryField placeholder={"Powtórz hasło"} value={passwordConfirmation} setValue={setPasswordConfirmation}/>
            </div>
            <div className={styles.container__primary__fields}>
                <PrimaryField placeholder={"Hasło"} value={password} setValue={setPassword}/>
                <PrimaryField placeholder={"Numer indeksu"} value={indexNumber} setValue={setIndexNumber}/>
            </div>
            <Header2 text={"Dane kontaktowe"} />
            <div className={styles.container__primary__fields}>
                <PrimaryField placeholder={"Imię"} value={firstName} setValue={setFirstName}/>
                <PrimaryField placeholder={"Nazwisko"} value={lastName} setValue={setLastName}/>
            </div>
            <div className={styles.container__primary__fields}>
                <PrimaryField placeholder={"Data urodzenia"} value={dateOfBirth} setValue={setDateOfBirth}/>
                <PrimaryField placeholder={"Pesel"} value={pesel} setValue={setPesel}/>
            </div>
            <div className={styles.container__primary__fields}>
                <PrimaryField placeholder={"Numer telefonu"} value={phoneNumber} setValue={setPhoneNumber}/>
                <PrimaryField placeholder={"Miasto"} value={city} setValue={setCity}/>
            </div>
            
            <TermsAgreement />
            <PrimaryButton text="Zarejestruj" onClick={handleClick} />

            <span>
                Masz już konto? 
                <Link className={styles.link} to="/">
                    Zaloguj się.
                </Link>
            </span>
        </div>
    );
}

export default RegisterPage;