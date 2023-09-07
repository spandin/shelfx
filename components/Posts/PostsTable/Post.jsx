import Link from 'next/link';

import { convertRuToUTC } from '@/lib/date';

import Moment from 'react-moment';
import 'moment/locale/ru';
Moment.globalLocale = 'ru';

const Post = ({ post, number }) => {
  return (
    <tr
      id={post?.id}
      className="flex flex-col p-4
                      xl:flex-row xl:justify-between xl:py-2"
    >
      <td className="flex flex-row items-center justify-between xl:hidden">
        <td className="flex flex-row gap-3">
          <td className="td__category rounded-md bg-lightW-400 px-2 py-1 text-xs dark:bg-darkV-200">
            {post?.category}
          </td>
          <td
            className={`${
              post?.isExported ? 'td__exported ' : 'td__noexported'
            } rounded-md bg-lightW-400 px-2 py-1 text-xs dark:bg-darkV-200 xl:hidden`}
          >
            {post?.isExported ? (
              <div className="flex flex-row items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-600"></div>
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

        <td className="text-base text-darkG-100 xl:text-lg xl:text-darkV-400 dark:xl:text-gray-50">
          {post?.code}
        </td>

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

      <td className="mt-2 flex justify-end xl:hidden">
        <Moment className="text-sm text-darkG-100" fromNow>
          {convertRuToUTC(post?.date_2)}
        </Moment>
      </td>
    </tr>
  );
};

export { Post };
