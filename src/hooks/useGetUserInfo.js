import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useGetUserInfo() {
  const auth = getAuth();
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUserInfo({
          name: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUserInfo(null)
      }
    });

    return() => unsubscribe();
  }, [auth])
  
  return userInfo;
}
