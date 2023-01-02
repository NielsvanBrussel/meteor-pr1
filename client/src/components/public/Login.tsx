import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import styles from '../../styles/Login.module.css'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../mutations/userMutations'

interface Props {
}

const Login: React.FC<Props> = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<String>("")

  const ContextValues = useContext(GlobalContext)

  const setAuthenticated = ContextValues?.setAuthenticated


  const loginInput = {
    email: email,
    password: password
  }

  const [loginUser, {error, data }] = useMutation(LOGIN_USER, {
    variables: { loginInput },
  });


  const createErrorMessage = (message: string) => {
    setErrorMessage(message)
    console.log("setting message")
    setTimeout(() => {
      setErrorMessage("")
    }, 3000);
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (email && password) {
      try {
        const res = await loginUser();
        console.log(res)
        if (res.data.login.success) {
          setAuthenticated?.(true)
          setPassword("")
          setEmail("")
        }
     } catch (error: any) {
        console.log(error)
         if(error.message === 'Incorrect email or password.') {
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
          <h1 className={styles.form__main__header}>Login</h1>
        </div>
        <div className={styles.form__container__inner}>
          <div className={styles.form__content}>
            <div className={styles.form__content__inner}>
              <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">Email:</label>
                    <input className={styles.form__input} type="text" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="enter email address here..." />
                  </div>
                  <div className={styles.form__flex}>
                    <label className={styles.form__label} htmlFor="text">Password:</label>
                    <input className={styles.form__input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter password here..." />
                  </div>
                  <div className={styles.form__button__container}>
                     <button className={styles.form__button}>Log in</button>
                  </div>
              </form>
              <ErrorMessage />  
            </div>
          </div>
        </div>
        <div className={styles.form__subtext__container}>
          <div className={styles.form__subtext__container__item}>
            <p className={styles.form__subtext}>Dont have an account? Sign up &nbsp; 
              <p className={styles.form__subtext__link}>here</p>.
            </p>
          </div>
          <div className={styles.form__subtext__container__item}>
            <p className={styles.form__subtext}>Forgot your password? Click &nbsp; 
              <p className={styles.form__subtext__link}>here</p>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login