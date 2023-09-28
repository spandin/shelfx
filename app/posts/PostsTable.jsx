"use client";

import "./_index.scss";

import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import FetchData from "./FetchData";
import { filteredPosts } from "./FilteredPosts";

import { BsSearch, BsDownload, BsJustifyLeft } from "react-icons/bs";
import { Modal } from "@/components/Modal/Modal";
import { IcButton } from "@/components/Button/IcButton/IcButton";
import { Search } from "./Modals/Search/Search";
import { Filter } from "./Modals/Filter/Filter";
import { Export } from "./Modals/Export/Export";
import { PostCard } from "./PostCard";

const PostsTable = () => {
  const tableRef = useRef(null);

  const [searchModalActive, setSearchModalActive] = useState(false);
  const [filterModalActive, setFilterModalActive] = useState(false);
  const [downloadModalActive, setDownloadModalActive] = useState(false);

  const posts = useSelector((state) => state.post.postsArray);
  const { category, isExported } = useSelector((state) => state.filter);

  FetchData();

  return (
    <div className="Posts">
      <nav className="Posts__nav flex justify-between py-2 lg:rounded-t-xl lg:py-4">
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
          {filteredPosts(posts, category, isExported).map((post, index) => (
            <PostCard key={post?.id} post={post} number={index + 1} />
          ))}
        </tbody>
      </table>

      <Modal active={downloadModalActive} setActive={setDownloadModalActive}>
        <Export tableRef={tableRef} />
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
