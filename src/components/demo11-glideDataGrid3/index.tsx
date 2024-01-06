import React from 'react';
import {
  DataEditor,
  type DataEditorProps,
  type DataEditorRef,
  // GridCellKind,
  // type GridColumn,
  // type Theme,
} from "@glideapps/glide-data-grid";
import { faker } from "@faker-js/faker";
import { useUndoRedo } from "./use-undo-redo";
import { useMockDataGenerator } from "./util";

// faker.seed(1337);

const defaultProps: Partial<DataEditorProps> = {
  smoothScrollX: true,
  smoothScrollY: true,
  isDraggable: false,
  rowMarkers: "none",
  width: "100%",
};

export const GlideDataGrid3: React.FC = () => {
  const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(3);

  const gridRef = React.useRef<DataEditorRef>(null);

  const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(
    gridRef,
    getCellContent,
    setCellValue
  );

  return (
    <div style={{ height: '800px', width: '1000px', background: 'grey' }}>
      <div>
        <button onClick={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.4 }}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.4 }}>
          Redo
        </button>
      </div>

      <div style={{ height: '600px', width: '100%' }}>
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
      </div>
    </div>
  );
};
