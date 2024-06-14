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

   
};