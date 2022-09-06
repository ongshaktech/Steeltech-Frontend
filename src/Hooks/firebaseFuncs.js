import { db_firestore, db_realtime } from "./config";
import { ref, onValue } from "firebase/database";
import { Timestamp, addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { useEffect, useState, useRef, useReducer} from "react";
import { onSnapshot, query, where , orderBy, getDocs, limit } from 'firebase/firestore';

// Realtime Database
export const GetData = (path, callback) => {
  const dbRef = ref(db_realtime, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// ------- Firestore Database ---------

export async function AuthLogin (collection_name, email, password) {
    const ref = collection(db_firestore, collection_name);

    const q = query(ref, where('email', '==', email), where('password', '==', password), limit(1));

    const querySnapshot = await getDocs(q);
    
    let items = [];
    querySnapshot.forEach((doc) => {  
      items.push(doc.data());
    });

    return [items.length !== 0, items];
}


export async function FirestoreQuery (collection_name, target, operator, value) {
    const ref = collection(db_firestore, collection_name);
    const q = query(ref, where(target, operator, value));

    const querySnapshot = await getDocs(q);
    let items = [];

    querySnapshot.forEach((doc) => {  
      items.push(doc.data());
    });

    return items;
}


export const useFirestore = (collectionName) => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [response, dispatch] = useReducer(fireStoreReducer, initialState);

    const ref = collection(db_firestore, collectionName);
    

    // dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    // Adding Document to database
    const addDocument = async (doc) => {
        dispatch("IS_LOADING");

        try {
            const creatingDate = timeStamp.fromDate(new Date());
            const addDocument = await addDoc(ref, { ...doc, creatingDate});
            dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addDocument });
        }
        catch (error) {
            dispatch({ type: "ERROR", payload: error.message });
        }
    }

    // update something from firestore database
    const updateDocument = async (id, obj) => {
        dispatch({ type: "IS_PENDING" });
        try {
            const userDoc = doc(ref, id);
            const newField = obj;
            const updated = await updateDoc(userDoc, newField);
            dispatchIfNotCancelled({ type: "UPDATE_DOCUMENT", payload: updated });
        }
        catch (error) {
            dispatch({ type: "ERROR", payload: error.message });
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, response, updateDocument };
}


// Firestore Collection

export const useCollection = (collectionName, _query, _orderBy) => {
    const [document, setDocument] = useState([]);
    let [isLoading, setIsLoading] = useState(false);

    const currentQuery = useRef(_query).current;
    let orderB = useRef(_orderBy).current;

    useEffect(() => {
        let ref = collection(db_firestore, collectionName);

        if(currentQuery) {
            ref = query(ref, where(...currentQuery), orderBy("createdAt","desc"));
        }

        setIsLoading(true);

        const unSubscribe = onSnapshot(ref, (snapshot) => {
            let result = [];
            snapshot.docs.forEach(doc => {
                result.push({ ...doc.data(), id: doc.id });
            })
            setDocument(result);
            setIsLoading(false);
        })

        return () => unSubscribe()
    }, [collectionName, currentQuery, orderB]);

    return { document, isLoading };
};



// ----------- Init Variables ---------

const timeStamp = Timestamp;

const initialState = {
    document: null,
    error: null,
    isLoading: null,
    success: null
}

const fireStoreReducer = (state, { type, payload }) => {
    switch (type) {
        case "IS_LOADING":
            return { document: null, error: null, isLoading: true, success: null }

        case "ADD_DOCUMENT":
            return { document: payload, error: null, isLoading: false, success: true }

        case "UPDATE_DOCUMENT":
            return { document: payload, error: null, isLoading: false, success: true }

        case "ERROR":
            return { document: null, error: payload, isLoading: false, success: false }

        default:
            return state
    }
}
