import './_index.scss';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { db } from '@/lib/firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

export const Search = () => {
  const [searchVariant, setSearchVariant] = useState('bar-code');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'data'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];

      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      const results = data.filter((product) => {
        if (searchVariant === 'name') {
          console.log(product.name.toLowerCase().includes(searchTerm));
          return product.name.toLowerCase().includes(searchTerm);
        } else {
          return String(product.code)
            .split('')
            .reverse()
            .join('')
            .includes(searchTerm.split('').reverse().join(''));
        }
      });

      setSearchResults(results);
    });
    return () => unsubscribe();
  }, [searchTerm, searchVariant]);

  return (
    <div className="Search flex max-h-screen flex-col gap-5">
      <h3 className="Search px-[3px]">Поиск продукта</h3>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-3 px-1 text-sm text-darkG-100">
          <span
            className={`${searchVariant === 'name' && 'text-gray-50'} hover:underline `}
            onClick={() => setSearchVariant('name')}
          >
            по имени
          </span>
          <span
            className={`${searchVariant === 'bar-code' && 'text-gray-50'} hover:underline`}
            onClick={() => setSearchVariant('bar-code')}
          >
            по штрих коду
          </span>
        </div>

        <input
          className="min-w-[280px]"
          type={searchVariant === 'name' ? 'text' : 'number'}
          placeholder={
            searchVariant === 'name' ? 'Введите название товара' : 'Введите 4 любые цифры товара'
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <div className="flex flex-col gap-1">
        {searchTerm.length >= 4
          ? searchResults.map((item) => (
              <div key={item.id} className="Search__item flex flex-col gap-0">
                <Link href={`posts/${item.id}`}>
                  {item.name} - {item.quantity} шт.{' '}
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
