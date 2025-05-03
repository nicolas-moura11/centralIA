import React, { useState } from "react";
import { AiFillMacCommand } from "react-icons/ai";
import LoginButton from "./LoginButton.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterButton from "./RegisterButton.jsx"; 
import RegisterModal from "./RegisterModal.jsx";   
import { useUser } from "./UserContext";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, setUser } = useUser();
  const auth = getAuth();

  const toggleModal = () => setShowModal(!showModal);
  const toggleRegisterModal = () => setShowRegisterModal(!showRegisterModal);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erro ao sair: ", error);
    }
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <AiFillMacCommand className="text-blue-500" size={25} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Community Club
          </span>
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Abrir menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            
          </ul>
        </div>

        
        <div className="flex space-x-2">
          {!user ? (
            <>
              <LoginButton onClick={toggleModal} />
              <RegisterButton onClick={toggleRegisterModal} />
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Sair
            </button>
          )}
        </div>
      </div>

      {/* Modais */}
      {showModal && <LoginModal isOpen={showModal} onClose={toggleModal} />}
      {showRegisterModal && <RegisterModal isOpen={showRegisterModal} onClose={toggleRegisterModal} />}
    </nav>
  );
}

export default Header;
