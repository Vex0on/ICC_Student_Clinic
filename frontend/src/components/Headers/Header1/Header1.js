import React from "react"

import styles from "./Header1.module.scss"

const header1 = ({ text }) => {
  return (
    <>
      <h1 className={styles.h1}>{text}</h1>
    </>
  )
}

export default header1
