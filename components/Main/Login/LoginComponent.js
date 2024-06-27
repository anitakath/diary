import Link from "next/link";
import {  useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";

//REDUX
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
//STYLES
import styles from "./Login.module.css";
//CONTEXT
import { RedditContext } from "@/context/RedditContext";
import { setCurrentUser } from "@/store/userSlice";
import { supabase } from "@/services/supabaseClient";
//import { signInWithEmail } from "@/services/supabaseClient";

const LoginComponent = () =>{
  // COMPONENT THAT MANAGES LOGIN VIA EMAIL
  const { fetcher } = useContext(RedditContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      //const { user, session, error } = await signInWithEmail(email, password);
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });


      if (error) {
        setError(error);
        return;
      }

      dispatch(login());
      router.push("/");

      // Weitere Logik nach erfolgreichem Login
    } catch (error) {
      setError(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  /*

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }


    try {
      //const { user, session, error } = await signInWithEmail(email, password);
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error) {
        setError(error);
        return;
      }

      dispatch(login());

      // Aktualisierung der Berechtigungen für den Zugriff auf Fotos im Supabase Storage
      const { data, error: policyError } = await supabase.storage.updatePolicy(
        "images",
        {
          INSERT: ["authenticated"],
          SELECT: ["authenticated"],
          UPDATE: ["authenticated"],
          DELETE: ["authenticated"],
        }
      );

      if (policyError) {
        console.error(
          "Fehler beim Aktualisieren der Berechtigungen:",
          policyError.message
        );
        return;
      }

      router.push("/");
      
    } catch (error) {
      setError(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  */




  
/*
 const loginHandler = async (e) => {
   e.preventDefault();

   if (!email || !password) {
     setError("Bitte füllen Sie alle Felder aus.");
     return;
   }

   try {
     const response = await fetch("/api/login-validation", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ email, password }),
     });

     if (!response.ok) {
       throw new Error(
         "Fehler bei der Anmeldung. Bitte versuchen Sie es erneut."
       );
     }

     const data = await response.json();

     

     if (data) {
       //const usersResponse = await fetch("/api/get-users");
      // const usersData = await usersResponse.json();

       /*if (usersData) {
         let isUserInArray = usersData.data.find(
           (user) => user.email === email && user.password === password
         );

         if (isUserInArray) {
           // Anmeldung des Benutzers in Supabase
           
           // Setzen des aktuellen Benutzers und Weiterleitung nach erfolgreicher Anmeldung
           dispatch(setCurrentUser(isUserInArray));
           dispatch(login());
           router.push("/");
         } else {
           setError(
             "E-Mail oder Passwort ungültig. Bitte überprüfen Sie Ihre Eingaben."
           );
         }
       }
       signInWithEmail(email, password);
     } else {
       setError("E-Mail oder Passwort entsprechen nicht den Anforderungen.");
     }
   } catch (error) {
     setError(
       "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
     );
   }
 };
 */

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> LOGIN </h1>
      <form className={styles.login_form} onSubmit={loginHandler}>
        <label className={styles.login_label}> email </label>
        <input
          type="email"
          className={styles.login_input}
          placeholder="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <label className={styles.login_label}> passwort </label>
        <input
          type="password"
          className={styles.login_input}
          placeholder="Passwort"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button type="submit" className={styles.login_button}>
          login
        </button>
      </form>

      <p className={styles.errorMessage}>{error}</p>

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