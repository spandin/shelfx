import "./_index.scss";

import { ProductsTable } from "@/components/Products/ProductsTable/ProductsTable";

export const metadata = {
  title: "Список продуктов - ShelfX",
  description: "",
};

export default function ProductsPage() {
  return (
    <div className="Products w-full">
      <ProductsTable />
    </div>
  );
}
