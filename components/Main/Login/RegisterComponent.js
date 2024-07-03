
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//REDUX
import {  useDispatch } from "react-redux";
import { login, registration } from "@/store/authSlice";
import { setUser } from "@/store/userSlice";
import { supabase } from "@/services/supabaseClient";
//STYLES
import styles from "./Login.module.css";


const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return re.test(password);
};

const RegisterComponent = () =>{

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [error, setError] = useState("");

  const [ isError, setIsError ] = useState(false)
  const dispatch = useDispatch();

    

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

   
  const submitHandler = async (e) => {
     e.preventDefault();
     //const formData = { name: firstName, email: email, password: password, rep_password: repPassword };

      if (!email || !validateEmail(email)) {
        setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
      }
      if (!firstName) {
        setError("Bitte geben Sie Ihren Vornamen ein.");
        return;
      }
       if (!password || !validatePassword(password)) {
         setError(
           "Das Passwort muss mindestens 4 Zeichen lang sein und mindestens einen Großbuchstaben sowie eine Zahl enthalten."
         );
         return;
       }
      if (password !== repPassword) {
        setError("Die Passwörter stimmen nicht überein.");
        return;
      }



       try {
         const { user, error } = await supabase.auth.signUp({
           email: email,
           password: password,
         });

         if (error) {
           throw new Error(error.message);
         }

         await supabase.from("users").insert([{ email, firstName }]);

         //router.push("/login");
       } catch (error) {
         console.error(error);
         setError(
           "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
         );
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