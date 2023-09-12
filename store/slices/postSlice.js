import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";

export const getAllPosts = createAsyncThunk("@@posts/getAllPosts", () => {
  const querySnapshot = getDocs(collection(db, "data"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
});

export const addPostToFirebase = createAsyncThunk(
  "@@posts/addPost",
  async (post) => {
    const addPost = await addDoc(collection(db, "data"), post);
    const updatePost = await updateDoc(doc(db, "data", addPost.id), {
      id: addPost.id,
    });
    return addPost, updatePost;
  },
);

export const updatePostInFirebase = createAsyncThunk(
  "@@posts/updatePost",
  async (data) => {
    const updatePost = await updateDoc(doc(db, "data", id), data);
    return updatePost;
  },
);

export const setProductInFirebase = createAsyncThunk(
  "@@products/setProduct",
  async (data) => {
    const setProduct = await setDoc(doc(db, "products", data.code), {
      code: data.code,
      name: data.name,
      category: data.category,
    });
    return setProduct;
  },
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    postsArray: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPostToFirebase.fulfilled, (state, action) => {
        state.postsArray.concat(action.payload);
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.postsArray = action.payload;
      });
  },
});

export default postSlice.reducer;
