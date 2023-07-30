import "./_index.scss";

export const metadata = {
  title: "Добавить продукт - ShelfX",
  description: "",
};

import { AddProductForm } from "../../components/Forms/Products/AddProductForm";
import { TopBar } from "@/components/TopBar/TopBar";

export default function AddProduct() {
  return (
    <div className="AddProduct w-full">
      <TopBar tittle={"Добавить продукт"} />
      <AddProductForm />
    </div>
  );
}
