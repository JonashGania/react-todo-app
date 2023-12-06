import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";


export default function useAuth(){
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserUid(user?.uid);
        })

        return () => unsubscribe();
    }, [])

    return { userUid };
}