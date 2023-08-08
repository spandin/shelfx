import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { BsTrash } from "react-icons/bs";
import { IcButton } from "@/components/Button/IcButton/IcButton";

const DeletePost = ({ name, id }) => {
  const router = useRouter();

  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "data", id));
      router.push("/");
    } catch (e) {
      console.log("Delete Product: " + e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-2 px-[3px]">
        <p>Вы действительно хотите удалить?</p>
        <p className="text-sm text-darkG-100">&quot;{name}&quot;</p>
      </div>

      <IcButton
        className="px-3 text-sm"
        icon={<BsTrash />}
        text="Удалить"
        onClick={() => deleteProduct()}
      />
    </div>
  );
};

export { DeletePost };
