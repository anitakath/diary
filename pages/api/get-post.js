


import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  const { filter } = req.query;



  let tableName;

  if (filter === "annes_posts") {
    tableName = "feed_dummy";
  } else if (filter === "deine_posts") {
    tableName = "users_feed";
  } /*else if (filter === "neu"){
    tableName = "users_images"
  }*/

  const { data } = await supabase.from(tableName).select('*').order('id', { ascending: false });

  res.status(200).json({ data });
};