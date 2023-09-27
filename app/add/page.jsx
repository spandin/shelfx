import "./_index.scss";

export const metadata = {
  title: "Добавить продукт - ShelfX",
  description: "",
};

import { AddForm } from "./AddForm";
import { TopBar } from "@/components/TopBar/TopBar";

export default function AddProduct() {
  return (
    <div className="AddProduct w-full">
      <TopBar tittle={"Добавить продукт"} />
      <AddForm />
    </div>
  );
}
