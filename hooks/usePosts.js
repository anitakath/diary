// hooks/usePosts.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);
  const dispatch = useDispatch();

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
      setPosts(data.data);
    }
  }, [data]);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return { posts, addNewPost };
};
