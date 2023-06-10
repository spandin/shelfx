import './Product.scss';

import { IcButton } from '@/components/IcButton/IcButton';
import { MdEdit, MdDelete } from 'react-icons/md';

export default function Product({ params }) {
  return (
    <div className="Product min-w-sceen flex w-full flex-col">
      <div className="Product__info flex flex-col bg-green-100 p-5 lg:rounded-t-lg">
        <h1>Product {params.id}</h1>
        <p className="text-[12px]">Дата добавления: 00.00.0000</p>
      </div>

      <div className="Product__body flex basis-full bg-darkD-300 p-5">
        My Post{' '}
      </div>

      <div className="Product__toolbar flex gap-4 px-5 py-4 lg:rounded-b-lg">
        <IcButton icon={<MdEdit />} />
        <IcButton icon={<MdDelete />} />
      </div>
    </div>
  );
}
