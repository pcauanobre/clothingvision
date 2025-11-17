// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
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

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserModel } from "@/models/UserModel";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);

      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data() as Partial<UserModel>;
            setIsAdmin(Boolean(data?.isAdmin));
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.warn("[Auth] erro ao buscar perfil:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

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
    adminFlag: boolean
  ) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: UserModel = {
      uid: cred.user.uid,
      name,
      email,
      phone,
      age,
      isAdmin: adminFlag,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", newUser.uid), newUser);
  }

  async function login(email: string, pass: string, remember: boolean) {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, pass);
  }

  async function logout() {
    await signOut(auth);
  }

  async function sendPasswordReset(email: string) {
    const actionCodeSettings = {
      url: `${typeof window !== "undefined" ? window.location.origin : ""}/reset-password?email=${encodeURIComponent(
        email
      )}`,
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  async function confirmResetPassword(oobCode: string, newPassword: string) {
    await confirmPasswordReset(auth, oobCode, newPassword);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, registerUser, login, logout, sendPasswordReset, confirmResetPassword }}
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
