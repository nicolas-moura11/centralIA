import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

function JoinCommunityButton({ communityId }) {
  const [isMember, setIsMember] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        const communityRef = doc(db, "Community", communityId);
        const unsubscribeSnap = onSnapshot(communityRef, (docSnap) => {
          const members = docSnap.data()?.members || [];
          setIsMember(members.includes(user.uid));
        });
        return unsubscribeSnap;
      }
    });

    return () => unsubscribe();
  }, [communityId]);

  const handleJoinOrLeave = async () => {
    if (!userId) {
      toast.error("Acesse sua conta para virar membro.");
      return;
    }

    const communityRef = doc(db, "Community", communityId);

    try {
      if (isMember) {
        await updateDoc(communityRef, {
          members: arrayRemove(userId),
        });
        toast.success("Você saiu da comunidade.");
      } else {
        await updateDoc(communityRef, {
          members: arrayUnion(userId),
        });
        toast.success("Você agora é um membro da comunidade!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar a comunidade.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleJoinOrLeave}
      className={`px-4 py-2 text-white rounded-lg transition-all duration-200 ${
        isMember ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {isMember ? "Sair da Comunidade" : "Entrar na Comunidade"}
    </button>
  );
}

export default JoinCommunityButton;
