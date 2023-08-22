'use client';

import './_index.scss';

import { useState, useEffect, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Link from 'next/link';

import { db } from '@/lib/firebase';
import { query, collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';

import { findInArrayBy, sortArrayByDate, isNotExported } from '@/lib/sort';

import { BsSearch, BsDownload, BsJustifyLeft } from 'react-icons/bs';
import { Modal } from '@/components/Modal/Modal';
import { IcButton } from '@/components/Button/IcButton/IcButton';
import { Search } from '@/components/Modal/Search/Search';
import { Filter } from '@/components/Modal/Filter/Filter';

const PostsTable = () => {
  const tableRef = useRef(null);
  const { email } = useAuth();

  const [searchModalActive, setSearchModalActive] = useState(false);
  const [filterModalActive, setFilterModalActive] = useState(false);
  const [downloadModalActive, setDownloadModalActive] = useState(false);

  const [categoryValue, setCategoryValue] = useState('all');
  const [exportedValue, setExportedValue] = useState('exported');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'data'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let posts = [];

      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });

      sortArrayByDate(posts);

      switch (categoryValue) {
        case 'all':
          if (exportedValue === 'exported') {
            return setPosts(posts);
          } else {
            return setPosts(isNotExported(posts));
          }
        case 'cosmetic':
          if (exportedValue === 'exported') {
            return setPosts(findInArrayBy(posts, 'Косметика'));
          } else {
            return setPosts(isNotExported(findInArrayBy(posts, 'Косметика')));
          }
        case 'products':
          if (exportedValue === 'exported') {
            return setPosts(findInArrayBy(posts, 'Продукты'));
          } else {
            return setPosts(isNotExported(findInArrayBy(posts, 'Продукты')));
          }
        case 'alcohol':
          if (exportedValue === 'exported') {
            return setPosts(findInArrayBy(posts, 'Алкоголь'));
          } else {
            return setPosts(isNotExported(findInArrayBy(posts, 'Алкоголь')));
          }

        case 'chemistry':
          if (exportedValue === 'exported') {
            return setPosts(findInArrayBy(posts, 'Химия'));
          } else {
            return setPosts(isNotExported(findInArrayBy(posts, 'Химия')));
          }

        case 'other':
          if (exportedValue === 'exported') {
            return setPosts(findInArrayBy(posts, 'Другое'));
          } else {
            return setPosts(isNotExported(findInArrayBy(posts, 'Другое')));
          }
        default:
          setPosts(posts);
      }

      setPosts(posts);
    });
    return () => unsubscribe();
  }, [exportedValue, categoryValue]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${categoryValue}(${exportedValue})`,
  });

  const setProductMark = async () => {
    const allId = posts.map((post) => post?.id);

    try {
      onDownload();
      for (const id of allId) {
        await updateDoc(doc(db, 'data', id), {
          isExported: true,
          exportedDate: new Date().toLocaleDateString('ru-Ru'),
          whoExported: email,
        });
      }
    } catch (e) {
      console.log(`setProductMark`, e.message);
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
            <PostCard key={post?.id} post={post} number={index + 1} />
          ))}
        </tbody>
      </table>

      <Modal active={downloadModalActive} setActive={setDownloadModalActive}>
        <div className="flex flex-col gap-5">
          <h3>Экспорт Excel файла</h3>
          <p className="text-sm text-darkG-100">
            Внимание при экспорте файла, все записи получат статус &apos;Внесён&apos;
          </p>
          <IcButton
            text="Загрузить"
            onClick={
              email === 'willstesi@gmail.com' && 'veronika2023@gmail.com'
                ? () => setProductMark()
                : () => onDownload()
            }
          />
        </div>
      </Modal>

      <Modal active={filterModalActive} setActive={setFilterModalActive}>
        <Filter categoryValue={setCategoryValue} exportedValue={setExportedValue} />
      </Modal>

      <Modal active={searchModalActive} setActive={setSearchModalActive}>
        <Search />
      </Modal>
    </div>
  );
};

const PostCard = ({ post, number }) => {
  return (
    <tr
      id={post?.id}
      className="flex flex-col p-4
                    xl:flex-row xl:justify-between xl:py-2"
    >
      <td className="flex flex-row items-center justify-between xl:hidden">
        <td className="flex flex-row gap-3">
          <td className="td__category rounded-md bg-darkV-100 px-2 py-1 text-xs">
            {post?.category}
          </td>
          <td
            className={`${
              post?.isExported ? 'td__exported ' : 'td__noexported'
            } rounded-md bg-darkV-100 px-2 py-1 text-xs xl:hidden`}
          >
            {post?.isExported ? (
              <div className="flex flex-row items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                <span>Внесён</span>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-800"></div>
                <span>Не внесён</span>
              </div>
            )}
          </td>
        </td>

        <td className="flex text-xs">{post?.quantity} ШТ.</td>
      </td>

      <td
        className="flex flex-col-reverse
                        xl:grid xl:grid-cols-table_g1 xl:gap-4"
      >
        <td className="hidden xl:flex">{number}</td>

        <td className="text-base text-darkG-100 xl:text-lg xl:text-[#fff]">{post?.code}</td>

        <td className="hidden xl:flex">{post?.quantity}</td>

        <td className="mt-2 text-xl xl:mt-0">
          {number}. <Link href={`/posts/${post?.id}`}>{post?.name}</Link>
        </td>
      </td>

      <td
        className="mt-2 flex flex-row justify-between text-sm xl:mt-0 xl:grid 
          xl:grid-cols-table_g2 xl:gap-4 xl:text-lg"
      >
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата изготовления: "
        >
          {post?.date_1}
        </td>
        <td
          className="before:content-[attr(aria-label)] xl:before:hidden"
          aria-label="Дата просрочки: "
        >
          {post?.date_2}
        </td>
      </td>
    </tr>
  );
};

export { PostsTable };
