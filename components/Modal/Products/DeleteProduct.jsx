import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

import { MdDelete } from "react-icons/md";
import { IcButton } from "@/components/Button/IcButton/IcButton";

const DeleteProduct = ({ name, id }) => {
  const router = useRouter();
  const { user } = UserAuth();

  const deleteProduct = async () => {
    try {
      await updateDoc(doc(db, "products", id), {
        isActive: false,
        dateDeactivated: new Date().toLocaleDateString("ru-Ru"),
        whoDeactivated: user.email,
      }),
        router.push("/");
    } catch (e) {
      console.log("Delete Product: " + e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <h3 className="px-[3px]">Удаление</h3>
      <p className="px-[3px] text-[16px]">
        Вы действительно хотите удалить
        <span className="px-2 text-[#c44c3c]">&quot;{name}&quot;</span>?
      </p>

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
