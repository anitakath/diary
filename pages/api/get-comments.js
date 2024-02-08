import { supabase } from "@/services/supabaseClient";
import { faEquals } from "@fortawesome/free-solid-svg-icons";



export default async (req, res) => {
  try {
    console.log(req.query);

    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("postId", req.query.postId);

    res.status(200).send({ data: data });

    console.log(data);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
};