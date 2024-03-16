


import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  const { filter } = req.query;



  let tableName;

  if (filter === "deine") {
    tableName = "feed_dummy";
  } else if (filter === "beste") {
    tableName = "users_feed";
  }

  const { data } = await supabase.from(tableName).select('*').order('id', { ascending: false });

  res.status(200).json({ data });
};