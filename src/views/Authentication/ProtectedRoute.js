import { db_firestore } from "../../Hooks/config";
import { getDoc, doc } from "firebase/firestore";
import { AuthLogin } from "../../Hooks/firebaseFuncs";
import { GetCookie } from "./Cookies";
import { useState } from "react";
import { useEffect } from "react";
import { Triangle } from "react-loader-spinner";

export const ProtectedRoute = ({ permission, children }) => {
    let [UserPermissions, setUserPermissions] = useState({});

    // Get Permission Lists
    // If permission is `true`, then render the children
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
                                }
                            }
                        );
                    }
                }
            );
        }, []
    );

    return (
        UserPermissions[permission] ?
            children :
            <div className="loadingSpinner">
                <Triangle
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    visible={true} />
            </div>
    );
}