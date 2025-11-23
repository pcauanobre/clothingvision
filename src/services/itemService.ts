// src/services/itemService.ts
import { Item } from "@/models/ItemModel";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, query, orderBy, updateDoc, deleteDoc } from "firebase/firestore";

function convertDocToItem(id: string, data: any): Item {
  // tenta converter timestamps
  let createdAt = data?.createdAt;
  if (createdAt && createdAt.toDate) {
    try {
      createdAt = createdAt.toDate().toISOString();
    } catch {
      createdAt = String(createdAt);
    }
  }
  return {
    id,
    name: data.name,
    description: data.description,
    imageUrl: data.imageUrl,
    category: data.category,
    price: data.price ?? undefined,
    sizes: data.sizes ?? undefined,
    stock: data.stock ?? undefined,
    createdAt,
  };
}

export const itemService = {
  async getAllItems(): Promise<Item[]> {
    try {
      const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const items: Item[] = snap.docs.map((d) => convertDocToItem(d.id, d.data()));
      return items;
    } catch (err) {
      console.error("itemService.getAllItems error:", err);
      return [];
    }
  },

  async getItemById(id: string): Promise<Item | null> {
    try {
      const dref = doc(db, "items", id);
      const snap = await getDoc(dref);
      if (!snap.exists()) return null;
      return convertDocToItem(snap.id, snap.data());
    } catch (err) {
      console.error("itemService.getItemById error:", err);
      return null;
    }
  },
  async updateItem(id: string, data: Partial<Omit<Item, "id" | "createdAt">>) {
    try {
      const dref = doc(db, "items", id);
      await updateDoc(dref, data as any);
      return true;
    } catch (err) {
      console.error("itemService.updateItem error:", err);
      return false;
    }
  },

  async deleteItem(id: string) {
    try {
      const dref = doc(db, "items", id);
      await deleteDoc(dref);
      return true;
    } catch (err) {
      console.error("itemService.deleteItem error:", err);
      return false;
    }
  },
};
