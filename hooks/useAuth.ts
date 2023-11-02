import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      if (user) {
        setUser(user);
      }
    });
  });

  return { user, isLoggedIn };
};

export default useAuth;
