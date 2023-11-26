import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useForceUpdate } from '../hooks/useForceUpdate';

type DragDirection = 'top' | 'bottom' | 'left' | 'right';

export interface IScreenShotRef {
  onSave: () => Promise<void>;
}

interface IScreenShotProps {
  destroySelectArea: () => void;
}

export default forwardRef<IScreenShotRef, IScreenShotProps>(
  (props, propsRef) => {
    const isScreenshot = useRef(false);
    const loadingRef = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    const [screenShowAreaIsInit, setScreenShowAreaIsInit] = useState(false);
    const startRef = useRef({ left: 0, top: 0 });
    const endRef = useRef({ left: 0, top: 0 });
    const { forceUpdate } = useForceUpdate();
    const [isDragging, setIsDragging] = useState(false);
    const selectAreaWidth = Math.abs(
      endRef.current.left - startRef.current.left,
    );
    const selectAreaHeight = Math.abs(
      endRef.current.top - startRef.current.top,
    );
    const selectAreaLeft = Math.min(startRef.current.left, endRef.current.left);
    const selectAreaTop = Math.min(startRef.current.top, endRef.current.top);
    const selectAreaRight = selectAreaLeft + selectAreaWidth;
    const selectAreaBottom = selectAreaTop + selectAreaHeight;
    const operatePosition = {
      left: Math.max(selectAreaRight - 72, 0),
      top:
        selectAreaBottom + 40 > window.innerHeight
          ? selectAreaTop + 8
          : selectAreaBottom + 8,
    };


    const onSave = useCallback(async () => {
    }, []);

    useEffect(() => {
      if (screenShowAreaIsInit) {
        return;
      }
      const onMouseDown = (e: MouseEvent) => {
        if (e.button === 2) {
          return;
        }
        isScreenshot.current = true;
        startRef.current = {
          left: e.clientX,
          top: e.clientY,
        };
      };
      const onMouseUp = () => {
        if (isScreenshot.current && endRef.current.left && endRef.current.top) {
          setScreenShowAreaIsInit(true);
        }
        isScreenshot.current = false;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isScreenshot.current) {
          return;
        }
        endRef.current = {
          left: e.clientX,
          top: e.clientY,
        };
        forceUpdate();
      };
      ref.current?.addEventListener('mousedown', onMouseDown);
      ref.current?.addEventListener('mouseup', onMouseUp);
      ref.current?.addEventListener('mousemove', onMouseMove);
      ref.current?.addEventListener('mouseleave', onMouseUp);

      return () => {
        ref.current?.removeEventListener('mousedown', onMouseDown);
        ref.current?.removeEventListener('mousemove', onMouseMove);
        ref.current?.removeEventListener('mouseup', onMouseUp);
        ref.current?.addEventListener('mouseleave', onMouseUp);
      };
    }, [screenShowAreaIsInit]);

    const onDrag = useCallback(
      (
        e: React.DragEvent<HTMLDivElement>,
        direction: DragDirection,
        resetPosition?: boolean,
      ) => {
        setIsDragging(true);
        switch (direction) {
          case 'left': {
            startRef.current.left = e.clientX;
            break;
          }
          case 'right': {
            endRef.current.left = e.clientX || window.innerWidth;
            break;
          }
          case 'top': {
            startRef.current.top = e.clientY;
            break;
          }
          case 'bottom': {
            endRef.current.top = e.clientY || window.innerHeight;
            break;
          }
          default:
            break;
        }
        if (resetPosition) {
          // 计算完成后做一次 endRef 和 startRef 的数据订正
          const endPosition = {
            left: Math.max(endRef.current.left, startRef.current.left),
            top: Math.max(endRef.current.top, startRef.current.top),
          };
          const startPosition = {
            left: Math.min(endRef.current.left, startRef.current.left),
            top: Math.min(endRef.current.top, startRef.current.top),
          };
          endRef.current = endPosition;
          startRef.current = startPosition;
        }
        forceUpdate();
      },
      [],
    );

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    // const onScreenshot = useCallback(async () => { }, [])
    const onScreenshot = useCallback(async () => {
      if (loadingRef.current) {
        return;
      }
      loadingRef.current = true;
      forceUpdate();
      // 延迟 100ms 将提示给隐藏掉，避免截屏是截上
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 100);
      });

      try {
        /*
        const canvas = await screenShot({
          x: startRef.current.left,
          y: startRef.current.top,
          width: Math.abs(endRef.current.left - startRef.current.left),
          height: Math.abs(endRef.current.top - startRef.current.top),
        });

        console.log('sendMessageToSandBox-2',canvas)
        */

        /*
        canvas.toBlob(res => {
          sendMessageToSandBox(SandBoxMessageType.startOcr, {
            blob: res,
          });
          loadingRef.current = false;
          forceUpdate();
          props.destroySelectArea();
        });
        */

      } catch (error) {
        loadingRef.current = false;
        forceUpdate();

        console.log('sendMessageToSandBox-1',)
        /*
        sendMessageToSandBox(SandBoxMessageType.startOcr, {
          blob: '',
        });
        */

        props.destroySelectArea();
      }
    }, []);

    useImperativeHandle(
      propsRef,
      () => ({
        onSave: onScreenshot,
      }),
      [onScreenshot],
    );

    // test
    return <div style={{ width: '100px', height: '100px', background: 'yellow' }}>
      hello screen-shot
    </div>
  }
)