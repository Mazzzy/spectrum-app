import React, { FC } from 'react';
import { useFetch } from '../../../utils';
import { AreaType } from '../../../types';
import { GET_AREAS_URL } from '../../../config/constants';

import Loading from '../../../components/loading';
import Error from '../../../components/error';
import AreaItem from './area-item';
import './areas.scss';

interface AreaListProps {
  areaId: number;
  changeAreaId: (areaId: number) => void;
}

const AreasList: FC<AreaListProps> = ({ areaId, changeAreaId }) => {
  const { status, data, error } = useFetch(GET_AREAS_URL);

  const renderAreasList = () => {
    const areasList = data.data;
    return (
      <div className="area-items">
        { areasList.map(
          (
            areaItem: AreaType,
            index: number
          ) => (
            <AreaItem 
                key={`${areaItem.id} ${index}`}
                item={areaItem} 
                isSelected={(areaId === areaItem.id)? true: false }
                handleClick={() => {
                  changeAreaId(areaItem.id);
                }}
              />
          )
        )}
      </div>
    );
  };
  
  return (
    <div className="areas-wrapper">
      {status === 'error' && (
        <Error
          text="Error in loading Areas list"
          msg={error?.message}
          code={error?.code}
        />
      )}
      {status === 'fetching' && <Loading text="areas" />}
      {status === 'fetched' && (
        <>
          {data.length === 0 && <div> No areas data fetched! :( </div>}
          {renderAreasList()}
        </>
      )}
    </div>
  );
};

export default AreasList;
