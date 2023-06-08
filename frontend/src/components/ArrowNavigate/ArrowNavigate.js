import React from "react"

import styles from "./ArrowNavigate.module.scss"
import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"

const ArrowNavigate = ({ linkTo }) => {
  return (
    <div className={styles.container}>
      <Link to={linkTo}><AiOutlineArrowLeft className={styles.icon} /> </Link>
    </div>
  )
}

export default ArrowNavigate
