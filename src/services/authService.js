import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Caminho correto para importar auth

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};