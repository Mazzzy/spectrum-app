import React, { FC } from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useFetch } from '../../../utils';
import { GET_SPECTRUM_URL } from '../../../config/constants';

import Loading from '../../../components/loading';
import Error from '../../../components/error';

import './spectrum.scss';
interface SpectrumProps {
  areaId: number;
}

const Spectrum: FC<SpectrumProps> = ({ areaId }) => {
  const strokeColors = [ "#c43a31", "#02b875", "#002c61"];
  const selectedStroke = strokeColors[areaId-1];
  const getSpectrumUrl = GET_SPECTRUM_URL(areaId);
  
  const { status, data, error } = useFetch(getSpectrumUrl);
  
  const renderChart = () => {
    const lineData = data?.data;
    return (
      <VictoryChart 
        theme={VictoryTheme.material}
        domainPadding={{x: [10, -10], y: 5}}
        animate={{ duration: 1000 }}
        width={300}
        height={300}
      >
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => (`${y / 1000}k`)}
        />
        <VictoryLine 
          data={lineData} 
          style={{
            data: {
              stroke: selectedStroke
            }
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
    )
  }
  return (
    <div className="spectrum-wrapper">
      {status === 'error' && (
        <Error
          text={`Error in loading Spectrum data for given area id ${areaId}`}
          msg={error?.message}
          code={error?.code}
        />
      )}
      {status === 'fetching' && <Loading text="spectrum" />}
      {status === 'fetched' && (
        <>
          {data.length === 0 && <div> No spectrum data fetched! :( </div>}
          {renderChart()}
        </>
      )}
    </div>
  );
};

export default Spectrum;
