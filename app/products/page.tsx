import "./Products.scss";

import { ProductsTable } from "@/components/Products/ProductsTable/ProductsTable";
import { ProductsNav } from "@/components/Products/ProductsNav/ProductsNav";

export const metadata = {
  title: "Лист продуктов - ShelfX",
  description: "",
};

export default function Products() {
  return (
    <div className="Products w-full">
      <ProductsNav />
      <ProductsTable />
    </div>
  );
}
