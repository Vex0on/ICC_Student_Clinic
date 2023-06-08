import React from "react";

import styles from "./Header2.module.scss";

const Header2 = ({ text }) => {
  return <h2 className={styles.h2}>{text}</h2>;
};

export default Header2;
