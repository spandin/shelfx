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
      <div className="flex flex-col gap-6">
        <h3>Cтатистика</h3>
        <div className="flex max-w-xl justify-center">
          <ProductsByCategory />
        </div>
      </div>
    </div>
  );
}
