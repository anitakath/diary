


import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  const { filter } = req.query;

  let tableName;

  if (filter === "annes_posts") {
    tableName = "diary_annes_posts";
  } else if (filter === "deine_posts") {
    tableName = "diary_users_feed";
  }

  const { data } = await supabase.from(tableName).select('*').order('id', { ascending: false });

  res.status(200).json({ data });
};