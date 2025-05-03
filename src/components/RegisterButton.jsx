import React from "react";

function RegisterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Registrar
    </button>
  );
}

export default RegisterButton;
