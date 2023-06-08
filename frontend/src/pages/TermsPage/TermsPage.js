import React from "react";
import Header1 from "../../components/Headers/Header1/Header1";

import styles from "./TermsPage.module.scss"

import ArrowNavigate from "../../components/ArrowNavigate/ArrowNavigate";

const TermsPage = () => {
  return (
    <div className={styles.container}>
      <ArrowNavigate linkTo={"/rejestracja"} />
      <Header1 text={"Regulamin"} />
      <ol>
        <li>Cel kliniki lekarskiej dla studentów:</li>
        <ul>
          <li>Zapewnienie studentom praktycznego doświadczenia w zakresie opieki zdrowotnej.</li>
          <li>Umożliwienie studentom obserwacji i udziału w procesie diagnozowania, leczenia i opieki nad pacjentami.</li>
          <li>Wspieranie rozwoju umiejętności klinicznych, komunikacyjnych i etycznych studentów.</li>
        </ul>

        <li>Zasady ogólne:</li>
        <ul>
          <li>Klinika lekarska dla studentów działa zgodnie z obowiązującymi przepisami prawa i standardami medycznymi.</li>
          <li>Uczestnictwo w pracy kliniki lekarskiej jest dobrowolne i oparte na zasadach równości i szacunku.</li>
          <li>Studenci są zobowiązani do przestrzegania poufności informacji o pacjentach i zachowania profesjonalizmu.</li>
          <li>Klinika lekarska może odmówić udziału studentowi bez podania przyczyny.</li>
        </ul>
        
        <li>Zgłaszanie pacjentów:</li>
        <ul>
          <li>Pacjenci zgłaszają się do kliniki lekarskiej na zasadzie dobrowolności i wyrażają zgodę na udział studentów w opiece medycznej.</li>
          <li>Pacjenci mają prawo do odmowy uczestnictwa studentów w swojej opiece.</li>
          <li>Dane pacjentów muszą być poufne i mogą być wykorzystywane jedynie w celach edukacyjnych, z zachowaniem pełnej anonimowości.</li>
        </ul>

        <li>Obowiązki studentów:</li>
        <ul>
          <li>Studenci muszą posiadać aktualną identyfikację studencką oraz podlegać nadzorowi odpowiedniego personelu medycznego.</li>
          <li> Studenci są zobowiązani do regularnego uczestnictwa w zajęciach praktycznych, wykładach i innych aktywnościach edukacyjnych związanych z kliniką lekarską.</li>
          <li>Studenci muszą zachować szacunek wobec pacjentów, personelu medycznego i innych studentów.</li>
          <li>Studenci są odpowiedzialni za utrzymanie czystości i porządku w miejscach pracy oraz przestrzeganie zasad higieny.</li>
        </ul>

        <li>Nadzór i odpowiedzialność:</li>
        <ul>
          <li>Klinika lekarska ma odpowiedni personel medyczny, który nadzoruje pracę studentów i udziela im wsparcia.</li>
          <li>Personel medyczny ponosi odpowiedzialność za bezpieczeństwo pacjentów i studentów oraz zapewnienie wysokiej jakości opieki zdrowotnej.</li>
          <li>Studenci muszą stosować się do instrukcji personelu medycznego i zgłaszać wszelkie wątpliwości lub sytuacje wymagające interwencji.</li>
        </ul>

        <li>Postanowienia końcowe:</li>
        <ul>
          <li>Klinika lekarska dla studentów zastrzega sobie prawo do wprowadzania zmian w regulaminie.</li>
          <li>Student zobowiązany jest do zapoznania się z regulaminem i przestrzegania jego postanowień.</li>
          <li>Złamanie regulaminu może prowadzić do dyscyplinarnych konsekwencji, w tym wykluczenia z udziału w klinice lekarskiej.</li>
        </ul>
      </ol>

      <p>Zapoznanie się z powyższym regulaminem jest obowiązkiem studenta i konieczne przed rozpoczęciem udziału w klinice lekarskiej dla studentów.</p>
    </div>
  );
};

export default TermsPage;
