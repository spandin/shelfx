import "./_index.scss";

import { useDispatch } from "react-redux";

import { setCategory, setExported } from "@/store/slices/filterSlice";

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className="Filter flex min-w-[275px] flex-col gap-5">
      <h3 className="Filter px-[3px]">Фильтр таблицы</h3>

      <div className="flex flex-col gap-1">
        <div className="text-sm text-darkG-100">По статусу выгрузки:</div>
        <div className="Exported__toogle">
          <div className="Exported__toogle-item item-1">
            <input
              onClick={(e) => dispatch(setExported(e.target.value))}
              id="fid-1"
              type="radio"
              name="export"
              value="exported"
            />
            <label htmlFor="fid-1">Все</label>
          </div>

          <div className="Exported__toogle-item item-2">
            <input
              onClick={(e) => dispatch(setExported(e.target.value))}
              id="fid-2"
              type="radio"
              name="export"
              value="notExported"
            />
            <label htmlFor="fid-2">Не внесеные</label>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-1">
        <div className="text-sm text-darkG-100">По категориям:</div>

        <div className="Category flex flex-row flex-wrap gap-2">
          <div className="Category-item">
            <input
              id="all"
              type="radio"
              name="category"
              value="Все"
              onClick={(e) => dispatch(setCategory(e.target.value))}
            />
            <label htmlFor="all">Все</label>
          </div>

          <div className="Category-item">
            <input
              id="cosmetic"
              type="radio"
              name="category"
              value="Косметика"
              onClick={(e) => dispatch(setCategory(e.target.value))}
            />
            <label htmlFor="cosmetic">Косметика</label>
          </div>

          <div className="Category-item">
            <input
              id="products"
              type="radio"
              name="category"
              value="Продукты"
              onClick={(e) => dispatch(setCategory(e.target.value))}
            />
            <label htmlFor="products">Продукты</label>
          </div>

          <div className="Category-item">
            <input
              id="alcohol"
              type="radio"
              name="category"
              value="Алкоголь"
              onClick={(e) => dispatch(setCategory(e.target.value))}
            />
            <label htmlFor="alcohol">Алкоголь</label>
          </div>

          <div className="Category-item">
            <input
              id="chemistry"
              type="radio"
              name="category"
              value="Химия"
              onClick={(e) => dispatch(setCategory(e.target.value))}
            />
            <label htmlFor="chemistry">Химия</label>
          </div>

          <div className="Category-item">
            <input
              id="other"
              type="radio"
              name="category"
              value="Другое"
              onClick={(e) => dispatch(setCategory(e.target.value))}
            />
            <label htmlFor="other">Другое</label>
          </div>
        </div>
      </div>
    </div>
  );
};
