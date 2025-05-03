import React, { useState, useEffect } from "react";
import { fetchCommunities } from "../../services/communityService.js"; 
import CommunityCard from "./communityCard.jsx";

function CommunityList() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCommunities();
      setCommunities(data);
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Explore Comunidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {communities.length > 0 ? (
          communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))
        ) : (
          <p className="text-center text-gray-600">Nenhuma comunidade encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default CommunityList;
