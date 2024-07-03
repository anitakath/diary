// hooks/usePosts.js
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { useUser } from "@/hooks/useUser";


const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export const usePosts = () => {
  const currentFilter = useSelector((state) => state.filter.selectedFilter);
  const { userId } = useUser();
  const [posts, setPosts] = useState(null);
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);


  // Fetch data using SWR
  const { data, error } = useSWR(
    `/api/get-post?filter=${selectedFilter}`,
    fetcher,
    {
      refreshInterval: 200,
      dedupingInterval: 10000,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
    
      if(currentFilter === "deine_posts"){
          const filteredData = data.data.filter(
            (data) => data.userId === userId
          );
    
        setPosts(filteredData)
      }
       setPosts(data.data);
     
    }
  }, [data]);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return { posts, addNewPost };
};
