import React from 'react';
import { DataEditor, type DataEditorProps, GridCellKind } from "@glideapps/glide-data-grid";
import { useExtraCells } from './utils';
import { StarCell } from './cells/star-cell';
import range from "lodash/range.js";
import uniq from "lodash/uniq.js";
import { SparklineCell } from './cells/sparkline-cell';
import type { TagsCell } from "./cells/tags-cell";
import type { UserProfileCell } from "./cells/user-profile-cell";
import type { DropdownCell } from "./cells/dropdown-cell";
import type { ArticleCell } from "./cells/article-cell-types";
import type { RangeCell } from "./cells/range-cell";
import type { SpinnerCell } from "./cells/spinner-cell";
import type { DatePickerCell } from "./cells/date-picker-cell";
import type { LinksCell } from "./cells/links-cell";
import type { ButtonCell } from "./cells/button-cell";

const possibleTags = [
  {
    tag: "Bug",
    color: "#ff4d4d35",
  },
  {
    tag: "Feature",
    color: "#35f8ff35",
  },
  {
    tag: "Enhancement",
    color: "#48ff5735",
  },
  {
    tag: "First Issue",
    color: "#436fff35",
  },
  {
    tag: "PR",
    color: "#e0ff3235",
  },
  {
    tag: "Assigned",
    color: "#ff1eec35",
  },
];


let num: number = 1;
function rand(): number {
  return (num = (num * 16807) % 2147483647) / 2147483647;
}

const defaultProps: Partial<DataEditorProps> = {
  smoothScrollX: true,
  smoothScrollY: true,
  isDraggable: false,
  rowMarkers: "none",
  width: "100%",
};

export const GlideDataGrid2: React.FC = () => {
  const cellProps = useExtraCells();

  return (
    <div style={{ height: '900px', width: '1000px', background: 'grey' }}>
      <DataEditor
        {...defaultProps}
        {...cellProps}
        onPaste={true}
        // eslint-disable-next-line no-console
        onCellEdited={(...args) => console.log("Edit Cell", ...args)}
        getCellsForSelection={true}
        getCellContent={cell => {
          const [col, row] = cell;
          if (col === 0) {
            return {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "star-cell",
                label: "Test",
                rating: 4,
              },
            } as StarCell;
          } else if (col === 1) {
            num = row + 1;
            const values = range(0, 15).map(() => rand() * 100 - 50);
            return {
              kind: GridCellKind.Custom,
              allowOverlay: false,
              copyData: "4",
              data: {
                kind: "sparkline-cell",
                values,
                displayValues: values.map(x => Math.round(x).toString()),
                color: row % 2 === 0 ? "#77c4c4" : "#D98466",
                yAxis: [-50, 50],
              },
            } as SparklineCell;
          } else if (col === 2) {
            num = row + 1;
            return {
              kind: GridCellKind.Custom,
              allowOverlay: false,
              copyData: "4",
              data: {
                kind: "sparkline-cell",
                values: range(0, 15).map(() => rand() * 100 - 50),
                color: row % 2 === 0 ? "#77c4c4" : "#D98466",
                graphKind: "bar",
                yAxis: [-50, 50],
              },
            } as SparklineCell;
          } else if (col === 3) {
            num = row + 1;
            rand();
            return {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "tags-cell",
                possibleTags: possibleTags,
                readonly: row % 2 === 0,
                tags: uniq([
                  possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                  possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                  possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                  possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                ]),
              },
            } as TagsCell;
          } else if (col === 4) {
            num = row + 1;
            rand();
            return {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "user-profile-cell",
                image: row % 2 ? undefined : "https://i.redd.it/aqc1hwhalsz71.jpg",
                initial: "B",
                tint: "#F1D86E",
                name: row % 5 ? undefined : "Bee bb",
              },
            } as UserProfileCell;
          } else if (col === 5) {
            num = row + 1;
            rand();
            const d: DropdownCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "dropdown-cell",
                allowedValues: ["Good", "Better", "Best"],
                value: "Good",
              },
            };
            return d;
          } else if (col === 6) {
            num = row + 1;
            rand();
            const v = rand();
            const d: RangeCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "range-cell",
                min: 10,
                max: 30,
                value: 10 + Math.round(v * 20),
                step: 1,
                label: `${Math.round(v * 100)}%`,
                measureLabel: "100%",
              },
            };
            return d;
          } else if (col === 7) {
            num = row + 1;
            rand();
            const d: ArticleCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "article-cell",
                markdown: "## This is a test",
              },
            };
            return d;
          } else if (col === 8) {
            num = row + 1;
            rand();
            const d: SpinnerCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "spinner-cell",
              },
            };
            return d;
          } else if (col === 9) {
            num = row + 1;
            rand();
            const d: DatePickerCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "date-picker-cell",
                date: new Date(),
                displayDate: new Date().toISOString(),
                format: "datetime-local",
              },
            };
            return d;
          } else if (col === 10) {
            num = row + 1;
            rand();
            const d: DatePickerCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "date-picker-cell",
                date: new Date(),
                displayDate: new Date().toISOString().split("T")[0],
                format: "date",
              },
            };
            return d;
          } else if (col === 11) {
            num = row + 1;
            rand();
            const d: DatePickerCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "date-picker-cell",
                date: new Date(),
                displayDate: new Date().toISOString().split("T")[1].replace("Z", ""),
                format: "time",
              },
            };
            return d;
          } else if (col === 12) {
            num = row + 1;
            rand();
            const d: LinksCell = {
              kind: GridCellKind.Custom,
              allowOverlay: true,
              copyData: "4",
              data: {
                kind: "links-cell",
                underlineOffset: 6,
                links: [
                  {
                    title: "Linky phone",
                    onClick: () => alert("Click 1"),
                  },
                  {
                    title: "Click the linky dinky",
                    onClick: () => alert("Click 2"),
                  },
                ],
              },
            };
            return d;
          } else if (col === 13) {
            num = row + 1;
            rand();
            const d: ButtonCell = {
              kind: GridCellKind.Custom,
              cursor: "pointer",
              allowOverlay: true,
              copyData: "4",
              readonly: true,
              data: {
                kind: "button-cell",
                backgroundColor: ["transparent", "#6572ffee"],
                color: ["accentColor", "accentFg"],
                borderColor: "#6572ffa0",
                borderRadius: 9,
                title: "View Details",
                onClick: () => window.alert("Button clicked"),
              },
              themeOverride: {
                baseFontStyle: "700 12px",
              },
            };
            return d;
          }
          throw new Error("Fail");
        }}
        columns={[
          {
            title: "Stars",
            width: 200,
          },
          {
            title: "Sparkline",
            width: 150,
          },
          {
            title: "Sparkline (bars)",
            width: 150,
          },
          {
            title: "Tags",
            width: 250,
          },
          {
            title: "Profile",
            width: 150,
          },
          {
            id: "dropdown",
            title: "Dropdown",
          },
          {
            title: "Range",
            width: 150,
          },
          {
            title: "Article",
            width: 150,
          },
          {
            title: "Spinner",
            width: 150,
          },
          {
            id: "datetime-picker",
            title: "Datetime Picker",
          },
          {
            id: "date-picker",
            title: "Date Picker",
          },
          {
            id: "time-picker",
            title: "Time Picker",
          },
          {
            title: "Links",
            width: 150,
          },
          {
            title: "Button",
            width: 120,
          },
        ]}
        rows={500}
      />
    </div>
  );
};
