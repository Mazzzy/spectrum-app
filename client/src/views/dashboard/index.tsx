import React, { FC, useState } from 'react';
import Spectrum from './spectrum';
import AreasList from './areas';
import './dashboard.scss';

const Dashboard: FC = () => {
  const [areaId, setAreaId] = useState(1);
  const changeAreaId = (areaId:number) => {
    setAreaId(areaId);
  }
  return (
    <div className="dashboard-wrapper">
      <AreasList areaId={areaId} changeAreaId={changeAreaId}/>
      <Spectrum areaId={areaId} />
    </div>
  );
};

export default Dashboard;
