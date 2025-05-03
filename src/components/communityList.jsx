import React, { useState, useEffect } from "react";
import { fetchCommunities } from "../services/communityService.js"; 
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {communities.length > 0 ? (
        communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))
      ) : (
        <p>Nenhuma comunidade encontrada.</p>
      )}
    </div>
  );
}

export default CommunityList;
