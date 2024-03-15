

import { supabase } from "@/services/supabaseClient";




export async function updatePostVotes(req, res) {
  const { postId, type, userId, isUpvoted, isDownvoted, isUpvotedTwice, isDownvotedTwice } = req;
  

  if (!postId || !type || !userId) {
    return res.status(400).json({ error: "postId and type are required" });
  }

        
  let updatedData;
  let existingUserAction;

  const { data, error } = await supabase
    .from("feed_dummy")
    .select("upvotes, downvotes, user_action")
    .eq("id", postId);


  
  


  if (type === "upvotes") {

     if (isDownvoted) {
      // console.log("you have already downvoted this post! please undo your downvote before upvoting");
       return;
     }

     if (existingUserAction && existingUserAction.includes(userId)) {
       //console.log("You have already upvoted this post! you cannot upvote more than once");
     }

    if(isUpvotedTwice){
      //console.log('you have already upvoted this post! you cannot upvote more than once')

      // if the user has already given an upvote and clicks on the upvote button again, his upvote will be canceled
      // also his userId will be removed from the supabasetable so that the user can vote again in the future

      
      const { data, error } = await supabase
        .from("feed_dummy")
        .select("upvotes, user_action")
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
    }
     
    if (isUpvoted && isUpvotedTwice === undefined) {
      //if the user has not yet given an upvote, but would like to give one...

      const { data, error } = await supabase
        .from("feed_dummy")
        .select("upvotes, user_action")
        .eq("id", postId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      //.. then add 1 upvote to the votes cast so far and update the supabase table.

      // At the same time, add the userId to the table to ensure that each user (userId) can only cast one vote

      updatedData = data[0].upvotes + 1;

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

        await supabase
          .from("feed_dummy")
          .update({ total_votes: totalVotes })
          .eq("id", postId);
      }
    }

           
  } else if (type === "downvotes") {


     if (isUpvoted) {
      //console.log("you have already upvoted this post!");
      return;
     }


    if (existingUserAction && existingUserAction.includes(userId)) {
      //console.log("You have already downvoted this post!");
    }

    if(isDownvotedTwice){
      //console.log('you have already downvoted this post!')

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
      //console.log('downvoting this post .... ')



      
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


        await supabase
          .from("feed_dummy")
          .update({ total_votes: totalVotes })
          .eq("id", postId);

     }


  }

 
}

}