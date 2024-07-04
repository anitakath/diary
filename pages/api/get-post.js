import { supabase } from "@/services/supabaseClient";

export default async (req, res) => {
  const { filter } = req.query;
  let tableName =
    filter === "annes_posts" ? "diary_annes_posts" : "diary_users_feed";

  const { data } = await supabase
    .from(tableName)
    .select("*")
    .order("id", { ascending: false });

  res.status(200).json({ data });
};
