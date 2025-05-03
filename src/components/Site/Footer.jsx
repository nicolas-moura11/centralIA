import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Community Club</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/sobre" className="hover:underline">Sobre</a>
          <a href="/termos" className="hover:underline">Termos</a>
          <a href="/contato" className="hover:underline">Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
