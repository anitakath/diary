
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";

//HOOKS
import useSWR from 'swr'

import { supabase } from "@/services/supabaseClient";


//REDUX
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice";


//STYLES
import styles from "../../../styles/Login.module.css";

//CONTEXT
import { RedditContext } from "@/context/RedditContext";
import { current } from "@reduxjs/toolkit";
import { setUser } from "@/store/userSlice";




const fetcher = (...args) => fetch(...args).then((res) => res.json());


const LoginComponent = () =>{

   const { currentUser, fetcher } = useContext(RedditContext);
 
 

   const { data, error } = useSWR("/api/get-users", fetcher, {
     refreshInterval: 200,
   });



   const dispatch = useDispatch();
   

   const [ email, setEmail] = useState('')
   const [ password, setPassword] = useState('')

   const [users, setUsers] = useState(null)

   const [notRegistered, setNotRegistered] = useState('')

   useEffect(()=>{
     if(data){
       setUsers(data.data);
     }
     

   }, [data])

   

   const changeInputHandler = (e) =>{

    if(e === "password"){
      setPassword(e.target.value)
    } else if(e === "email"){
      setEmail(e.target.value)
    }


   }

   const emailChangeHandler = (e) =>{
     setEmail(e.target.value);
   }

   const passwordChangeHandler = (e) =>{
    setPassword(e.target.value);
   }



   const router = useRouter();

  const loginHandler = async (e) => {
     e.preventDefault();

     const formData = {
       email: email,
       password: password,
     };

     try {

       // Senden des Vornamens an die Backend-API, um die Eingaben zu validieren 


       const response = await fetch("/api/login-validation", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       });

       const data = await response.json();




       // Nach erfolgreicher Validierung soll überprüft werden, ob E-Mail und Password in der Datenbank vorhanden sind, 
       // der User also bereits existiert
      if(users){
        let isUserInArray = users.find(
          (user) =>
            user.email === formData.email && user.password === formData.password
        );

        if (isUserInArray) {
          //console.log("Benutzer existiert bereits im Array");
           dispatch(setUser(formData))
          dispatch(login());
          router.push("/");
        } else {
          //console.log("Benutzer existiert nicht im Array");
          setNotRegistered('du scheinst nicht registriert zu sein oder ungültige Eingaben gemacht zu haben... Bitte überprüfe deine E-Mail-, und Passworteingabe, oder registriere dich')

        }
      }


     } catch (error) {
       console.error(error); // Fehlermeldung bei einem Fehler in der API
     }
   };



    return (
      <div className={styles.container}>
        <h1 className={styles.title}> LOGIN </h1>

        <form className={styles.login_form} onSubmit={loginHandler}>
          <label className={styles.login_label}> email </label>
          <input
            type="email"
            className={styles.login_input}
            placeholder="E-Mail"
            onChange={emailChangeHandler}
            value={email}
          ></input>
          <label className={styles.login_label}> passwort </label>
          <input
            type="password"
            className={styles.login_input}
            placeholder="Passwort"
            onChange={passwordChangeHandler}
            value={password}
          ></input>
          <button type="submit" className={styles.login_button}>
            login
          </button>
        </form>

        <p className={styles.notRegisteredMessage}>{notRegistered}</p>

        <div className={styles.register_container}>
          <p> noch kein Konto? </p>
          <Link href={`/register`} className={styles.register_link}>
            registrieren
          </Link>
        </div>
      </div>
    );
}

export default LoginComponent 