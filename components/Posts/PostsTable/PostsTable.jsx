"use client";

import "./_index.scss";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDownloadExcel } from "react-export-table-to-excel";

import { getAllPosts } from "@/store/slices/postSlice";

import { db } from "@/lib/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

import { findInArrayBy, sortArrayByDate, isNotExported } from "@/lib/sort";

import {
  BsSearch,
  BsDownload,
  BsJustifyLeft,
  BsFiletypeXls,
} from "react-icons/bs";
import { Modal } from "@/components/Modal/Modal";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { Search } from "@/components/Modal/Search/Search";
import { Filter } from "@/components/Modal/Filter/Filter";
import { Post } from "@/components/Posts/PostsTable/Post";

import Moment from "react-moment";
import "moment/locale/ru";

Moment.globalLocale = "ru";

const PostsTable = () => {
  const dispatch = useDispatch();

  const tableRef = useRef(null);

  const { email } = useAuth();

  const [searchModalActive, setSearchModalActive] = useState(false);
  const [filterModalActive, setFilterModalActive] = useState(false);
  const [downloadModalActive, setDownloadModalActive] = useState(false);

  const posts = useSelector((state) => state.post.postsArray);

  const [categoryValue, setCategoryValue] = useState("all");
  const [exportedValue, setExportedValue] = useState("exported");

  useEffect(() => {
    dispatch(getAllPosts());

    sortArrayByDate(posts);

    switch (categoryValue) {
      case "all":
        if (exportedValue === "exported") {
          return posts;
        } else {
          return isNotExported(posts);
        }
      case "cosmetic":
        if (exportedValue === "exported") {
          return findInArrayBy(posts, "Косметика");
        } else {
          return isNotExported(findInArrayBy(posts, "Косметика"));
        }
      case "products":
        if (exportedValue === "exported") {
          return findInArrayBy(posts, "Продукты");
        } else {
          return isNotExported(findInArrayBy(posts, "Продукты"));
        }
      case "alcohol":
        if (exportedValue === "exported") {
          return findInArrayBy(posts, "Алкоголь");
        } else {
          return isNotExported(findInArrayBy(posts, "Алкоголь"));
        }

      case "chemistry":
        if (exportedValue === "exported") {
          return findInArrayBy(posts, "Химия");
        } else {
          return isNotExported(findInArrayBy(posts, "Химия"));
        }

      case "other":
        if (exportedValue === "exported") {
          return findInArrayBy(posts, "Другое");
        } else {
          return isNotExported(findInArrayBy(posts, "Другое"));
        }
      default:
        return posts;
    }
  }, [dispatch, posts, exportedValue, categoryValue]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${categoryValue}(${exportedValue})`,
  });

  const setPostMark = async () => {
    const allId = posts.map((post) => post?.id);
    try {
      onDownload();
      for (const id of allId) {
        await updateDoc(doc(db, "data", id), {
          isExported: true,
          exportedDate: new Date().toLocaleDateString("ru-Ru"),
          whoExported: email,
        });
      }
    } catch (e) {
      console.log(`setPostMark`, e.message);
    }
  };

  return (
    <div className="Posts">
      <nav className="Posts__nav flex justify-between py-4 lg:rounded-t-xl lg:py-4 ">
        <div className="flex flex-row gap-3">
          <IcButton
            className="IcButtonA"
            onClick={() => setDownloadModalActive(true)}
            icon={<BsDownload />}
            text="Экспорт Excel"
          />
        </div>
        <div className="flex flex-row gap-3">
          <IcButton
            className="IcButtonA"
            onClick={() => setFilterModalActive(true)}
            icon={<BsJustifyLeft />}
            text="Фильтр"
          />
          <IcButton
            className="IcButtonA"
            onClick={() => setSearchModalActive(true)}
            icon={<BsSearch />}
          />
        </div>
      </nav>

      <table className="w-full" ref={tableRef}>
        <tbody className="flex w-full flex-col gap-2">
          {posts.map((post, index) => (
            <Post key={post?.id} post={post} number={index + 1} />
          ))}
        </tbody>
      </table>

      <Modal active={downloadModalActive} setActive={setDownloadModalActive}>
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
              email === "willstesi@gmail.com" && "marinka.e@shelfx.by"
                ? () => setPostMark()
                : () => onDownload()
            }
          />
        </div>
      </Modal>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <Filter
          categoryValue={setCategoryValue}
          exportedValue={setExportedValue}
        />
      </Modal>

      <Modal active={searchModalActive} setActive={setSearchModalActive}>
        <Search />
      </Modal>
    </div>
  );
};

export { PostsTable };
