import { PostPage } from "@/components/Post/Post";

export const metadata = {
  title: "Продукт - ShelfX",
  description: "",
};

export default function Post({ params }: { params: { id: string } }) {
  return <PostPage params={params} />;
}
