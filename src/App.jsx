import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import Header from "./components/Header";
import { UserProvider, useUser } from "./components/UserContext";
import CommunityList from "./components/communityList";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
          <CommunityList />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            
            <Route
              path="/create-community"
              element={<ProtectedRoute />}
            />
          </Routes>
          
        </div>
      </Router>
    </UserProvider>
  );
}

// Componente para proteger a rota
function ProtectedRoute() {
  const { user } = useUser(); 

  if (!user) {
    return <Navigate to="/home" />;
  }

  return <CreateCommunityPage />;
}

export default App;
