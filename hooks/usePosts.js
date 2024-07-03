// hooks/usePosts.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import { useUser } from "@/hooks/useUser";

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export const usePosts = () => {

  const { userId } = useUser();
  const [posts, setPosts] = useState(null);
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);
  const dispatch = useDispatch();



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
      const filteredData = data.data.filter((data) => data.userId === userId)
      setPosts(filteredData);
    }
  }, [data]);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return { posts, addNewPost };
};
