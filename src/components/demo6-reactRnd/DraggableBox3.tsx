import React from 'react';
import { Rnd } from 'react-rnd';

export const DraggableBox3 = () => {

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Rnd
        default={{
          x: 150,
          y: 205,
          width: 500,
          height: 190,
        }}
        minWidth={500}
        minHeight={190}
        bounds="window"
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: 'grey',
        }}>
          <article style={{ height: "100%" }}>
            <div style={{ height: "100%" }}>
              <div style={{ height: "100%", paddingBottom: "40px" }}>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean efficitur sit amet massa fringilla egestas.
                  Nullam condimentum luctus turpis.
                </div>
              </div>
            </div>
          </article>
        </div>
      </Rnd>
    </div>
  );
};
