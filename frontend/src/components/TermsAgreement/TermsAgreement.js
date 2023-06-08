import React from "react";

import styles from "./TermsAgreement.module.scss"
import { Link } from "react-router-dom";

const TermsAgreement = () => {
  return (
    <div className={styles.container}>
      <label>
        <input type="checkbox" /> Akceptuję
      </label>
      <Link className={styles.container__link} to="/regulamin" target="_blank">
        regulamin
      </Link>
    </div>
  );
};

export default TermsAgreement;