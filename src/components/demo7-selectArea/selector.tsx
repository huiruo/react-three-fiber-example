import { Root, createRoot } from "react-dom/client";
import { StartSelectEnum } from "./helper";
import Selector, { IScreenShotRef } from "./screen-shot";
import ScreenShot, { ISelectorRef } from "./area-selector";
import { useEffect, useRef } from "react";

// 剪藏容器 id
export const YQ_SELECTION_CONTAINER = 'yq-selection-container';

// sandbox iframe id
export const YQ_SANDBOX_BOARD_IFRAME = 'yq-sandbox-board-iframe';

interface IAppProps {
  type?: StartSelectEnum;
}

export const App = (props: IAppProps) => {
  const { type = StartSelectEnum.areaSelect } = props;
  const screenShotRef = useRef<IScreenShotRef>(null);
  const selectorRef = useRef<ISelectorRef>(null);

  console.log('render-剪藏容器',)
  // test
  /*
  return <div style={{width: '100px',height:'100px',background:'yellow'}}>
    hello
  </div>
  */

  useEffect(() => {
    setTimeout(() => {
      window.focus();
    }, 300);
    const handleKeyDown = async (e: KeyboardEvent) => {
      const { key } = e;
      if (key === 'Escape' || key === 'Esc') {
        destroySelectArea();
      } else if (key === 'Enter') {
        if (type === StartSelectEnum.screenShot) {
          await screenShotRef.current?.onSave();
        } else if (type === StartSelectEnum.areaSelect) {
          selectorRef.current?.onSave();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary: '#00B96B',
    //     },
    //   }}
    // >
    <>
      {type === StartSelectEnum.areaSelect && (
        <Selector ref={selectorRef} destroySelectArea={destroySelectArea} />
      )}
      {type === StartSelectEnum.screenShot && (
        <ScreenShot ref={screenShotRef} destroySelectArea={destroySelectArea} />
      )}
    </>
    // </ConfigProvider>
  );
}


let root: Root;

export function initSelectArea(params: { type: StartSelectEnum }) {
  let wrapper = document.querySelector(`#${YQ_SELECTION_CONTAINER}`);
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = YQ_SELECTION_CONTAINER;
    document.documentElement.appendChild(wrapper);
  }

  root = createRoot(wrapper);
  root.render(<App type={params.type} />);
}

export function destroySelectArea() {
  if (!root) {
    return;
  }

  const wrapper = document.querySelector(`#${YQ_SELECTION_CONTAINER}`);

  root.unmount();

  wrapper?.remove();

  document.querySelector(`#${YQ_SANDBOX_BOARD_IFRAME}`)?.classList.add('show');
}