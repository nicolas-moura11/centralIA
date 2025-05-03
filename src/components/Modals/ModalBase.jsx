import React from "react";

const ModalBase = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          Fechar
        </button>
        {children} 
      </div>
    </div>
  );
};

export default ModalBase;
