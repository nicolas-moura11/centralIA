import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import Header from "./components/Site/Header";
import { UserProvider, useUser } from "./components/Auth/UserContext";
import CommunityPage from "./pages/CommunityPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Site/Footer";



function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Toaster position="bottom-right" />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create-community" element={<ProtectedRoute />} />
              <Route path="/community/:communityId" element={<CommunityPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}


function ProtectedRoute() {
  const { user } = useUser(); 

  if (!user) {
    return <Navigate to="/home" />;
  }

  return <CreateCommunityPage />;
}

export default App;
