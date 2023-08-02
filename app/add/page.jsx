import "./_index.scss";

export const metadata = {
  title: "Добавить продукт - ShelfX",
  description: "",
};

import { AddPost } from "../../components/Forms/Posts/AddPost";
import { TopBar } from "@/components/TopBar/TopBar";

export default function AddProduct() {
  return (
    <div className="AddProduct w-full">
      <TopBar tittle={"Добавить продукт"} />
      <AddPost />
    </div>
  );
}
