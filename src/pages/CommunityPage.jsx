import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import JoinCommunityButton from "../components/Community/JoinCommunityButton";
import MemberList from "../components/Community/MemberList"; // Importação do componente MemberList

function CommunityPage() {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [members, setMembers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "Community", communityId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const communityData = docSnap.data();
        setCommunity(communityData);

        // Buscar os membros da comunidade
        if (communityData.members) {
          const memberRefs = communityData.members;
          const fetchMembers = async () => {
            const membersData = [];
            for (const memberId of memberRefs) {
              const memberDocRef = doc(db, "users", memberId);
              const memberDocSnap = await getDoc(memberDocRef);
              if (memberDocSnap.exists()) {
                membersData.push(memberDocSnap.data());
              }
            }
            setMembers(membersData);
          };

          fetchMembers();
        }
      } else {
        console.log("Comunidade não encontrada!");
      }
    });

    return () => unsubscribe(); // Limpeza do listener
  }, [communityId]);

  return (
    <div className="flex max-w-screen-xl mx-auto p-4">
      {community ? (
        <>
          <div className="w-2/3 pr-4">
            <h1 className="text-2xl font-bold mb-2">{community.title}</h1>
            <p className="mb-4">{community.description}</p>
            <img
              src={community.imageUrl || "https://via.placeholder.com/400"}
              alt={community.title}
              className="w-full rounded-lg mb-4"
            />
            <p>{members.length} membros</p>

            <JoinCommunityButton
              isLoggedIn={isLoggedIn}
              communityId={communityId}
              onMemberJoined={() => {
                // Atualizar membros após a adição
                setMembers((prevMembers) => [...prevMembers, newMember]);
              }}
            />
          </div>

          {/* Exibe a lista de membros na lateral direita */}
          <MemberList members={members} />
        </>
      ) : (
        <p className="text-center mt-10">Carregando comunidade...</p>
      )}
    </div>
  );
}

export default CommunityPage;
