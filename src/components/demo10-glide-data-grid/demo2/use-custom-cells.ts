import * as React from "react";
import {
  GridCell,
  GridCellKind,
  ProvideEditorCallback,
} from "@glideapps/glide-data-grid";

export function useCustomCells(cells:any) {
  const drawCell = React.useCallback(
    (args:any) => {
      const { cell } = args;
      if (cell.kind !== GridCellKind.Custom) return false;
      for (const c of cells) {
        if (c.isMatch(cell)) {
          return c.draw(args, cell);
        }
      }
      return false;
    },
    [cells]
  );

  const onCellClicked = React.useCallback(
    (cell:any, event:any, callback:any) => {
      if (cell.kind !== GridCellKind.Custom) return undefined;

      for (const c of cells) {
        if (c.isMatch(cell)) {
          if (c.onCellClicked) c.onCellClicked(cell, event, callback);
          return undefined;
        }
      }

      return undefined;
    },
    [cells]
  );

  const provideEditor =
    React.useCallback <
    ProvideEditorCallback <
    GridCell >>
      ((cell) => {
        if (cell.kind !== GridCellKind.Custom) return undefined;

        for (const c of cells) {
          if (c.isMatch(cell)) {
            return c.provideEditor(cell);
          }
        }

        return undefined;
      },
      [cells]);

  const coercePasteValue = React.useCallback(
    (val:any, cell:any) => {
      if (cell.kind !== GridCellKind.Custom) return undefined;

      for (const c of cells) {
        if (c.isMatch(cell)) {
          if (c.onPaste === undefined) {
            return undefined;
          }
          return {
            ...cell,
            data: c.onPaste(val, cell.data)
          };
        }
      }
    },
    [cells]
  );

  return { drawCell, onCellClicked, provideEditor, coercePasteValue };
}
