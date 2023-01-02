import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from './context/GlobalState'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import styles from './styles/AppRouter.module.css'


import AuthHome from './components/private/AuthHome'
import Home from './components/public/Home'
import Login from './components/public/Login'
import Register from './components/public/Register'
import Test from './components/private/Test'
import { CHECK_AUTH } from './queries/userQueries'
import { useQuery } from '@apollo/client';
import Chat from './components/private/Chat'


interface Props {
    
}

const AppRouter: React.FC<Props> = () => {

  const ContextValues = useContext(GlobalContext)
  const [scrolling, setScrolling] = useState<boolean | null | undefined>(false)

  const authenticated = ContextValues?.authenticated
  const setAuthenticated = ContextValues?.setAuthenticated
  const logout = ContextValues?.logout


  // check session and autologin if user was logged in last time

  const { loading, error, data } = useQuery(CHECK_AUTH, {
    // pollInterval: 5000,
    fetchPolicy: 'network-only',
    pollInterval: authenticated? 0 : 60 * 1000,   // check every minute if not logged in
    onCompleted: (data) => {
      if (data?.checkAuth) {
        setAuthenticated?.(true)
      }
    }
  }); 

  window.onscroll = function() {scrollFunction()};

  useEffect(() => {
      console.log(scrolling)
  }, [scrolling])
  

  function scrollFunction() {
    if (document.documentElement.scrollTop > 100) {
      setTimeout(() => {
        setScrolling(true)
      }, 200);
      
    } else if (document.documentElement.scrollTop < 20) {
      setTimeout(() => {
        setScrolling(false)
      }, 200);
    }
  }


  if (authenticated) {
    return (
      <div>
        <div className={styles.header__wrapper}>
          <header className={scrolling? styles.smallHeader : styles.header}>
            <div className={styles.button__container}>
                <Link className={styles.nav__list__item__link__home} to="/">Meteor</Link>
            </div>
            <ul className={styles.nav__list}>
              <li className={styles.nav__list__item}>
                <Link className={styles.nav__list__item__link} to="/test">Test</Link>
              </li>
            </ul>
            <ul className={styles.nav__list}>
              <li className={styles.nav__list__item}>
                <Link className={styles.nav__list__item__link} to="/chat">Chat</Link>
              </li>
            </ul>
            <div className={styles.button__container}>
              <button className={styles.button} onClick={() => {logout?.()}}>log out</button>
            </div>
          </header>
        </div>

        <Routes>
          <Route path='/' element={<AuthHome/>} />
          <Route path='/test' element={<Test/>} />
          <Route path='/chat' element={<Chat/>} />  
          <Route path="*" element={<Navigate to="/" />}/> 
        </Routes>
      </div>
    )
  } else {
    return (
      <div>
        <div className={styles.header__wrapper}>
          <header className={scrolling? styles.smallHeader : styles.header}>
            <div className={styles.button__container}>
                <Link className={styles.nav__list__item__link__home} to="/">Meteor</Link>
            </div>
            <div className={styles.button__container}>
                <Link className={styles.nav__list__item__link__cta} to="/register">
                  <div className={styles.button__cta}>
                    sign up
                  </div>
                </Link>
                <Link className={styles.nav__list__item__link} to="/login">
                  <div className={styles.button}>
                    log in
                  </div>
                </Link>
            </div>
          </header>          
        </div>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} /> 
          <Route path='/register' element={<Register/>} />
          <Route path="*" element={<Navigate to="/" />}/> 
        </Routes>
      </div>
    )
  }
}

export default AppRouter