
import { supabase } from "@/services/supabaseClient";


export const insertImageToSorage = async() =>{
  
}

export const deleteImageFromStorage = async (images, postId, userId) => {
  const imageToDelete = images.find((image) => image.name === postId);

  if (!imageToDelete) {
    console.error("Bild nicht gefunden");
    return;
  }

  const { data, error } = await supabase.storage
    .from("images")
    .remove([`${userId}/${imageToDelete.name}`]);

  if (error) {
    console.error(
      "Fehler beim Löschen des Eintrags aus dem Storage:",
      error.message
    );
    return;
  }

  //console.log("Bild erfolgreich aus dem Storage gelöscht");
};


