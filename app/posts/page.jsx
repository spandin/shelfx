import "./_index.scss";

import { PostsTable } from "./PostsTable";
import { TopBar } from "./TopBar";

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
