import { PostPage } from "@/components/Posts/PostPage/PostPage";

export const metadata = {
  title: "Продукт - ShelfX",
  description: "",
};

export default function ProductPage({ params }: { params: { id: string } }) {
  return <PostPage params={params} />;
}
