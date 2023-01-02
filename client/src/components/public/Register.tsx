import e from 'express'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import styles from '../../styles/Login.module.css'
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../mutations/userMutations'
import { GET_USERS } from '../../queries/userQueries'

interface Props {
}

const Register: React.FC<Props> = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [errorMessage, setErrorMessage] = useState<String>("")


  const ContextValues = useContext(GlobalContext)
  if (ContextValues) {
    const { authenticated, setAuthenticated, test } = ContextValues;
  }


  const registerInput = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password
  }

  const [register, {error, data }] = useMutation(CREATE_USER, {
    variables: { registerInput },
  });

  const createErrorMessage = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage("")
    }, 3000);
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    console.log("allo")
    if (email && password && lastName && firstName) {
      try {
         const res = await register();
         console.log(res)
         if (res.data.register.success) {
          createErrorMessage('Account created')
          setConfirmPassword("")
          setPassword("")
          setEmail("")
          setFirstName("")
          setLastName("")
         }
      } catch (error: any) {
        console.log(error.message)
          if(error.message === 'EMAIL ALREADY IN USE') {
            createErrorMessage(error.message)
          }
      }
    } else {
      createErrorMessage("Please fill in the required fields.")
    }
  }

  const ErrorMessage = () => {
    return (<h3 className={styles.errormessage}>{errorMessage}</h3>)
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        <div className={styles.form__header__flexbox}>
          <h1 className={styles.form__main__header}>Create an account</h1>
        </div>
        <div className={styles.form__container__inner}>
          <div className={styles.form__content}>
            <div className={styles.form__content__inner}>
              <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">Email:</label>
                    <input className={styles.form__input} type="text" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="enter your email address here..." required/>
                  </div>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">Password:</label>
                    <input className={styles.form__input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter your password here..." required/>
                  </div>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">Confirm password:</label>
                    <input className={styles.form__input} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm your password here..." required/>
                  </div>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">first name:</label>
                    <input className={styles.form__input} type="text" value={firstName}  onChange={(e) => setFirstName(e.target.value)} placeholder="enter your first name here..." required/>
                  </div>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">last name:</label>
                    <input className={styles.form__input} type="text" value={lastName}  onChange={(e) => setLastName(e.target.value)} placeholder="enter your last name here..." required/>
                  </div>
                  <div className={styles.form__button__container}>
                     <button className={styles.form__button}>Create account</button>
                  </div>
              </form>
              <ErrorMessage />  
            </div>
          </div>
        </div>
        <div className={styles.form__subtext__container}>
          <div className={styles.form__subtext__container__item}>
            <p className={styles.form__subtext}>Already have an account? Log in &nbsp; 
              <p className={styles.form__subtext__link}>here</p>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register