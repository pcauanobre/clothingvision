// src/services/productService.ts
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Item } from "@/models/ItemModel";

/**
 * Faz upload de um arquivo para Firebase Storage. Retorna a URL pública.
 * Exportado como named export uploadImageFile
 */
export async function uploadImageFile(file: File): Promise<string> {
  const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, `items/${filename}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

/**
 * Cria um documento na coleção 'items'.
 * Recebe o objeto item sem id/createdAt e devolve o id criado.
 * Exportado como named export createItem
 */
export async function createItem(item: Omit<Item, "id" | "createdAt">) {
  const col = collection(db, "items");
  const payload = {
    ...item,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(col, payload as any);
  return docRef.id;
}
