// src/App.jsx
import React from "react";
import CommunityList from "./components/communityList";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Comunidades</h1>
      <CommunityList />
    </div>
  );
}

export default App;
