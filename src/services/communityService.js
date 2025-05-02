

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCommunities = async () => {
  const querySnapshot = await getDocs(collection(db, "Community"));
  const communities = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return communities;
};