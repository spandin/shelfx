import { Product } from "@/components/Products/ProductPage/ProductPage";

export const metadata = {
  title: "Продукт - ShelfX",
  description: "",
};

export default function ProductPage({ params }) {
  return <Product params={params} />;
}
