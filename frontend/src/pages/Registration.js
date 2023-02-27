import React from 'react'
import { motion } from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import { HiOutlineArrowRight } from "react-icons/hi";
import styles from '../styles/Registration.module.scss'

const Registration = () => {
    const navigate = useNavigate()

    const moveTo = () => {
        navigate('/', {
            state: {
                width: '40rem',
                height: '40rem'
            }
        })
    }

        return(
        <motion.form 
            className='form'
            initial={{width: "28rem", height: "34rem"}}
            animate={{width: "40rem", height: "40rem"}}>
                <HiOutlineArrowRight className={styles.arrow} onClick={moveTo}/>
                <h1 className={styles.h1}>Rejestracja</h1>
        </motion.form>
    )
}

export default Registration