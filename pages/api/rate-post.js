
import { supabase } from "@/services/supabaseClient";
import { useState } from "react";




export async function updatePostVotes(req, res) {
  const { postId, type, userId, isUpvoted, isDownvoted, isUpvotedTwice, isDownvotedTwice } = req;
  console.log(postId);
  console.log(type);



  console.log(isUpvoted)
  console.log(isDownvoted)


  console.log(isUpvotedTwice)
  console.log(isDownvotedTwice)
  

  if (!postId || !type || !userId) {
    return res.status(400).json({ error: "postId and type are required" });
  }

  const { data, error } = await supabase
          .from("feed_dummy")
          .select("upvotes, downvotes")
          .eq("id", postId);



        const upvotes = data[0].upvotes;
        const downvotes = data[0].downvotes;
        const originvotes = upvotes - downvotes;
        console.log(originvotes);

        
  let updatedData;
  let totalVotes;


  if (type === "upvotes") {

    if(isUpvoted && isUpvotedTwice){
      console.log('you have already upvoted this post!')
      return
    } else if (isUpvoted && isUpvotedTwice === undefined) {

      console.log('upvoting this post....')

    // ziehe den Wert aus der Table und addiere 1 upvote hinzu

    const { data, error } = await supabase
      .from("feed_dummy")
      .select("upvotes") // wähle alle columns aus

      .eq("id", postId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //console.log(data[0].upvotes);


      if(isUpvoted && isDownvoted){
         updatedData = data[0].upvotes + 2;
      } else{
         updatedData = data[0].upvotes + 1;
      }

    //console.log(updatedData);

    // übergib Wert + 1  an die supabase table

    const { newData, updateError } = await supabase
      .from("feed_dummy")
      .update({ upvotes: updatedData })
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


    if(isDownvoted && isDownvotedTwice){
      console.log('you have already downvoted this post!')
      return;
 
    } else if (isDownvoted && isDownvotedTwice === undefined) {

      console.log('downvoting this post...')
      const { data, error } = await supabase
        .from("feed_dummy")
        .select("downvotes") // wähle alle columns aus
        .eq("id", postId);

      console.log(data[0].downvotes);

      if(isUpvoted && isDownvoted){
         updatedData = data[0].downvotes + 2;
      } else{
         updatedData = data[0].downvotes + 1;
      }
     
      console.log(updatedData);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const { newData, updateError } = await supabase
        .from("feed_dummy")
        .update({ downvotes: updatedData })
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

