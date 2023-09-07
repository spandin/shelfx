import { useState } from 'react';
import './_index.scss';

import { BsThreeDotsVertical } from 'react-icons/bs';

export const MenuDropDown = ({ className, children }) => {
  const [dropDownActive, setDropDownActive] = useState('');
  return (
    <div className={`Menu ${className} ${dropDownActive}`}>
      <BsThreeDotsVertical
        className="Menu__icon"
        onClick={() =>
          dropDownActive === '' ? setDropDownActive('active') : setDropDownActive('')
        }
      />
      <div className="Menu__dropdown dark:bg-darkV-100">{children}</div>
    </div>
  );
};
