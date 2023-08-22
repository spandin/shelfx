import './_index.scss';

export const Filter = ({ categoryValue, exportedValue }) => {
  return (
    <div className="Filter flex min-w-[275px] flex-col gap-5">
      <h3 className="Filter px-[3px]">Фильтр таблицы</h3>

      <div className="flex flex-col gap-1">
        <div className="text-sm text-darkG-100">По статусу выгрузки:</div>
        <div class="Exported__toogle">
          <div class="Exported__toogle-item item-1">
            <input
              onClick={(e) => exportedValue(e.target.value)}
              id="fid-1"
              type="radio"
              name="export"
              value="exported"
            />
            <label for="fid-1">Все</label>
          </div>

          <div class="Exported__toogle-item item-2">
            <input
              onClick={(e) => exportedValue(e.target.value)}
              id="fid-2"
              type="radio"
              name="export"
              value="notExported"
            />
            <label for="fid-2">Не внесеные</label>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="flex flex-col flex-wrap gap-1">
        <div className="text-sm text-darkG-100">По категориям:</div>

        <div className="Category flex flex-row flex-wrap gap-2">
          <div class="Category-item">
            <input
              id="all"
              type="radio"
              name="category"
              value="all"
              onClick={(e) => categoryValue(e.target.value)}
            />
            <label for="all">Все</label>
          </div>

          <div class="Category-item">
            <input
              id="cosmetic"
              type="radio"
              name="category"
              value="cosmetic"
              onClick={(e) => categoryValue(e.target.value)}
            />
            <label for="cosmetic">Косметика</label>
          </div>

          <div class="Category-item">
            <input
              id="products"
              type="radio"
              name="category"
              value="products"
              onClick={(e) => categoryValue(e.target.value)}
            />
            <label for="products">Продукты</label>
          </div>

          <div class="Category-item">
            <input
              id="alcohol"
              type="radio"
              name="category"
              value="alcohol"
              onClick={(e) => categoryValue(e.target.value)}
            />
            <label for="alcohol">Алкоголь</label>
          </div>

          <div class="Category-item">
            <input
              id="chemistry"
              type="radio"
              name="category"
              value="chemistry"
              onClick={(e) => categoryValue(e.target.value)}
            />
            <label for="chemistry">Химия</label>
          </div>

          <div class="Category-item">
            <input
              id="other"
              type="radio"
              name="category"
              value="other"
              onClick={(e) => categoryValue(e.target.value)}
            />
            <label for="other">Другое</label>
          </div>
        </div>
      </div>
    </div>
  );
};
