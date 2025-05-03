import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCommunities = async () => {
  const querySnapshot = await getDocs(collection(db, "Community"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchCommunityById = async (id) => {
  try {
    const docRef = doc(db, "Community", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("Comunidade não encontrada.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar a comunidade:", error);
    return null;
  }
};
