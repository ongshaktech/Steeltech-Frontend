import { db_firestore } from "../../Hooks/config";
import { getDoc, doc } from "firebase/firestore";
import { AuthLogin } from "../../Hooks/firebaseFuncs";
import { GetCookie } from "./Cookies";
import { useState } from "react";
import { useEffect } from "react";

export const ProtectedRoute = ({ permission, children }) => {
    let [UserPermissions, setUserPermissions] = useState({});

    // Get Permission Lists
    useEffect(
        () => {
            AuthLogin('users', GetCookie('email'), GetCookie('pswd')).then(
                (response) => {
                    if (response[0]) {
                        let access = response[1][0]['access'];

                        const docRef = doc(db_firestore, "permissions", access);
                        getDoc(docRef).then(
                            (docSnap) => {
                                if (docSnap.exists()) {
                                    setUserPermissions(docSnap.data());
                                    console.log(docSnap.data())
                                }
                            }
                        );
                    }
                }
            );
        }, []
    );

    return (
        UserPermissions[permission] ? children : <></>
    );
}