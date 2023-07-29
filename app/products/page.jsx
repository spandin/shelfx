import "./_index.scss";

import { Table } from "@/components/Products/Table/Table";
import { TopBar } from "@/components/Products/TopBar/TopBar";

export const metadata = {
  title: "Список продуктов - ShelfX",
  description: "",
};

export default function ProductsPage() {
  return (
    <div className="Products w-full">
      <TopBar />
      <Table />
    </div>
  );
}
