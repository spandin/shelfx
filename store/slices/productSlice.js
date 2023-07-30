import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/lib/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const initialState = { products: [] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state) {
      const q = query(collection(db, "products"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          state.push({ ...doc.data(), id: doc.id });
        });
      });
      return () => unsubscribe();
    },
  },
});

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;
