import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { MdDelete } from "react-icons/md";
import { IcButton } from "@/components/Button/IcButton/IcButton";

const DeleteProduct = ({ name, id }) => {
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
        <h2 className="px-[3px]">Удаление</h2>
        <p className="px-[3px] text-[16px]">
          Вы действительно хотите удалить
          <span className="px-2 text-[#c44c3c]">&quot;{name}&quot;</span>?
        </p>
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
