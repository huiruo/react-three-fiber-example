import React from 'react';
import { StartSelectEnum, startSelect } from './helper';

export const SelectArea: React.FC = () => {
  const startSelectU = (type: StartSelectEnum) => {
    startSelect(type)
  }

  return (
    <div style={{ height: '600px', width: '600px', background: '#ffeb3b' }}>
      <p>SelectArea</p>
      <button onClick={() => startSelectU(StartSelectEnum.areaSelect)} >
        继续选取
      </button>

      <div>
        这段代码表示选择全局范围内的 id 为 selection-container 的元素，并对其应用以下样式：

        pointer-events: none;：禁用元素的鼠标事件，使其无法接收鼠标交互。
        position: absolute;：将元素的定位方式设置为绝对定位，使其相对于其最近的非静态定位的祖先元素进行定位。
        width: 100vw;：将元素的宽度设置为视口宽度的100%，即占满整个可视区域的宽度。
        height: 100vh;：将元素的高度设置为视口高度的100%，即占满整个可视区域的高度。
        top: 0;：将元素相对于其定位上下文的顶部边缘设置为距离顶部的距离为0。
      </div>
      <p>
        Once upon a time, in a small village nestled at the foot of a majestic mountain, there lived a young girl named Maya. Maya was known for her curiosity and adventurous spirit. She had always dreamt of exploring the world beyond her village.
      </p>
      <h1>
        General-purpose assistant bot with strengths in programming-related tasks and non-English languages. Powered by gpt-3.5-turbo. Formerly known as Sage.
      </h1>
    </div>
  );
};
