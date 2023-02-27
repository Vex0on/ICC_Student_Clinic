import React from 'react'
import { motion } from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import styles from '../styles/ForgotPassword.module.scss'
import { HiOutlineArrowRight } from "react-icons/hi";

const ForgotPassword = () => {

    const navigate = useNavigate()

    const moveTo = () => {
        navigate('/', {
            state: {
                width: '25rem',
                height: '20rem'
            }
        })
    }

        return(
        <motion.form 
            className='form'
            initial={{width: "28rem", height: "34rem"}}
            animate={{width: "28rem", height: "21rem"}}>
            <h1 className={styles.h1}>Przypomnij hasło</h1>
                <HiOutlineArrowRight className={styles.arrow} onClick={moveTo}/>
        </motion.form>
    )
}

export default ForgotPassword

