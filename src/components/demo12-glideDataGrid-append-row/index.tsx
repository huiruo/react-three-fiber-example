import React from 'react';
import DataEditor, { DataEditorProps, DataEditorRef } from '@glideapps/glide-data-grid';
import { clearCell, useMockDataGenerator } from './utils';

export const defaultProps: Partial<DataEditorProps> = {
  smoothScrollX: true,
  smoothScrollY: true,
  getCellsForSelection: true,
  width: "100%",
};

export const GlideDataGridAppendRow: React.FC = () => {
  const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(8, false);
  const [numRows, setNumRows] = React.useState(4);

  const ref = React.useRef<DataEditorRef>(null);

  const onAdd = React.useCallback(() => {
    void ref.current?.appendRow(3, false);
  }, [ref]);

  const onRowAppended = React.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);

      // clearCell(cell)
      // console.log('%c=onRowAppended:','color:red',clearCell(cell))
      setCellValueRaw([c, newRow], clearCell(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);

  return (
    <div style={{ height: '800px', width: '1000px', background: 'grey' }}>
      <button onClick={onAdd}>
        Append
      </button>

      <DataEditor
        {...defaultProps}
        ref={ref}
        getCellContent={getCellContent}
        columns={cols}
        rowMarkers={"both"}
        onCellEdited={setCellValue}
        trailingRowOptions={{
          hint: "New row...",
          sticky: true,
          tint: true,
        }}
        rows={numRows}
        onRowAppended={onRowAppended}
      />
    </div>
  );
};
