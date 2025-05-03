import React, { useState, useEffect } from "react";

function MemberList({ members }) {
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const fetchMemberAvatars = () => {
      const avatarsData = {};
      members.forEach((member) => {
        
        const email = member.email || "";  
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=0D8ABC&color=fff&size=128`;

        avatarsData[member.id] = avatarUrl;  
      });
      setAvatars(avatarsData);
    };

    if (members?.length > 0) {
      fetchMemberAvatars();
    }
  }, [members]);

  return (
    <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Membros</h2>
      <div className="space-y-4">
        {members?.map((member) => (
          <div key={member.id} className="flex items-center space-x-4">
            <img
              src={avatars[member.id] || "https://via.placeholder.com/40"}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-lg">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberList;
