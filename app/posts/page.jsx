import "./_index.scss";

import { PostsTable } from "@/components/Posts/PostsTable";
import { TopBar } from "@/components/Posts/TopBar/TopBar";

export const metadata = {
  title: "Список продуктов - ShelfX",
  description: "",
};

export default function ProductsPage() {
  return (
    <div className="Posts w-full">
      <TopBar />
      <PostsTable />
    </div>
  );
}
