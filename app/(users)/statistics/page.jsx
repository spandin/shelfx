import "./_index.scss";

import { TopBar } from "@/components/TopBar/TopBar";
import { ProductsByCategory } from "@/components/Statistics/ProductsByCategory";

export const metadata = {
  title: "Статистика - ShelfX",
};

export default function Statistics() {
  return (
    <div className="Statistics w-full">
      <TopBar />
      <div className="flex flex-col gap-5">
        <h3>Cтатистика</h3>
        <ProductsByCategory />
      </div>
    </div>
  );
}
