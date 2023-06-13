import "./Products.scss";

import { ProductsTable } from "@/components/ProductsTable/ProductsTable";

export const metadata = {
  title: "Лист продуктов - ShelfX",
  description: "",
};

export default function Products() {
  return (
    <div className="Products w-full">
      <ProductsTable></ProductsTable>
    </div>
  );
}
