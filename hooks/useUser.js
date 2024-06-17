import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RedditContext } from "@/context/RedditContext";
import { login } from "@/store/authSlice";

export const useUser = () => {
  const { currentGoogleUser, fetcher } = useContext(RedditContext);
  const currUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGoogleUser) {
      dispatch(login());
    }
  }, [currentGoogleUser]);

  const saveAndUpdateUser = async () => {
    // Logic for updating and saving user data
  };

  return { currentGoogleUser, saveAndUpdateUser };
};
