import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  if (req.method === "POST") {
    const { vorname, email, password } = req.body;

    console.log(req.body)

     const { data , error } = await supabase
     .from("users")
     .insert([
       {
         vorname,
         email,
         password,
       },
     ]);


        if (error) {
          return res.status(500).json({ error: "Datenbankfehler" });
        } else{
             return res.status(400).json({
               error:
                 "jooo",
             });
        }


    return res.status(200).json({
      message: `Daten erfolgreich validiertttt! ${vorname, email, password}`,
    });

  }

    // Übermittle die formData an Supabase
    /*
    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                vorname: vorname,
                email: email,
                password: password,
            },
         ]);

    if (error) {
      return res.status(400).json({ error: "Fehler beim Hinzufügen des Benutzers" });
    }

    return res.status(200).json({ message: "Benutzer erfolgreich hinzugefügt" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }*/
};