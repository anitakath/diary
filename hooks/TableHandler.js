
import { supabase } from "@/services/supabaseClient";


export const deleteEntryFromTable = async (postId) => {
  const { data, error } = await supabase.from("diary_usersImages").select("*");

  if (error) {
    console.error(
      "Fehler beim Abrufen der Daten aus der tabelle:",
      error.message
    );
    return;
  }

  const objectToDelete = data.find((post) => post.imageId === postId);

  if (!objectToDelete) {
    console.error("Objekt nicht gefunden");
    return;
  }

  // Objekt aus der Tabelle löschen
  const { data: deleteData, deleteError } = await supabase
    .from("diary_usersImages")
    .delete()
    .eq("imageId", postId);

  if (deleteError) {
    console.error(
      "Fehler beim Löschen des Objekts aus der Tabelle:",
      deleteError.message
    );
    return;
  }

  console.log("Objekt erfolgreich aus der Table gelöscht");
};