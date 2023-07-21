import "./index.scss";

export const Filter = ({ filterValue }) => {
  return (
    <div className="Filter flex flex-col gap-5 min-w-[275px]">
      <h3 className="Filter px-[3px]">Фильтр таблицы</h3>

      <div className="Filter__radio flex flex-col gap-1">
        <div className="Filter__radio__item">
          <label for="all">Все</label>
          <input
            type="radio"
            name="sort"
            value="all"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="cosmetic">Косметика</label>
          <input
            type="radio"
            name="sort"
            value="cosmetic"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="products">Продукты</label>
          <input
            type="radio"
            name="sort"
            value="products"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="alcohol">Алкоголь</label>
          <input
            type="radio"
            name="sort"
            value="alcohol"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="chemistry">Химия</label>
          <input
            type="radio"
            name="sort"
            value="chemistry"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="other">Другое</label>
          <input
            type="radio"
            name="sort"
            value="other"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="all">Не внесеные</label>
          <input
            type="radio"
            name="sort"
            value="noExported"
            onClick={(e) => filterValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
