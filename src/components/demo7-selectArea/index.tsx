import React from 'react';
import { StartSelectEnum, startSelect } from './helper';

export const SelectArea: React.FC = () => {
  const startSelectU = (type: StartSelectEnum)=>{
    startSelect(type)
  }

  return (
    <div style={{ height: '600px', width: '600px', background: '#ffeb3b' }}>
      <p>SelectArea</p>
      <button onClick={() => startSelectU(StartSelectEnum.areaSelect)} >
        继续选取
      </button>
    </div>
  );
};
