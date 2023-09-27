"use client";

import "./_index.scss";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getAllProducts,
  updatePostMark,
} from "@/store/slices/postSlice";
import { useAuth } from "@/hooks/use-auth";

import { useDownloadExcel } from "react-export-table-to-excel";

import { findInArrayBy, isNotExported } from "@/lib/sort";

import {
  BsSearch,
  BsDownload,
  BsJustifyLeft,
  BsFiletypeXls,
} from "react-icons/bs";
import { Modal } from "../Modal/Modal";
import { IcButton } from "../Button/IcButton/IcButton";
import { Search } from "../Modal/Search/Search";
import { Filter } from "../Modal/Filter/Filter";
import { PostCard } from "./PostCard";

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
  const { category, isExported } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllProducts());
  }, [dispatch]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${category}(${isExported})`,
  });

  const setPostMark = () => {
    const allId = posts.map((post) => post.id);
    try {
      onDownload();
      for (let id of allId) {
        dispatch(updatePostMark(id));
      }
    } catch (e) {
      console.log(`setPostMark`, e.message);
    }
  };

  const filteredPosts = () => {
    switch (category) {
      case "Все":
        if (isExported === "exported") {
          return posts;
        } else {
          return isNotExported(posts);
        }
      case "Косметика":
        if (isExported === "exported") {
          return findInArrayBy(posts, "Косметика");
        } else {
          return isNotExported(findInArrayBy(posts, "Косметика"));
        }
      case "Продукты":
        if (isExported === "exported") {
          return findInArrayBy(posts, "Продукты");
        } else {
          return isNotExported(findInArrayBy(posts, "Продукты"));
        }
      case "Алкоголь":
        if (isExported === "exported") {
          return findInArrayBy(posts, "Алкоголь");
        } else {
          return isNotExported(findInArrayBy(posts, "Алкоголь"));
        }

      case "Химия":
        if (isExported === "exported") {
          return findInArrayBy(posts, "Химия");
        } else {
          return isNotExported(findInArrayBy(posts, "Химия"));
        }

      case "Другое":
        if (isExported === "exported") {
          return findInArrayBy(posts, "Другое");
        } else {
          return isNotExported(findInArrayBy(posts, "Другое"));
        }
      default:
        return posts;
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
          {filteredPosts().map((post, index) => (
            <PostCard key={post?.id} post={post} number={index + 1} />
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
        <Filter />
      </Modal>

      <Modal active={searchModalActive} setActive={setSearchModalActive}>
        <Search />
      </Modal>
    </div>
  );
};

export { PostsTable };
