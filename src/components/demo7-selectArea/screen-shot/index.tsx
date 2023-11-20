import { forwardRef, useCallback, useImperativeHandle } from "react";

type DragDirection = 'top' | 'bottom' | 'left' | 'right';

export interface IScreenShotRef {
  onSave: () => Promise<void>;
}

interface IScreenShotProps {
  destroySelectArea: () => void;
}

export default forwardRef<IScreenShotRef, IScreenShotProps>(
  (props, propsRef) => {

    const onSave = useCallback(async () => {
    }, []);

    const onScreenshot = useCallback(async () => { }, [])

    useImperativeHandle(
      propsRef,
      () => ({
        onSave: onScreenshot,
      }),
      [onScreenshot],
    );

    // test
    return <div style={{ width: '100px', height: '100px', background: 'yellow' }}>
      hello
    </div>
  }
)