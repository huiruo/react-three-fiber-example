import React from 'react';
import { DraggableBox2 } from './DraggableBox2';
import { DraggableBox3 } from './DraggableBox3';

export const ReactRnd: React.FC = () => {
  return (
    <div style={{ height: '600px', width: '600px', background: '#ffeb3b' }}>
      {/* <DraggableBox2 /> */}
      <DraggableBox3 />
    </div>
  );
};
