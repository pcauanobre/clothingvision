// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/src/lib/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  User,
} from "firebase/auth";
import { createUserProfile } from "@/src/services/userService";
import { UserModel } from "@/src/models/UserModel";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  registerUser: (
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    isAdmin: boolean
  ) => Promise<void>;
  login: (email: string, pass: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmResetPassword: (oobCode: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      console.log("[Auth] onAuthStateChanged:", !!u, u?.uid ?? null);
    });
    return () => unsub();
  }, []);

  async function registerUser(
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    isAdmin: boolean
  ) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: UserModel = {
      uid: cred.user.uid,
      name,
      email,
      phone,
      age,
      isAdmin,
      createdAt: new Date().toISOString(),
    };
    await createUserProfile(newUser);
  }

  async function login(email: string, pass: string, remember: boolean) {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, pass);
  }

  async function logout() {
    await signOut(auth);
  }

  // envia email com link que redireciona para /reset-password do seu app
  async function sendPasswordReset(email: string) {
    const actionCodeSettings = {
      // coloca o email no continueUrl para facilitar debug e preenchimento
      url: `${window.location.origin}/reset-password?email=${encodeURIComponent(email)}`,
      handleCodeInApp: true,
    };
    console.log("[Auth] sendPasswordReset -> actionCodeSettings.url:", actionCodeSettings.url);
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    console.log("[Auth] password reset enviado para", email);
  }

  async function confirmResetPassword(oobCode: string, newPassword: string) {
    await confirmPasswordReset(auth, oobCode, newPassword);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, registerUser, login, logout, sendPasswordReset, confirmResetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
