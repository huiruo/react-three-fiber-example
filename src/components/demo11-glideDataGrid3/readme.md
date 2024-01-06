## test
每次 undo/redo 都要调用 
```
setCellValue-->lossyCopyData

setCellValue最后调用：
cache.current.set()
```

```js
// const copied = lossyCopyData(val, current);
const setCellValue = React.useCallback(
  ([col, row]: Item, val: GridCell): void => {
    let current = cache.current.get(col, row);
    if (current === undefined) {
      current = colsMap[col].getContent();
    }
    if (isEditableGridCell(val) && isEditableGridCell(current)) {
      const copied = lossyCopyData(val, current);
      console.log('%c===>setCellValue copied', 'color:red', typeof copied.data === "string", copied)
      cache.current.set(col, row, {
        ...copied,
        displayData: typeof copied.data === "string" ? copied.data : (copied as any).displayData,
        lastUpdated: performance.now(),
      } as any);
    }
  },
  [colsMap]
);

function lossyCopyData<T extends EditableGridCell>(source: EditableGridCell, target: T): EditableGridCell {

}
```

## useUndoRedo
```js
export function useUndoRedo(
  gridRef: React.RefObject<DataEditorRef>,
  getCellContent: (cell: Item) => GridCell,
  onCellEdited: (cell: Item, newValue: EditableGridCell) => void,
  onGridSelectionChange?: (newVal: GridSelection) => void
) {


  return useMemo(() => {
    return {
      undo,
      redo,
      canUndo: state.canUndo,
      canRedo: state.canRedo,
      onCellEdited: wrappedOnCellEdited,
      onGridSelectionChange: onGridSelectionChangedEdited,
      gridSelection,
    };
  }, [undo, redo, wrappedOnCellEdited, state.canUndo, state.canRedo, onGridSelectionChangedEdited, gridSelection]);
}
```

调用`useUndoRedo`：
```js
1. 代码中使用

export const GlideDataGrid3: React.FC = () => {
  // const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(6);
  // const gridRef = React.useRef<DataEditorRef>(null);

  const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(
    gridRef,
    getCellContent,
    setCellValue
  );

  return (
        <DataEditor
          {...defaultProps}
          ref={gridRef}
          onCellEdited={onCellEdited}
          getCellContent={getCellContent}
          gridSelection={gridSelection ?? undefined}
          onGridSelectionChange={onGridSelectionChange}
          columns={columns}
          rows={1000}
        />
  );
};

2. 注册键盘事件

// Attach the keyboard shortcuts. CMD+Z and CMD+SHIFT+Z on mac, CTRL+Z and CTRL+Y on windows.
useEffect(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    }

    if (e.key === "y" && (e.metaKey || e.ctrlKey)) {
      redo();
    }
  };
  window.addEventListener("keydown", onKeyDown);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
  };
}, [undo, redo]);

第一步调用
|
|
V

const undo = useCallback(() => {
  console.log('%c=use-undo-redo.tsx-->dispatch-undo','color:#0D61F2')
  dispatch({ type: "undo" });
}, [dispatch]);

|
|
V

function reducer(state: ReducerState, action: Action) {
  const newState = { ...state };

  console.log('%c=use-undo-redo.tsx-->reducer','color:#0D61F2',action.type)
  switch (action.type) {
    case "undo":
      if (state.canUndo) {
        newState.undoHistory = [...state.undoHistory];
        const operation = newState.undoHistory.pop();
        newState.operation = operation;
        newState.canUndo = newState.undoHistory.length > 0;
        newState.isApplyingUndo = true;

        return newState;
      }
      return state;
    
    case "redo":
      if (state.canRedo) {
        newState.redoHistory = [...state.redoHistory];
        const operation = newState.redoHistory.pop();
        newState.operation = operation;
        newState.canRedo = newState.redoHistory.length > 0;
        newState.isApplyingRedo = true;

        return newState;
      }
      return state;
    
    // 省略...
  }
}

|
|
V

// 可见上面的代码返回了新的 state
// 将触发effect
export function useUndoRedo(
  gridRef: React.RefObject<DataEditorRef>,
  getCellContent: (cell: Item) => GridCell,
  onCellEdited: (cell: Item, newValue: EditableGridCell) => void,
  onGridSelectionChange?: (newVal: GridSelection) => void
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Apply a batch of edits to the grid
  useEffect(() => {
    if (state.operation && gridSelectionRef.current && gridRef.current) {
      const cells = [] as { cell: Item }[];
      const previousState: Batch = {
        edits: [],
        selection: gridSelectionRef.current,
      };

      for (const edit of state.operation.edits) {
        const prevValue = getCellContent(edit.cell) as EditableGridCell;
        previousState.edits.push({ cell: edit.cell, newValue: prevValue });
        console.log('%c=use-undo-redo.tsx-->onCellEdited-2','color:red',{ forObj:state.operation.edits,cell:edit.cell, newValue:edit.newValue })
        onCellEdited(edit.cell, edit.newValue);
        cells.push({ cell: edit.cell });
      }

      setGridSelection(state.operation.selection);
      gridSelectionRef.current = state.operation.selection;
      gridRef.current.updateCells(cells);

      console.log('%c=use-undo-redo.tsx-->edit&&operationApplied','color:#0D61F2',previousState)

      dispatch({
        type: "edit",
        batch: previousState,
      });

      dispatch({
        type: "operationApplied",
      });
    }
  }, [state.operation, gridRef, onCellEdited, setGridSelection, getCellContent]);

  // ... 省略
}

|
|
V
// 调用 onCellEdited --> 即 setCellValue
onCellEdited(edit.cell, edit.newValue);
// src/components/demo11-glideDataGrid3/util.tsx
export function useMockDataGenerator(numCols: number, readonly: boolean = true, group: boolean = false) {
  const cache = React.useRef<ContentCache>(new ContentCache());

  const [colsMap, setColsMap] = React.useState(() => getResizableColumns(numCols, group));

  // 省略...

  const setCellValue = React.useCallback(
    ([col, row]: Item, val: GridCell): void => {
      let current = cache.current.get(col, row);
      if (current === undefined) {
        current = colsMap[col].getContent();
      }
      if (isEditableGridCell(val) && isEditableGridCell(current)) {
        const copied = lossyCopyData(val, current);
        console.log('%c===>setCellValue copied', 'color:red', typeof copied.data === "string", copied)
        cache.current.set(col, row, {
          ...copied,
          displayData: typeof copied.data === "string" ? copied.data : (copied as any).displayData,
          lastUpdated: performance.now(),
        } as any);
      }
    },
    [colsMap]
  );

  return { cols, getCellContent, onColumnResize, setCellValue, getCellsForSelection, setCellValueRaw };
}
```

## 数据源 `getCellContent`<-->`cache`
```js
// src/components/demo11-glideDataGrid3/util.tsx
export class ContentCache {
  // column -> row -> value
  private cachedContent: Map<number, Map<number, GridCell>> = new Map();

  get(col: number, row: number) {
    const colCache = this.cachedContent.get(col);

    if (colCache === undefined) {
      return undefined;
    }

    return colCache.get(row);
  }

  set(col: number, row: number, value: GridCell) {
    if (this.cachedContent.get(col) === undefined) {
      this.cachedContent.set(col, new Map());
    }

    const rowCache = this.cachedContent.get(col) as Map<number, GridCell>;
    rowCache.set(row, value);
  }
}

export function useMockDataGenerator(numCols: number, readonly: boolean = true, group: boolean = false) {
  const cache = React.useRef<ContentCache>(new ContentCache());

  const getCellContent = React.useCallback(
    ([col, row]: Item): GridCell => {
      let val = cache.current.get(col, row);
      if (val === undefined) {
        val = colsMapRef.current[col].getContent();
        if (!readonly && isTextEditableGridCell(val)) {
          val = { ...val, readonly };
        }
        cache.current.set(col, row, val);
      }

      // console.log('getCellContent', { col, row, val }, cache.current)
      return val;
    },
    [readonly]
  );

  return { cols, getCellContent, onColumnResize, setCellValue, getCellsForSelection, setCellValueRaw };
}
```