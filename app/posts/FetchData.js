import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllPosts, getAllProducts } from "@/store/slices/postSlice";

export default function FetchData() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllProducts());
  }, [dispatch]);
}
