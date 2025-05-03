import React from "react";
import CommunityList from "./components/communityList";
import Header from "./components/Header";
import { UserProvider } from "./components/UserContext"; // Certifique-se de importar corretamente o UserProvider

function App() {
  return (
    <UserProvider>
      <div className="">
        <Header />
        <CommunityList />
      </div>
    </UserProvider>
  );
}

export default App;