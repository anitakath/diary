import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RedditContext } from "@/context/RedditContext";
import { login } from "@/store/authSlice";
import { fetchCurrentGoogleUser } from "@/store/userSlice";

export const useUser = () => {
  //const { currentGoogleUser, fetcher } = useContext(RedditContext);
  const currUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const currentGoogleUser = useSelector(
    (state) => state.user.currentGoogleUser
  );

  const currentUser = useSelector((state) => state.user.currentUser);

  const [userId, setUserId] = useState(null);

  // Rufe die Funktion fetchCurrentGoogleUser auf, um den aktuellen Google-Benutzer zu setzen

  useEffect(() => {
    dispatch(fetchCurrentGoogleUser());
  }, []);

  useEffect(() => {
    if (currentGoogleUser) {
      dispatch(login());
    }
  }, [currentGoogleUser]);

  useEffect(() => {
    if (currentGoogleUser) {
      setUserId(currentGoogleUser.user.id);
    } else if (currentUser) {
      setUserId(currentUser.id);
    }
  }, [currentGoogleUser, currentUser]);

  const saveAndUpdateUser = async () => {
    if (Object.keys(currUser).length === 0) {
      console.log("currUser is empty (login/registration)");
      return;
    } else if (Object.keys(currUser).length != 0) {
      console.log("logic to update...and save ...");
    } else if (!currentGoogleUser) {
      return;
    } else if (currentGoogleUser) {
      const { data: existingUserData } = await supabase
        .from("users")
        .select("*")
        .eq("email", currentGoogleUser.user.identities[0].identity_data.email);

      if (existingUserData.length > 0) {
        console.log(" if => user exists @ supabase users ");
        // Der Benutzer existiert bereits - führe ein Update durch
        await supabase
          .from("users")
          .update({
            name: currentGoogleUser.user.identities[0].identity_data.name,
            profileImage:
              currentGoogleUser.user.identities[0].identity_data.picture,
          })
          .eq(
            "email",
            currentGoogleUser.user.identities[0].identity_data.email
          );
      } else {
        //console.log(" else => user did not exist @ supabase users ");
        // Der Benutzer existiert noch nicht - füge ihn hinzu
        await supabase.from("users").upsert(
          {
            email: currentGoogleUser.user.identities[0].identity_data.email,
            name: currentGoogleUser.user.identities[0].identity_data.name,
            profileImage:
              currentGoogleUser.user.identities[0].identity_data.picture,
          },
          {
            onConflict: "email",
          }
        );
      }
    }
  };

  return { currentGoogleUser, saveAndUpdateUser, currentUser, userId };
};