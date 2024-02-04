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
    //const referer = req.headers.referer || req.headers.referrer;
    //const allowedReferer = "https://shaana.netlify.app/kontakt";

    if (referer.startsWith(allowedReferer) === true) {
      // POST kommt von Shaanas Website

      const {
        vorname,
        nachname,
        adresse,
        postleitzahl,
        telefonnummer,
        email,
        geburtstermin,
        versicherung,
        nachricht,
        datenschutz,
      } = req.body;

      function escape(input) {
        // Ersetze alle < und > Zeichen durch ihre HTML-Entities
        input = input.replace(/</g, "&lt;");
        input = input.replace(/>/g, "&gt;");

        // Weitere Bereinigungen oder Ersetzungen können hier hinzugefügt werden

        return input;
      }

      escape(vorname);
      escape(nachname);
      escape(adresse);
      escape(postleitzahl);
      escape(telefonnummer);
      escape(geburtstermin);
      escape(email);
      escape(versicherung);
      escape(nachricht);

      const trimVorname = vorname.trim();
      const trimNachname = nachname.trim();
      const trimAdresse = adresse.trim();
      const trimPlz = postleitzahl.trim();
      const trimTel = telefonnummer.trim();
      const trimEmail = email.trim();
      const trimGeburt = geburtstermin.trim();
      const trimVersicherung = versicherung.trim();
      const trimNachricht = nachricht.trim();

      if (!trimVorname || trimVorname.length > 99 || trimVorname.length < 3) {
        return res.status(400).json({
          error:
            "dein Vorname muss mindestens 3, darf aber nur max 100 Buchstaben haben.",
        });
      }

      if (
        !trimNachname ||
        trimNachname.length > 99 ||
        trimNachname.length < 3
      ) {
        return res.status(400).json({
          error:
            "dein Nachname muss mindestens 3, darf aber nur max 100 Buchstaben haben.",
        });
      }

      if (!trimAdresse || trimAdresse.length > 99 || trimAdresse.length < 4) {
        return res.status(400).json({
          error:
            "deine Adresse muss mindestens 4, darf aber nur max 100 Buchstaben haben",
        });
      }

      if (!trimPlz || trimPlz.length < 5 || trimPlz.length > 5) {
        return res.status(400).json({
          error: "deine Postleitzahl muss aus 5 Ziffern bestehen",
        });
      }

      if (!trimTel || trimTel.length < 6 || trimTel.length > 15) {
        return res.status(400).json({
          error:
            "deine Telefonnummer muss aus mindestens 6 und maximal 16 Ziffern bestehen",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Der RegEx für E-Mail-Adressen

      if (!trimEmail || !emailRegex.test(trimEmail)) {
        return res.status(400).json({
          error: "Ungültige E-Mail-Adresse",
        });
      }

      const currentDate = new Date();

      const tomorrow = new Date();
      tomorrow.setDate(currentDate.getDate() + 1);

      const nextYear = new Date();
      nextYear.setDate(currentDate.getDate() + 365);

      const formatDate = (date) => {
        const year = date.getFullYear(); // Jahr (z.B. 2023)
        const monthNames = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
        const month = monthNames[date.getMonth()]; // Monatsname (z.B. Oct)
        const day = ("0" + date.getDate()).slice(-2); // Tag (01-31)

        return `${year}-${month}-${day}`; // Format YYY-MMM-DDD
      };

      if (
        !trimGeburt ||
        trimGeburt < formatDate(tomorrow) ||
        trimGeburt > formatDate(nextYear)
      ) {
        return res.status(400).json({
          error:
            " Datum muss frühestens dem morgigen Tag und spätestens dem morgigen Tag in einem Jahr entsprechen",
        });
      }

      if (
        !trimVersicherung ||
        trimVersicherung.length < 3 ||
        trimVersicherung > 50
      ) {
        return res.status(400).json({
          error:
            "deine Krankenversicherung muss mindestens 3, darf aber maximal nur 100 Buchstaben haben ",
        });
      }

      if (trimNachricht.length > 140) {
        return res.status(400).json({
          error:
            "deine Nachricht darf nicht mehr als 140 buchstaben enthalten. ",
        });
      }

      if (datenschutz === false) {
        return res.status(400).json({
          error: `bitte lies meine Datenschutzerklärung und bestätige mit einem Klick, dass du diese akzeptierst.`,
        });
      }

      return res.status(200).json({
        message: "Daten erfolgreich validiert!",
      });
    } else {
      // POST kommt nicht von Shaanas Website
      res.status(403).json({ error: "Unzulässige Anfrage" });
    }
  }

  /*
   if (req.method === "GET") {
     return res.status(200).json({
       message: 'GET funktioniert!'
     })
   } 
  */
}






















/*


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
    //const referer = req.headers.referer || req.headers.referrer;
    //const allowedReferer = "https://shaana.netlify.app/kontakt";

    if (referer.startsWith(allowedReferer) === true) {
      // POST kommt von Shaanas Website

      const {
        vorname,
        nachname,
        adresse,
        postleitzahl,
        telefonnummer,
        email,
        geburtstermin,
        versicherung,
        nachricht,
        datenschutz,
      } = req.body;

      function escape(input) {
        // Ersetze alle < und > Zeichen durch ihre HTML-Entities
        input = input.replace(/</g, "&lt;");
        input = input.replace(/>/g, "&gt;");

        // Weitere Bereinigungen oder Ersetzungen können hier hinzugefügt werden

        return input;
      }

      escape(vorname);
      escape(nachname);
      escape(adresse);
      escape(postleitzahl);
      escape(telefonnummer);
      escape(geburtstermin);
      escape(email);
      escape(versicherung);
      escape(nachricht);

      const trimVorname = vorname.trim();
      const trimNachname = nachname.trim();
      const trimAdresse = adresse.trim();
      const trimPlz = postleitzahl.trim();
      const trimTel = telefonnummer.trim();
      const trimEmail = email.trim();
      const trimGeburt = geburtstermin.trim();
      const trimVersicherung = versicherung.trim();
      const trimNachricht = nachricht.trim();

      if (!trimVorname || trimVorname.length > 99 || trimVorname.length < 3) {
        return res.status(400).json({
          error:
            "dein Vorname muss mindestens 3, darf aber nur max 100 Buchstaben haben.",
        });
      }

      if (
        !trimNachname ||
        trimNachname.length > 99 ||
        trimNachname.length < 3
      ) {
        return res.status(400).json({
          error:
            "dein Nachname muss mindestens 3, darf aber nur max 100 Buchstaben haben.",
        });
      }

      if (!trimAdresse || trimAdresse.length > 99 || trimAdresse.length < 4) {
        return res.status(400).json({
          error:
            "deine Adresse muss mindestens 4, darf aber nur max 100 Buchstaben haben",
        });
      }

      if (!trimPlz || trimPlz.length < 5 || trimPlz.length > 5) {
        return res.status(400).json({
          error: "deine Postleitzahl muss aus 5 Ziffern bestehen",
        });
      }

      if (!trimTel || trimTel.length < 6 || trimTel.length > 15) {
        return res.status(400).json({
          error:
            "deine Telefonnummer muss aus mindestens 6 und maximal 16 Ziffern bestehen",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Der RegEx für E-Mail-Adressen

      if (!trimEmail || !emailRegex.test(trimEmail)) {
        return res.status(400).json({
          error: "Ungültige E-Mail-Adresse",
        });
      }

      const currentDate = new Date();

      const tomorrow = new Date();
      tomorrow.setDate(currentDate.getDate() + 1);

      const nextYear = new Date();
      nextYear.setDate(currentDate.getDate() + 365);

      const formatDate = (date) => {
        const year = date.getFullYear(); // Jahr (z.B. 2023)
        const monthNames = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
        const month = monthNames[date.getMonth()]; // Monatsname (z.B. Oct)
        const day = ("0" + date.getDate()).slice(-2); // Tag (01-31)

        return `${year}-${month}-${day}`; // Format YYY-MMM-DDD
      };

      if (
        !trimGeburt ||
        trimGeburt < formatDate(tomorrow) ||
        trimGeburt > formatDate(nextYear)
      ) {
        return res.status(400).json({
          error:
            " Datum muss frühestens dem morgigen Tag und spätestens dem morgigen Tag in einem Jahr entsprechen",
        });
      }

      if (
        !trimVersicherung ||
        trimVersicherung.length < 3 ||
        trimVersicherung > 50
      ) {
        return res.status(400).json({
          error:
            "deine Krankenversicherung muss mindestens 3, darf aber maximal nur 100 Buchstaben haben ",
        });
      }

      if (trimNachricht.length > 140) {
        return res.status(400).json({
          error:
            "deine Nachricht darf nicht mehr als 140 buchstaben enthalten. ",
        });
      }

      if (datenschutz === false) {
        return res.status(400).json({
          error: `bitte lies meine Datenschutzerklärung und bestätige mit einem Klick, dass du diese akzeptierst.`,
        });
      }

      return res.status(200).json({
        message: "Daten erfolgreich validiert!",
      });
    } else {
      // POST kommt nicht von Shaanas Website
      res.status(403).json({ error: "Unzulässige Anfrage" });
    }
  }

  /*
   if (req.method === "GET") {
     return res.status(200).json({
       message: 'GET funktioniert!'
     })
   } 
  *//*
}*/
