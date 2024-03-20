

import { supabase } from "@/services/supabaseClient";




export async function updatePostVotes(req, res) {
  const { postId, type, userId, isUpvoted, isDownvoted, isUpvotedTwice, isDownvotedTwice, table } = req;
  

  if (!postId || !type /*|| !userId*/) {
    return res.status(400).json({ error: "postId and type are required" });
  }

        
  let updatedData;
  let existingUserAction;

  const { data, error } = await supabase
    .from(table)
    .select("upvotes, downvotes, user_action")
    .eq("id", postId);


  
  if (type === "upvotes") {

     if (isDownvoted) {
       //console.log("you have already downvoted this post! please undo your downvote before upvoting");
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
        .from(table)
        .select("upvotes, user_action")
        .eq("id", postId);


      if (error) {
        return res.status(500).json({ error: error.message });
      }

      updatedData = data[0].upvotes - 1;

      const { newData, updateError } = await supabase
        .from(table)
        .update({
          upvotes: updatedData,
          user_action: null,
        })
        .eq("id", postId);

     
    }
     
    if (isUpvoted && isUpvotedTwice === undefined) {
      //if the user has not yet given an upvote, but would like to give one...

     

      const { data, error } = await supabase
        .from(table)
        .select("upvotes, user_action")
        .eq("id", postId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Überprüfen, ob user_action existiert und gleich userId + "_up" ist
      if (data[0].user_action && data[0].user_action === userId + "_up") {
        // Wenn user_action existiert und gleich userId + "_up" ist, dann wurde bereits ein Upvote abgegeben
        //console.log("User hat bereits einen Upvote abgegeben");
      } else{


      updatedData = data[0].upvotes + 1;

      const { newData, updateError } = await supabase
        .from(table)
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
            .from(table)
            .select("upvotes, downvotes")
            .eq("id", postId);

          if (error) {
              return res.status(500).json({ error: error.message });
          }

          const upvotes = data[0].upvotes;
          const downvotes = data[0].downvotes;
          const totalVotes = upvotes - downvotes;

          await supabase
            .from(table)
              .update({ total_votes: totalVotes })
              .eq("id", postId);
        }


     

      
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

        .from(table)
        .select("downvotes, user_action") // wähle alle columns aus
        .eq("id", postId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      
       
      updatedData = data[0].downvotes - 1;

      const { newData, updateError } = await supabase
        .from(table)
        .update({
          downvotes: updatedData,
          user_action: null,
        })
        .eq("id", postId);
     }

     if(isDownvoted && isDownvotedTwice === undefined){
      //console.log('downvoting this post .... ')



      if (data[0].user_action && data[0].user_action === userId + "_down") {
        // Wenn user_action existiert und gleich userId + "_up" ist, dann wurde bereits ein Upvote abgegeben
        //console.log("User hat bereits einen Downvote abgegeben");
      } else{

           const { data, error } = await supabase
             .from(table)
             .select("downvotes, user_action") // wähle alle columns aus
             .eq("id", postId);

           if (error) {
             return res.status(500).json({ error: error.message });
           }

           updatedData = data[0].downvotes + 1;

           const { newData, updateError } = await supabase
             .from(table)
             .update({
               downvotes: updatedData,
               user_action: userId + "_down",
             })
             .eq("id", postId);

           if (updateError) {
             return res.status(500).json({ error: updateError.message });
           } else {
             const { data, error } = await supabase
               .from(table)
               .select("upvotes, downvotes")
               .eq("id", postId);

             const upvotes = data[0].upvotes;
             const downvotes = data[0].downvotes;
             const totalVotes = upvotes - downvotes;



            await supabase
              .from(table)
              .update({ total_votes: totalVotes })
              .eq("id", postId);
           }
      
    



      }


  }

 
}

}