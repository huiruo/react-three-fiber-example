import React from 'react';
import { Rnd } from 'react-rnd';
import './index.css';

/*
使用了100vh来设置容器的高度，确保它占据整个视口的高度。
然后，我们通过设置width: 100%和height: 100%，使box元素填充父容器的宽度和高度。
*/
export const DraggableBox2 = () => {
  return (
    <div className="container">
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
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
              {/* <div style={{ height: "100%" }}> */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean efficitur sit amet massa fringilla egestas.
                  Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>
          </article>
        </div>
      </Rnd>
    </div>
  );
};
