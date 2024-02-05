import { supabase } from "@/services/supabaseClient";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

app.use(express.json());

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (req.method === "POST") {
    const { name, email, password, rep_password } = req.body;

     // Überprüfen, ob die E-Mail-Adresse bereits in der Datenbank vorhanden ist
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      return res.status(500).json({ error: "Datenbankfehler" });
    }

    if (users.length > 0) {
      return res.status(400).json({ error: "E-Mail-Adresse bereits registriert. Bitte logge dich ein" });
    }










    
    console.log(email);
    console.log(password);
    console.log(rep_password);









    function escape(input) {
      // Ersetze alle < und > Zeichen durch ihre HTML-Entities
      input = input.replace(/</g, "&lt;");
      input = input.replace(/>/g, "&gt;");
      // Weitere Bereinigungen oder Ersetzungen können hier hinzugefügt werden
      return input;
    }

    escape(name);
    escape(email);
    escape(password);
    escape(rep_password);

    const trimName = name.trim();
    const trimEmail = email.trim();
    const trimPassword = password.trim();
    const trimRepPassword = rep_password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Der RegEx für E-Mail-Adressen

    if (!trimEmail || !emailRegex.test(trimEmail)) {
      return res.status(400).json({
        error: "Ungültige E-Mail-Adresse",
      });
    }

    if (!trimPassword || trimPassword.length < 6 || trimPassword.length > 14) {
      return res.status(400).json({
        error: "Ungültiges Passwort",
      });
    }

    if (!trimName || trimName.length > 20) {
      return res.status(400).json({
        error: "Ungültiger Vorname",
      });
    }

    if (!trimRepPassword || trimRepPassword != trimPassword) {
      return res.status(400).json({
        error: "Passwörter stimmen nicht überein",
      });
    }






  }

  return res.status(200).json({
    message: "Daten erfolgreich validiert!",
  });
}
