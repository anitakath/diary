
import { supabase } from "@/services/supabaseClient";
import { useState } from "react";




export async function updatePostVotes(req, res) {
  const { postId, type, userId, isUpvoted, isDownvoted, isUpvotedTwice, isDownvotedTwice } = req;
  console.log(postId);
  console.log(type);
  console.log(userId)



  console.log(isUpvoted)
  console.log(isDownvoted)


  console.log(isUpvotedTwice)
  console.log(isDownvotedTwice)
  

  if (!postId || !type || !userId) {
    return res.status(400).json({ error: "postId and type are required" });
  }





  const { data, error } = await supabase
          .from("feed_dummy")
          .select("upvotes, downvotes, user_action")
          .eq("id", postId);



  const upvotes = data[0].upvotes;
  const downvotes = data[0].downvotes;
  const originvotes = upvotes - downvotes;
  console.log(originvotes);

  const existingUserAction = data[0].user_action;
  console.log(existingUserAction);

        
  let updatedData;
  let totalVotes;


  if (type === "upvotes") {

     if (isDownvoted) {
       console.log("you have already downvoted this post!");

       return;
     }

     if (existingUserAction && existingUserAction.includes(userId)) {
       console.log("You have already upvoted this post!");
       return;
     }

    if(isUpvotedTwice){
      console.log('you have already upvoted this post!')



       const { data, error } = await supabase
         .from("feed_dummy")
         .select("upvotes, user_action") // wähle alle columns aus
         .eq("id", postId);

       if (error) {
         return res.status(500).json({ error: error.message });
       }




      updatedData = data[0].upvotes - 1;
      


       const { newData, updateError } = await supabase
         .from("feed_dummy")
         .update({ 
           upvotes: updatedData,
           user_action: null,
        })
         .eq("id", postId);


    
    } else if (isUpvoted && isUpvotedTwice === undefined) {

      console.log('upvoting this post....')

    // ziehe den Wert aus der Table und addiere 1 upvote hinzu

    const { data, error } = await supabase
      .from("feed_dummy")
      .select("upvotes, user_action") // wähle alle columns aus

      .eq("id", postId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
   



    updatedData = data[0].upvotes + 1;
    

    // übergib Wert + 1  an die supabase table

    const { newData, updateError } = await supabase
      .from("feed_dummy")
      .update({
        upvotes: updatedData,
        user_action: userId + "_up",
      })
      .eq("id", postId);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      } else {

  // berechne den totalVote aus den aktualisierten upvotes - downvotes 


      const { data, error } = await supabase
      .from("feed_dummy")
      .select("upvotes, downvotes")
      .eq("id", postId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

    const upvotes = data[0].upvotes;
    const downvotes = data[0].downvotes;
    const totalVotes = upvotes - downvotes;
    //console.log(totalVotes);

    const { newData, updateError } = await supabase
      .from("feed_dummy")
      .update({ total_votes: totalVotes })
      .eq("id", postId);
    }

    }

           
  } else if (type === "downvotes") {


     if (isUpvoted) {
       console.log("you have already upvoted this post!");
        return;
     }


    if (existingUserAction && existingUserAction.includes(userId)) {
      console.log("You have already downvoted this post!");
      return;
    }

     if(isDownvotedTwice){
       console.log('you have already downvoted this post!')

       const { data, error } = await supabase
         .from("feed_dummy")
         .select("downvotes, user_action") // wähle alle columns aus
         .eq("id", postId);

       if (error) {
         return res.status(500).json({ error: error.message });
       }

       updatedData = data[0].downvotes - 1;

       const { newData, updateError } = await supabase
         .from("feed_dummy")
         .update({ 
           downvotes: updatedData,
           user_action: null
        })
         .eq("id", postId);
     }

     if(isDownvoted && isDownvotedTwice === undefined){
       console.log('downvoting this post .... ')



       const { data, error } = await supabase
         .from("feed_dummy")
         .select("downvotes, user_action") // wähle alle columns aus
         .eq("id", postId);

       if (error) {
         return res.status(500).json({ error: error.message });
       }

       updatedData = data[0].downvotes + 1;

       const { newData, updateError } = await supabase
         .from("feed_dummy")
         .update({
           downvotes: updatedData,
           user_action: userId + "_down",
         })
         .eq("id", postId);


           if (updateError) {
        return res.status(500).json({ error: updateError.message });
        } else {


          const { data, error } = await supabase
          .from("feed_dummy")
          .select("upvotes, downvotes")
          .eq("id", postId);



        const upvotes = data[0].upvotes;
        const downvotes = data[0].downvotes;
        const totalVotes = upvotes - downvotes;
        console.log(totalVotes);

        const { newData, updateError } = await supabase
          .from("feed_dummy")
          .update({ total_votes: totalVotes })
          .eq("id", postId);

     }


  }

 
}

}