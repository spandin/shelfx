import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { IcButton } from "@/components/Button/IcButton/IcButton";

const DeletePost = ({ name, id }) => {
  const router = useRouter();

  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "data", id));
      router.push("/");
    } catch (e) {
      console.log("Delete Post: " + e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-2 px-[3px]">
        <h3>Вы действительно хотите удалить?</h3>
        <p className="text-sm text-darkG-100">&quot;{name}&quot;</p>
      </div>

      <IcButton
        className="px-3 text-sm"
        text="Удалить"
        onClick={() => deletePost()}
      />
    </div>
  );
};

export { DeletePost };
