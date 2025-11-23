// src/services/productService.ts
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

/**
 * Atualiza um item existente na coleção 'items'.
 * Recebe o id do documento e um objeto parcial com os campos a serem atualizados.
 */
export async function updateItem(id: string, data: Partial<Omit<Item, "id" | "createdAt">>) {
  try {
    const dref = doc(db, "items", id);
    // não sobrescreve createdAt
    const payload = { ...data } as any;
    await updateDoc(dref, payload);
    console.log("✅ Produto atualizado no Firestore:", id, payload);
    return true;
  } catch (err) {
    console.error("❌ Erro ao atualizar no Firestore:", err);
    throw err;
  }
}

/**
 * Deleta um documento da coleção 'items' pelo id.
 */
export async function deleteItem(id: string) {
  const dref = doc(db, "items", id);
  await deleteDoc(dref);
}
