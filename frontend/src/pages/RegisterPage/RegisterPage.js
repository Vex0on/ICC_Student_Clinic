import React, { useState } from "react";
import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import Header1 from "../../components/Headers/Header1/Header1";
import Header2 from "../../components/Headers/Header2/Header2";
import PrimaryField from "../../components/Fields/PrimaryField/PrimaryField";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import TermsAgreement from "../../components/TermsAgreement/TermsAgreement";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [pesel, setPesel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleClick = async () => {
    // Sprawdzenie czy wszystkie pola są wypełnione
    const errors = {};

    if (!email) {
      errors.email = "Wpisz adres e-mail";
    }

    if (!password) {
      errors.password = "Wpisz hasło";
    }

    if (!passwordConfirmation) {
      errors.passwordConfirmation = "Wpisz potwierdzenie hasła";
    }

    if (!indexNumber) {
      errors.indexNumber = "Wpisz numer indeksu";
    }

    if (!firstName) {
      errors.firstName = "Wpisz imię";
    }

    if (!lastName) {
      errors.lastName = "Wpisz nazwisko";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Wpisz datę urodzenia";
    }

    if (!pesel) {
      errors.pesel = "Wpisz numer PESEL";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Wpisz numer telefonu";
    }

    if (!city) {
      errors.city = "Wpisz miasto";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const data = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      pesel: pesel,
      phone_number: phoneNumber,
      address: city,
      index_number: indexNumber,
      user: {
        email: email,
        password: password,
      },
    };

try {
  const response = await axios.post("http://localhost:8000/api/register/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

      if (response.ok) {
        // Rejestracja pomyślna
        setRegistrationStatus("Rejestracja pomyślna");
      } else {
        // Obsługa błędów zwróconych przez API
        if (response.data) {
          setFormErrors(response.data);
        } else {
          setRegistrationStatus("Wystąpił błąd podczas rejestracji");
        }
      }
    } catch (error) {
      console.error("Wystąpił błąd", error);
      setRegistrationStatus("Wystąpił błąd podczas rejestracji");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrowLeft}>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </div>
      <Header1 text={"Rejestracja"} />
      <Header2 text={"Dane logowania"} />

      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Email"}
          value={email}
          setValue={setEmail}
          error={formErrors.email}
        />
        <PrimaryField
          placeholder={"Powtórz hasło"}
          type="password"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
          error={formErrors.passwordConfirmation}
        />
      </div>
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Hasło"}
          type="password"
          value={password}
          setValue={setPassword}
          error={formErrors.password}
        />
        <PrimaryField
          placeholder={"Numer indeksu"}
          value={indexNumber}
          setValue={setIndexNumber}
          error={formErrors.indexNumber}
        />
      </div>
      <Header2 text={"Dane kontaktowe"} />
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Imię"}
          value={firstName}
          setValue={setFirstName}
          error={formErrors.firstName}
        />
        <PrimaryField
          placeholder={"Nazwisko"}
          value={lastName}
          setValue={setLastName}
          error={formErrors.lastName}
        />
      </div>
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Data urodzenia"}
          value={dateOfBirth}
          setValue={setDateOfBirth}
          error={formErrors.dateOfBirth}
        />
        <PrimaryField
          placeholder={"Pesel"}
          value={pesel}
          setValue={setPesel}
          error={formErrors.pesel}
        />
      </div>
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Numer telefonu"}
          value={phoneNumber}
          setValue={setPhoneNumber}
          error={formErrors.phoneNumber}
        />
        <PrimaryField
          placeholder={"Miasto"}
          value={city}
          setValue={setCity}
          error={formErrors.city}
        />
      </div>

      <TermsAgreement />
      <PrimaryButton text="Zarejestruj" onClick={handleClick} />

      <span>
        Masz już konto?{" "}
        <Link className={styles.link} to="/">
          Zaloguj się.
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
