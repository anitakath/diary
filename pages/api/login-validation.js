const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});


export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (req.method === "POST") {

    const {email, password} = req.body;

    console.log(email)
    console.log(password)



    function escape(input) {
      // Ersetze alle < und > Zeichen durch ihre HTML-Entities
      input = input.replace(/</g, "&lt;");
      input = input.replace(/>/g, "&gt;");

      // Weitere Bereinigungen oder Ersetzungen können hier hinzugefügt werden

      return input;
    }


    escape(email)
    escape(password)


    const trimEmail = email.trim();

    const trimPassword = password.trim();


   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Der RegEx für E-Mail-Adressen

    if (!trimEmail || !emailRegex.test(trimEmail)) {
        return res.status(400).json({
          error: "Ungültige E-Mail-Adresse",
        });
    }

    if(!trimPassword || trimPassword.length < 6 || trimPassword.length > 14){
        return res.status(400).json({
            error: "Ungültiges Passwort"
        })
    }


   }

    return res.status(200).json({
      message: "Daten erfolgreich validiert!",
    });


}