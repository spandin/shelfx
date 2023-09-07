'use client';

import { useState, useEffect } from 'react';

import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';

import { toastAuthErr } from '@/lib/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsPencilSquare, BsTrash2 } from 'react-icons/bs';
import { IcButton } from '@/components/Button/IcButton/IcButton';
import { DeletePost } from '@/components/Forms/Posts/DeletePost';
import { UpdatePost } from '@/components/Forms/Posts/UpdatePost';
import { Modal } from '@/components/Modal/Modal';
import { TopBar } from '@/components/TopBar/TopBar';

const PostPage = ({ params }) => {
  const { isAuth } = useAuth();
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'data', `${params.id}`), (doc) => {
      setPost(doc.data());
    });
    return () => unsubscribe();
  }, [params.id]);

  return (
    <div className="flex basis-full flex-col">
      <TopBar />
      <div className="flex basis-full flex-col justify-between">
        <div className="rounded-[10px] border-[1px] border-solid border-lightW-400 bg-lightW-200 text-[16px] dark:border-darkV-100 dark:bg-darkV-200">
          <div className="flex flex-col gap-1 rounded-t-[10px] bg-lightW-400 p-4 dark:bg-darkV-400">
            <h3>{post?.name}</h3>
            <p className="text-sm text-darkG-100">{post?.code}</p>
            <div className="flex flex-row justify-between text-sm text-darkG-100">
              <p> {post?.category} </p>
              <p>{post?.quantity} ШТ.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-row justify-between">
              <p>Дата изготовления: {post?.date_1}</p>
              <p>Дата просрочки: {post?.date_2}</p>
            </div>

            <div className="flex flex-row justify-between">
              <p>Добавил: {post?.whoAdded}</p>
              <p>Дата добавления: {post?.dateAdded}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between py-4">
          <IcButton
            className="IcButtonA"
            onClick={isAuth ? () => setUpdateModalActive(true) : toastAuthErr}
            icon={<BsPencilSquare />}
          />
          <IcButton
            className="IcButtonA"
            onClick={isAuth ? () => setDeleteModalActive(true) : toastAuthErr}
            icon={<BsTrash2 />}
          />
        </div>
      </div>

      <Modal active={updateModalActive} setActive={setUpdateModalActive}>
        <UpdatePost post={post} id={params.id} />
      </Modal>

      <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
        <DeletePost name={post?.name} id={params.id} />
      </Modal>

      <ToastContainer limit={1} />
    </div>
  );
};

export { PostPage };
