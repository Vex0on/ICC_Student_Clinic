import React, {useState} from 'react'
import styles from '../styles/Login.module.scss'
import { motion } from 'framer-motion'
import { useLocation} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const location = useLocation()
    const width = location.state?.width
    const height = location.state?.height

    return(
        <>
        <motion.form 
        className='form'
        initial={{width: width, height: height}}
        animate={{width: "28rem", height: "34rem"}}
        exit={{width: "28rem", height: "34rem"}}
        >
            <h1 className={styles.header}>Logowanie</h1>

            <div className={styles.box}>
                <input
                    className={styles.box__input}
                    type='email'
                    id='email'
                    value={email}
                    placeholder=' '
                    required
                    onChange={(e) => setEmail(e.target.value)}/>
                <label className={styles.box__label} htmlFor='email'>Email</label>
            </div>

            <div className={styles.box}>
                <input
                    className={styles.box__input}
                    type='password'
                    id='password'
                    value={password}
                    placeholder=' '
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                <label className={styles.box__label} htmlFor='password'>Hasło</label>
            </div>

            <input 
                className={styles.submit}
                type='submit'
                value='Zaloguj'/>

            <div className={styles.links}>
                <a className={styles.links__item} href='/forgot-password'>Przypomnij hasło</a>
                <a className={styles.links__item} href='/registration'>Zarejestruj się</a>
            </div>

            <motion.div 
            className={styles.cadre}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: { duration: 1 }}}
            exit={{opacity: 1}}>
                <a className={styles.cadre__item} href='#'>Poznaj naszą kadrę</a>
            </motion.div>
        </motion.form>
    </>
    )
}

export default Login