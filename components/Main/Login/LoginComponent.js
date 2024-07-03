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

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};


const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return re.test(password);
};

const LoginComponent = () =>{
  // COMPONENT THAT MANAGES LOGIN VIA EMAIL
  const { fetcher } = useContext(RedditContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();


    if (!email || !validateEmail(email)) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (!password || !validatePassword(password)) {
      setError(
        "Das Passwort muss mindestens 4 Zeichen lang sein und mindestens einen Großbuchstaben sowie eine Zahl enthalten."
      );
      return;
    }



    try {
      //const { user, session, error } = await signInWithEmail(email, password);
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          console.log("notfiund");
          setError("Die angegebene E-Mail-Adresse ist nicht registriert. Melde dich aber gern mit ihr an 🫶🏼.");
        } else {
          setError(error.message);
        }
        return;
      }

      dispatch(login());
      router.push("/");
      setError(null)

      // Weitere Logik nach erfolgreichem Login
    } catch (error) {
      setError(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  console.log(error)


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