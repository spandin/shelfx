import { useDispatch, useSelector } from "react-redux";
import { updatePostMark } from "@/store/slices/postSlice";

import { useAuth } from "@/hooks/use-auth";

import { useDownloadExcel } from "react-export-table-to-excel";
import { filteredPosts } from "../../FilteredPosts";

import { BsFiletypeXls } from "react-icons/bs";
import { IcButton } from "@/components/Button/IcButton/IcButton";

export const Export = ({ tableRef }) => {
  const dispatch = useDispatch();
  const { email } = useAuth();

  const posts = useSelector((state) => state.post.postsArray);
  const { category, isExported } = useSelector((state) => state.filter);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${category}(${isExported})`,
  });

  const setPostMark = () => {
    const allId = filteredPosts(posts, category, isExported).map(
      (post) => post.id,
    );
    try {
      onDownload();
      for (let id of allId) {
        dispatch(updatePostMark(id));
      }
    } catch (e) {
      console.log(`setPostMark`, e.message);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3>Экспорт Excel файла</h3>

      <BsFiletypeXls className="m-auto text-5xl" />
      <p className="text-sm text-darkG-100">
        Внимание при экспорте файла, все записи получат статус
        &apos;Внесён&apos;
      </p>
      <IcButton
        text="Загрузить"
        onClick={
          email === "willstesi@gmail.com" || "marinae2023@pochta.by"
            ? () => setPostMark()
            : () => onDownload()
        }
      />
    </div>
  );
};
