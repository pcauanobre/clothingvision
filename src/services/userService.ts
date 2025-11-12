// src/services/userService.ts
import { db } from "@/src/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserModel } from "@/src/models/UserModel";

export async function createUserProfile(user: UserModel) {
  await setDoc(doc(db, "users", user.uid), user);
}
