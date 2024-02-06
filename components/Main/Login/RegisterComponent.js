
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { login, registration } from "@/store/authSlice";
import { setUser } from "@/store/userSlice";

import { supabase } from "@/services/supabaseClient";

//STYLES
import styles from "../../../styles/Login.module.css";




const fetcher = (...args) => fetch(...args).then((res) => res.json());


const RegisterComponent = () =>{

  const router = useRouter();


  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [error, setError] = useState("");
  const [ isError, setIsError ] = useState(false)
  

    

  const inputChangeHandler = (e) =>{
    const { name, value } = e.target;

    if ( name === "firstName") {
      setFirstName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name  === "password") {
      setPassword(value);
    } else if (name === "rep_password") {
      setRepPassword(value);
    }

  }



  

   const dispatch = useDispatch();
   const loginHandler = (e) => {
     e.preventDefault();
     dispatch(login());
     router.push("/");
   };

   const isLoggedIn = useSelector((state) => state.auth);
   const isRegistered = useSelector((state) => state.auth);
   const currUser = useSelector((state) => state.user)

  

   


    const submitHandler = async (e) => {
       e.preventDefault();

       const formData = {
         name: firstName,
         email: email,
         password: password,
         rep_password: repPassword
      };

       try {
         // Senden des Vornamens an die Backend-API
         const response = await fetch("/api/registration-validation", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(formData),
         });

         const data = await response.json();
         //console.log(data); // Erfolgsnachricht von der API

         if(data.error){
           setIsError(true)
           setError(data.error)
         } else{
           setIsError(false);


           //übermittle formData an Redux:
           dispatch(setUser(formData));



           //Übermittle formData an die supabase-Datenbank...

           await supabase.from("users").insert([formData]);

           dispatch(login());
           dispatch(registration());
           router.push("/");

         }
         
       } catch (error) {
         console.error(error); // Fehlermeldung bei einem Fehler in der API
       }
     };


    




    return (
      <div className={styles.container}>
        <h1 className={styles.title}> REGISTER </h1>

        <form className={styles.login_form} onSubmit={submitHandler}>
          <label className={styles.login_label}> first name </label>
          <input
            type="text"
            className={styles.login_input}
            placeholder="Vorname"
            value={firstName}
            name="firstName"
            onChange={inputChangeHandler}
          ></input>
          <label className={styles.login_label}> email </label>
          <input
            type="email"
            className={styles.login_input}
            placeholder="E-Mail"
            value={email}
            name="email"
            onChange={inputChangeHandler}
          ></input>

          <label className={styles.login_label}> passwort </label>
          <input
            type="password"
            className={styles.login_input}
            placeholder="Passwort"
            value={password}
            name="password"
            onChange={inputChangeHandler}
          ></input>

          <label className={styles.login_label}> passwort </label>
          <input
            type="password"
            className={styles.login_input}
            placeholder="Passwort wiederholen"
            value={repPassword}
            name="rep_password"
            onChange={inputChangeHandler}
          ></input>

          <button type="submit" className={styles.login_button}>
            registrieren
          </button>
        </form>

        {isError && <p className={styles.error_message_registration}> {error} </p>}

        <div className={styles.register_container}>
          <p> noch kein Konto? </p>
          <Link href={`/login`} className={styles.register_link}>
            login
          </Link>
        </div>
      </div>
    );
}

export default RegisterComponent;