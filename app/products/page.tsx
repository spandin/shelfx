import "./products_page.scss";

import { ProductsTable } from "@/components/Products/ProductsTable/ProductsTable";
import { ProductsNav } from "@/components/Products/ProductsNav/ProductsNav";

export const metadata = {
  title: "Лист продуктов - ShelfX",
  description: "",
};

export default function ProductsPage() {
  return (
    <div className="Products w-full">
      <ProductsTable />
    </div>
  );
}
