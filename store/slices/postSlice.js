import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "@/lib/firebase";
import {calcEndOfTerm} from "@/lib/sort"
import {
  collection,
  updateDoc,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";

// GET ALL POSTS --------------------------------------------------------------------------------------------
export const getAllPosts = createAsyncThunk("@@posts/getAllPosts", async () => {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data = querySnapshot.docs.map((doc) => doc.data());

  // for sorting goods by expiration dat
  return data.sort((a, b) => {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

    return (
      new Date(a?.date_2.replace(pattern, "$3-$2-$1")) -
      new Date(b?.date_2.replace(pattern, "$3-$2-$1"))
    );
  });
});

// ADD POST -------------------------------------------------------------------------------------------------
export const addPost = createAsyncThunk(
  "@@posts/addPost",
  async (data, email) =>
    await setDoc(doc(db, "data", docData.id), {
      id:
        email.substring(0, email.lastIndexOf("@")) +
        new Date().toLocaleDateString("ru-Ru") +
        Math.floor(Math.random() * (1000 - 10 + 1) + 10),
      name: data.name,
      category: data.category,
      code: data.code,
      quantity: data.quantity,
      date_1: data.date_1,
      date_2:
        shelfSelect == "date"
          ? data.date_2
          : calcEndOfTerm(data.date_1, data.date_2),
      dateAdded: new Date().toLocaleDateString("ru-Ru"),
      whoAdded: email,
      isExported: false,
    }),
);

// UPDATE POST ----------------------------------------------------------------------------------------------
export const updatePost = createAsyncThunk(
  "@@posts/updatePost",
  async ({ id, data, email }) => {
    // UPDATE IN DATA
    const posts = await getDocs(collection(db, "data"));
    for (let snap of posts.docs) {
      if (snap.id === id) {
        await updateDoc(doc(db, "data", snap.id), {
          name: data.name,
          category: data.category,
          code: data.code,
          date_1: data.date_1,
          date_2: data.date_2,
          quantity: data.quantity,
          dateUpdated: new Date().toLocaleDateString("ru-Ru"),
          whoUpdated: email,
        });
      }
    }

    await setDoc(doc(db, "products", data.code), {
      code: data.code,
      name: data.name,
      category: data.category,
    });

    return { id, data, email };
  },
);

// UPDATE MARK POST ----------------------------------------------------------------------------------------------
export const updatePostMark = createAsyncThunk(
  "@@posts/updatePostMark",
  async (id) => {
    const posts = await getDocs(collection(db, "data"));
    for (let snap of posts.docs) {
      if (snap.id === id) {
        await updateDoc(doc(db, "data", snap.id), {
          isExported: true,
          exportedDate: new Date().toLocaleDateString("ru-Ru"),
        });
      }
    }
    return id;
  },
);

// GET ALL PRODUCTS ------------------------------------------------------------------------------------------
export const getAllProducts = createAsyncThunk(
  "@@posts/getAllProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => doc.data());
  },
);

// SET PRODUCTS ----------------------------------------------------------------------------------------------
export const setProduct = createAsyncThunk(
  "@@products/setProduct",
  async (data) =>
    await setDoc(doc(db, "products", data.code), {
      code: data.code,
      name: data.name,
      category: data.category,
    }),
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    postsArray: [],
    productsArray: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsArray.concat(action.payload);
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.postsArray = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postsArray.concat(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const postIndex = state.postsArray.findIndex(
          (post) => post.id == action.payload.id,
        );
        state.postsArray[postIndex].name = action.payload.data.name;
        state.postsArray[postIndex].category = action.payload.data.category;
        state.postsArray[postIndex].code = action.payload.data.code;
        state.postsArray[postIndex].date_1 = action.payload.data.date_1;
        state.postsArray[postIndex].date_2 = action.payload.data.date_2;
        state.postsArray[postIndex].quantity = action.payload.data.quantity;
      })
      .addCase(updatePostMark.fulfilled, (state, action) => {
        const postIndex = state.postsArray.findIndex(
          (post) => post.id == action.payload,
        );
        state.postsArray[postIndex].isExported = true;
      });
  },
});

export default postSlice.reducer;
