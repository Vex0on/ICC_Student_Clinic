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
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setRegistrationStatus("Rejestracja pomyślna");
      } else {
        setRegistrationStatus("Wystąpił błąd podczas rejestracji");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setFormErrors(error.response.data);
      } else {
        console.log(error);
      }
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
      {registrationStatus && <div>{registrationStatus}</div>}
      
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Email"}
          value={email}
          setValue={setEmail}
          error={formErrors.user?.email?.[0]}
        />
        <PrimaryField
          placeholder={"Powtórz hasło"}
          type="password"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
          error={formErrors.passwordConfirmation?.[0]}
        />
      </div>
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Hasło"}
          type="password"
          value={password}
          setValue={setPassword}
          error={formErrors.user?.password?.[0]}
        />
        <PrimaryField
          placeholder={"Numer indeksu"}
          value={indexNumber}
          setValue={setIndexNumber}
          error={formErrors.index_number?.[0]}
          maxLength={6}
        />
      </div>
      <Header2 text={"Dane kontaktowe"} />
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Imię"}
          value={firstName}
          setValue={setFirstName}
          error={formErrors.first_name?.[0]}
        />
        <PrimaryField
          placeholder={"Nazwisko"}
          value={lastName}
          setValue={setLastName}
          error={formErrors.last_name?.[0]}
        />
      </div>
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Numer telefonu"}
          value={phoneNumber}
          setValue={setPhoneNumber}
          error={formErrors.phone_number?.[0]}
          maxLength={9}
        />
        <PrimaryField
          placeholder={"Miasto"}
          value={city}
          setValue={setCity}
          error={formErrors.address?.[0]}
        />
      </div>
      <div className={styles.container__primary__fields}>
        <PrimaryField
          placeholder={"Pesel"}
          value={pesel}
          setValue={setPesel}
          error={formErrors.pesel?.[0]}
          maxLength={11}
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
