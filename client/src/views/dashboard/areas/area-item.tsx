import React, { FC, MouseEvent, KeyboardEvent } from 'react';
import { AreaType } from '../../../types';
import Button from '../../../components/button';
interface AreaItemProps {
  item: AreaType;
  isSelected: boolean;
  handleClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
}

const AreaItem: FC<AreaItemProps> = ({
  isSelected,
  item,
  handleClick,
}) => {
  const { name } = item;
  return (
    <div className="area-item">
      <Button
        text={name}
        className={`area-item-btn ${isSelected ? "selected-btn" : ""}`}
        onClick={handleClick}
      />
    </div>
  );
};

export default AreaItem;
