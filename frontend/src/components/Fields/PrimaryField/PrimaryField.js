import React, { useState } from 'react'
import styles from './PrimaryField.module.scss'

const PrimaryField = ({ type, placeholder, value, setValue, error }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value.trim() !== '')
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={styles.fieldContainer}>
      <input
        className={`${styles.primaryInput} ${error ? styles.error : ''}`}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
      />
      <label
        className={`${styles.placeholder} ${
          (isFocused || hasValue) ? styles.focused : ''
        }`}
      >
        {placeholder}
      </label>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}

export default PrimaryField
