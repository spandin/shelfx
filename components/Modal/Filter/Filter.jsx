import "./_index.scss";

export const Filter = ({ categoryValue, exportedValue }) => {
  return (
    <div className="Filter flex flex-col gap-5 min-w-[275px]">
      <h3 className="Filter px-[3px]">Фильтр таблицы</h3>

      <div class="Exported__toogle">
        <div class="Exported__toogle-item item-1">
          <input
            onClick={(e) => exportedValue(e.target.value)}
            id="fid-1"
            type="radio"
            name="radio"
            value="exported"
          />
          <label for="fid-1">Все</label>
        </div>
        <div class="Exported__toogle-item item-2">
          <input
            onClick={(e) => exportedValue(e.target.value)}
            id="fid-2"
            type="radio"
            name="radio"
            value="notExported"
          />
          <label for="fid-2">Не внесеные</label>
        </div>
      </div>

      <div className="Filter__radio flex flex-col gap-1">
        <div className="Filter__radio__item">
          <label for="cosmetic">Косметика</label>
          <input
            type="radio"
            name="sort"
            value="cosmetic"
            onClick={(e) => categoryValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="products">Продукты</label>
          <input
            type="radio"
            name="sort"
            value="products"
            onClick={(e) => categoryValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="alcohol">Алкоголь</label>
          <input
            type="radio"
            name="sort"
            value="alcohol"
            onClick={(e) => categoryValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="chemistry">Химия</label>
          <input
            type="radio"
            name="sort"
            value="chemistry"
            onClick={(e) => categoryValue(e.target.value)}
          />
        </div>

        <div className="Filter__radio__item">
          <label for="other">Другое</label>
          <input
            type="radio"
            name="sort"
            value="other"
            onClick={(e) => categoryValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
