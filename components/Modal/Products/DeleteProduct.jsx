import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { MdDelete } from "react-icons/md";
import { IcButton } from "@/components/Button/IcButton/IcButton";

const DeleteProduct = ({ tittle, id }) => {
  const router = useRouter();

  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "products", id));
      router.push("/");
    } catch (e) {
      console.log("Delete Product: " + e.message);
    }
  };

  return (
    <div className=" flex flex-col justify-center gap-[40px]">
      <div>
        <h1 className="px-[3px]">Удаление</h1>
        <p className="px-[3px] text-[16px]">{`Вы действительно хотите удалить ${tittle}?`}</p>
      </div>

      <div className="flex flex-row justify-end gap-5">
        <IcButton
          className="text-[16px] px-3 hover:bg-[#800f00]"
          icon={<MdDelete />}
          text="Удалить"
          onClick={() => deleteProduct()}
        />
      </div>
    </div>
  );
};

export { DeleteProduct };
