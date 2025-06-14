import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function CommunityCard({ community }) {
  const navigate = useNavigate();
  const [memberCount, setMemberCount] = useState(community.members?.length || 0);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Community", community.id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMemberCount(data.members?.length || 0);
      }
    });

    return () => unsubscribe();
  }, [community.id]);

  const handleOpenInNewTab = () => {
    window.open(`/community/${community.id}`, "_blank");
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700">
      <a href="#" onClick={handleOpenInNewTab}>
        <img
          className="rounded-t-lg object-cover w-full h-48 transition-transform duration-500 ease-in-out transform hover:scale-105"
          src={community.imageUrl || "https://via.placeholder.com/400"}
          alt={community.title}
        />
      </a>
      <div className="p-5">
        <a href="#" onClick={handleOpenInNewTab}>
          <h5 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {community.title}
          </h5>
        </a>
        <p className="mb-3 text-gray-700 dark:text-gray-400 text-sm">
          {community.description}
        </p>
        <p className="mb-3 text-gray-700 dark:text-gray-400 text-sm">
          Membros: {memberCount}
        </p>
        <button
          onClick={handleOpenInNewTab}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-200 ease-in-out"
        >
          Ver mais
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CommunityCard;
