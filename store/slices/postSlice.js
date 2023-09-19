import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "@/lib/firebase";
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
  async (docData) => await setDoc(doc(db, "data", docData.id), docData),
);

// UPDATE MARK POST ----------------------------------------------------------------------------------------------
export const updatePostMark = createAsyncThunk(
  "@@posts/updatePost",
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
      .addCase(addPost.fulfilled, (state, action) => {
        state.postsArray.concat(action.payload);
      })
      .addCase(updatePostMark.fulfilled, (state, action) => {
        const postIndex = state.postsArray.findIndex(
          (post) => post.id == action.payload,
        );
        state.postsArray[postIndex].isExported = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsArray.concat(action.payload);
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.postsArray = action.payload;
      });
  },
});

export default postSlice.reducer;
