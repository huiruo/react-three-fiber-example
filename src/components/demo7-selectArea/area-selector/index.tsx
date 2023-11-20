import { forwardRef, useCallback, useImperativeHandle } from "react";

type Rect = Pick<DOMRect, 'width' | 'height' | 'left' | 'top'>;

export interface ISelectorRef {
  // onSave: () => void;
  onSave: () => Promise<void>;
}

interface ISelectorProps {
  destroySelectArea: () => void;
}

export default forwardRef<ISelectorRef, ISelectorProps>((props, propsRef) => {

  const onSave = useCallback(async () => {
  }, []);

  useImperativeHandle(
    propsRef,
    () => ({
      onSave: async () => {
        onSave();
      },
    }),
    [onSave],
  );

  // test
  return <div style={{ width: '100px', height: '100px', background: 'yellow' }}>
    hello
  </div>
}
)
