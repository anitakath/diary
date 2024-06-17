// hooks/usePosts.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export const usePosts = () => {
  const [myPosts, setMyPosts] = useState(null);
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
      setMyPosts(data.data);
    }
  }, [data]);

  const addNewPost = (newPost) => {
    setMyPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return { myPosts, addNewPost };
};
