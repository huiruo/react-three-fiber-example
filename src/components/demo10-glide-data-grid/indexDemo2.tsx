import React from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import {
  GridCellKind,
  GridColumnIcon,
  DataEditor,
  CellArray,
  CompactSelection,
  CustomCell,
  DrawHeaderCallback,
  GridCell,
  CustomCellRenderer
} from "@glideapps/glide-data-grid";
import { useCustomCells } from "./demo2/use-custom-cells";

const data = [
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127"
  },
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127"
  },
  {
    name: "Hines Fowler",
    company: "BUZZNESS",
    email: "hinesfowler@buzzness.com",
    phone: "+1 (869) 405-3127"
  }
];

export const GlideDataGrid = () => {
  const [showSearch, setShowSearch] = React.useState(false);
  const onSearchClose = React.useCallback(() => setShowSearch(false), []);

  type Item = {
    name: string,
    description: string,
    depth?: number,
    collapsed?: boolean,
    children: Item[]
  };

  const names = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];

  const item = (
    name: string,
    description?: string,
    children: Item[] = []
  ): Item => ({
    name,
    description: description || `Item ${name}`,
    children
  });

  const createTree = (): Item => {
    const root = item("Root", "Root Item");

    for (let x in names) {
      const name = names[x];
      const ix = item(name);
      root.children.push(ix);
      for (let y in names) {
        const name = `${names[x]} ${names[y]}`;
        const iy = item(name);
        iy.collapsed = true;
        ix.children.push(iy);
        for (let z in names) {
          const name = `${names[x]} ${names[y]} ${names[z]}`;
          const iz = item(name);
          iy.children.push(iz);
        }
      }
    }

    return root;
  };

  const [root, setRoot] = React.useState(createTree());

  const flatten = (tree: Item): Item[] => {
    const _visit = (item: Item, depth: number = 0) => {
      item.depth = depth;
      items.push(item);
      item.children.forEach(
        (child) => !item.collapsed && _visit(child, depth + 1)
      );
    };

    const items: Item[] = [];

    _visit(tree);

    return items;
  };

  let [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    const flattened = flatten(root);
    setItems(flattened);
    setNumRows(flattened.length);
  }, [root]);

  const [numRows, setNumRows] = React.useState(items.length);

  const columns = [
    { title: "Name", width: 250 },
    { title: "Depth", width: 55 },
    { title: "Children", width: 70 },
    { title: "Collapsed", width: 80 },
    { title: "Description", width: 200 }
  ];

  const getCellContent = React.useCallback(
    ([col, row]:any): GridCell => {
      const item = items[row] as any;
      const field = columns[col].title;

      switch (field) {
        case "Name":
          const { name } = item;

          return {
            kind: GridCellKind.Custom,
            data: {
              kind: "custom-tree-cell",
              item: item
            },
            allowOverlay: false,
            copyData: name
          };

        case "Depth":
          const { depth } = item;

          return {
            kind: GridCellKind.Number,
            data: depth,
            displayData: `${depth}`,
            allowOverlay: false
          };

        case "Children":
          const {
            children: { length }
          } = item;

          return {
            kind: GridCellKind.Number,
            data: length,
            displayData: `${length}`,
            allowOverlay: false
          };

        case "Collapsed":
          const { collapsed } = item;
          const data =
            item.children.length > 0 ? (collapsed ? "YES" : "NO") : "N/A";

          return {
            kind: GridCellKind.Text,
            displayData: data,
            data: data,
            allowOverlay: false
          };

        case "Description":
          const { description } = item;

          return {
            kind: GridCellKind.Text,
            displayData: description,
            data: description,
            allowOverlay: false
          };

        default:
          return {
            kind: GridCellKind.Text,
            displayData: "<unknown>",
            data: "",
            allowOverlay: false
          };
      }
    },
    [items]
  );

  const CustomTreeCellRenderer = {
    isMatch: (c:any) => c.data.kind === "custom-tree-cell",
    draw: (args:any, cell:any) => {
      const { ctx, rect, theme } = args;
      const { x, y, width, height } = rect;
      const { data } = cell;
      const { item } = data;
      const { children, collapsed, depth, name } = item;

      const depthOffset = (depth || 0) * 20;

      ctx.save();

      if (children?.length) {
        ctx.fillStyle = "none";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = theme.textDark;
        ctx.beginPath();
        if (collapsed) {
          ctx.moveTo(x + depthOffset + 8, y + height / 2 - 4);
          ctx.lineTo(x + depthOffset + 8, y + height / 2 + 4);
          ctx.lineTo(x + depthOffset + 14, y + height / 2);
        } else {
          ctx.moveTo(x + depthOffset + 15, y + height / 2 - 3);
          ctx.lineTo(x + depthOffset + 7, y + height / 2 - 3);
          ctx.lineTo(x + depthOffset + 11, y + height / 2 + 3);
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillStyle = theme.textMedium;
      ctx.font = `${theme.headerFontStyle} ${theme.fontFamily}`;
      const textX = x + depthOffset + 20;
      ctx.fillText(`${name}`, textX, y + 18, width - textX);

      ctx.restore();

      return true;
    },

    onCellClicked: (cell:any, event:any, callback:any) => {
      const { item } = cell.data;
      const { depth } = item;
      const { localEventX } = event;

      const depthOffset = (depth || 0) * 20;

      if (localEventX < depthOffset || localEventX > depthOffset + 22) return;

      event.preventDefault();
      item.collapsed = !item.collapsed;
      callback(item);
    },
    provideEditor: () => {
      return undefined;
    }
  };

  const { drawCell, onCellClicked } = useCustomCells([CustomTreeCellRenderer]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setShowSearch(true);
        }}
      >
        Show search
      </button>
      <DataEditor
        getCellContent={getCellContent}
        onCellClicked={(item, event) => {
          const cell = getCellContent(item);
          onCellClicked(cell, event, () => {
            setRoot({ ...root });
          });
        }}
        drawCell={drawCell}
        columns={columns}
        rows={numRows}
        rowMarkers={"clickable-number"}
      />
      <div id="portal" />
    </div>
  );
}
