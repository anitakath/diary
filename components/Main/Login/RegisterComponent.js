


import Link from "next/link";
import { useRouter } from "next/router";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice";




//STYLES
import styles from "../../../styles/Login.module.css";



const RegisterComponent = () =>{

    const router = useRouter();
    


   const dispatch = useDispatch();
   const loginHandler = (e) => {
     e.preventDefault();
     dispatch(login());
     router.push("/");
   };

   const isLoggedIn = useSelector((state) => state.auth);

     const submitHandler = async () => {
       //e.preventDefault();

       const formData = {
         vorname: enteredFirstName,
         nachname: enteredLastName,
         adresse: enteredAdress,
         postleitzahl: enteredPostal,
         telefonnummer: enteredTel,
         email: enteredEmail,
         geburtstermin: enteredBirth,
         versicherung: enteredInsurance,
         nachricht: enteredMessage,
         datenschutz: checkboxCheck,
       };
       try {
         // Senden des Vornamens an die Backend-API
         const response = await fetch("/api/validate", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(formData),
         });

         const data = await response.json();
         console.log(data); // Erfolgsnachricht von der API
         handleSubmit();
       } catch (error) {
         console.error(error); // Fehlermeldung bei einem Fehler in der API
       }
     };




    return (
      <div className={styles.container}>


        <h1 className={styles.title}> REGISTER </h1>


        <form className={styles.login_form} onSubmit={loginHandler}>
          <label className={styles.login_label}> email </label>
          <input
            type="email"
            className={styles.login_input}
            placeholder="E-Mail"
          ></input>

          <label className={styles.login_label}> passwort </label>
          <input
            type="password"
            className={styles.login_input}
            placeholder="Passwort"
          ></input>

          <label className={styles.login_label}> passwort </label>
          <input
            type="password"
            className={styles.login_input}
            placeholder="Passwort wiederholen"
          ></input>

          <button type="submit" className={styles.login_button}>
            registrieren
          </button>
        </form>

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