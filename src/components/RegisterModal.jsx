// src/components/RegisterModal.jsx
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import { collection, query, where, getDocs } from "firebase/firestore";

function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const firebaseErrorsPT = {
    "auth/email-already-in-use": "Este e-mail já está em uso.",
    "auth/invalid-email": "O e-mail digitado não é válido.",
    "auth/weak-password": "A senha é muito fraca. Use pelo menos 6 caracteres.",
    "auth/missing-password": "Você precisa informar uma senha.",
    "auth/missing-email": "Você precisa informar um e-mail.",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();
  
    try {
      const q = query(collection(db, "users"), where("name", "==", formData.name));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        setError("Este nome de usuário já está em uso.");
        return;
      }
  
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
  
      let photoURL = "";
      if (formData.file) {
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
        await uploadBytes(storageRef, formData.file);
        photoURL = await getDownloadURL(storageRef);
      }
  
      await updateProfile(user, {
        displayName: formData.name,
        photoURL,
      });
  
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        photoURL,
        createdAt: new Date(),
      });
  
      onClose();
    } catch (err) {
      const friendlyMessage =
        firebaseErrorsPT[err.code] || "Ocorreu um erro inesperado. Tente novamente.";
      setError(friendlyMessage);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.2)]"
      aria-labelledby="register-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Crie sua conta
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nome de usuário
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Foto de perfil (opcional)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-200"
          >
            Registrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{" "}
            <a
              href="#"
              onClick={onClose}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
