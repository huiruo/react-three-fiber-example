import DataEditor, {
  GridCell,
  GridCellKind,
  GridColumnIcon
} from "@glideapps/glide-data-grid";
import { useExtraCells } from "@glideapps/glide-data-grid-cells";
import "@glideapps/glide-data-grid/dist/index.css";
import { useCallback, useState } from "react";
import { useLayer } from "react-laag";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const tableData = [
  {
    age: 33,
    name: "Delaney Cortez",
    company: "IZZBY",
    email: "delaneycortez@izzby.com",
    phone: "+1 (844) 567-3740",
    image: "https://picsum.photos/id/74/900/900",
    address: "870 Hegeman Avenue, Crawfordsville, Kentucky, 2953",
    about:
      "Nostrud labore esse labore aliquip. Qui excepteur sint exercitation adipisicing deserunt ad veniam sunt ipsum nulla deserunt dolor est culpa. Eu deserunt nostrud ipsum mollit consectetur mollit et. Commodo mollit qui Lorem fugiat eiusmod dolore amet est officia aliqua. Est tempor veniam sit magna. Ullamco veniam eiusmod nostrud sit dolor. Est proident cupidatat proident ullamco irure commodo nisi fugiat adipisicing ullamco adipisicing ad officia.\r\n",
    date: "2023-01-10T09:02:53.870Z"
  },
  {
    age: 24,
    name: "Williamson Davenport",
    company: "ONTAGENE",
    email: "williamsondavenport@ontagene.com",
    phone: "+1 (844) 564-3345",
    image: "https://picsum.photos/id/40/900/900",
    address: "274 Forest Place, Vowinckel, Maine, 9510",
    about:
      "Quis ipsum ad deserunt cillum consequat do ex laboris sit eiusmod pariatur occaecat voluptate. Laborum ea sit duis mollit est sunt culpa ut et commodo consectetur veniam adipisicing amet. Ipsum mollit proident ea deserunt veniam Lorem duis aliquip dolor duis proident ut. Velit esse officia occaecat exercitation magna consequat ullamco ea nisi. Ad ea deserunt occaecat quis occaecat eiusmod ad do. Elit veniam quis aliquip qui nostrud laborum irure minim aute irure fugiat. Ullamco aliquip dolor est sit nulla consectetur.\r\n",
    date: "2023-01-10T09:02:53.870Z"
  },
  {
    age: 30,
    name: "Alexander Wong",
    company: "QUADEEBO",
    email: "alexanderwong@quadeebo.com",
    phone: "+1 (834) 497-2624",
    image: "https://picsum.photos/id/8/900/900",
    address: "420 Borinquen Pl, Kenvil, Vermont, 7377",
    about:
      "Dolor mollit elit est ex. Sit mollit laboris ad pariatur magna est amet veniam ad ad velit incididunt eu. Minim ipsum qui labore eiusmod magna veniam in magna pariatur Lorem.\r\n",
    date: "2023-01-10T09:02:53.870Z"
  },
  {
    age: 24,
    name: "Blanca Schultz",
    company: "CUJO",
    email: "blancaschultz@cujo.com",
    phone: "+1 (954) 412-2870",
    image: "https://picsum.photos/id/42/900/900",
    address: "144 Albemarle Terrace, Watchtower, Delaware, 2829",
    about:
      "Pariatur sunt dolore nostrud cillum cupidatat culpa. Ipsum laborum laboris reprehenderit Lorem culpa. Consequat duis do occaecat ipsum cupidatat sunt minim minim cillum commodo in qui culpa anim. Et ullamco nisi eiusmod laboris veniam laborum ullamco reprehenderit aliqua nulla labore. Elit excepteur sunt exercitation anim sint non ea.\r\n",
    date: "2023-01-10T09:02:53.870Z"
  },
  {
    age: 34,
    name: "Eunice Romero",
    company: "CENTREGY",
    email: "euniceromero@centregy.com",
    phone: "+1 (949) 568-3290",
    image: "https://picsum.photos/id/3/900/900",
    address: "698 Clermont Avenue, Harmon, Washington, 1094",
    about:
      "Nulla aute enim incididunt labore aute id officia fugiat tempor aliqua. Fugiat incididunt sint nisi eiusmod fugiat magna minim in. Officia eu enim magna magna pariatur deserunt esse amet veniam sint consequat est sit.\r\n",
    date: "2023-01-10T09:02:53.870Z"
  }
];

export const GlideDataGrid = () => {
  const [showSearch, setShowSearch] = useState(false);
  const onSearchClose = useCallback(() => setShowSearch(false), []);
  let [data, setData] = useState(tableData);
  let [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
  const cellProps = useExtraCells();
  const [showMenu, setShowMenu] = useState();

  const [columns, setColumns] = useState([
    {
      title: "Name",
      id: "name",
      hasMenu: true,
      icon: GridColumnIcon.HeaderString
    },
    {
      title: "Company",
      id: "company",
      hasMenu: true,
      dataType: "Bubble"
    },
    {
      title: "Age",
      id: "age",
      hasMenu: true,
      dataType: "Number"
    },
    {
      title: "Image dd",
      id: "image",
      key: "image",
      dataType: "Image"
    },
    {
      title: "Email",
      id: "email",
      hasMenu: true
    },
    {
      title: "Date",
      id: "date",
      hasMenu: true,
      dataType: "DatePicker"
    },
    {
      title: "Phone",
      id: "phone"
    },
    {
      title: "Address",
      id: "address"
    },
    {
      title: "about",
      id: "about"
    }
  ]);

  const onColumnResize = useCallback((column:any, newSize:number) => {
    setColumns((prevColsMap) => {
      const index = columns.findIndex((ci) => ci.title === column.title);
      const newArray = [...prevColsMap];
      newArray.splice(index, 1, {
        ...prevColsMap[index],
        // @ts-ignore
        width: newSize as any
      });

      return newArray;
    });
  }, []);

  const getContent = useCallback(
    (cell:any): GridCell => {
      const [col, row] = cell;
      const dataRow = data[row] as any;
      const d = dataRow[columns[col].id];

      const { dataType } = columns[col];

      if (dataType === "Number") {
        return {
          allowOverlay: true,
          kind: GridCellKind.Number,
          data: d,
          displayData: d.toString()
        };
      } else if (dataType === "Image") {
        return {
          kind: GridCellKind.Image,
          data: [d],
          allowOverlay: true,
          allowAdd: true
        };
      } else if (dataType === "Bubble") {
        return {
          kind: GridCellKind.Bubble,
          data: ["sss", "ss"],
          allowOverlay: true
        };
      } else if (dataType === "SingleDropdown") {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: '4',
          data: {
            kind: "dropdown-cell",
            allowedValues: ["Good", "Better", "Best"],
            value: "Good"
          }
        };
      } else if (dataType === "DatePicker") {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: "4",
          data: {
            kind: "date-picker-cell",
            date: new Date(),
            displayDate: new Date().toISOString(),
            format: "date"
          }
        };
      } else {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          displayData: d,
          data: d
        };
      }
    },
    [data, columns]
  );

  const onCellEdited = useCallback(
    (cell:any, newValue:any) => {
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }

      const [col, row] = cell;
      const key = columns[col].id;
      // @ts-ignore
      data[row][key] = newValue.data;

      setData(data);
    },
    [data, columns]
  );

  const onDragOverCell = (cell:any) => {
    console.log(cell);
  };

  const onRowAppended = useCallback(() => {
    let newRowObj = {};
    for (const [key, value] of Object.entries(data[0])) {
      // @ts-ignore
      newRowObj[key] = "";
    }

    // @ts-ignore
    setData([...data, newRowObj]);
  }, [data]);

  const onHeaderClicked = useCallback(() => {
    console.log("Header clicked");
  }, []);

  const onOutsideClick = () => {
    if (isSubMenuOpen) {
      setShowMenu(undefined);
      setIsSubMenuOpen((cv) => !cv);
    }
    setIsSubMenuOpen((cv) => !cv);
  };

  const { renderLayer, layerProps } = useLayer({
    isOpen: showMenu !== undefined,
    triggerOffset: 2,
    onOutsideClick,
    trigger: {
      getBounds: () => ({
        // @ts-ignore
        bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),
        // @ts-ignore
        height: showMenu?.bounds.height ?? 0,
        // @ts-ignore
        left: showMenu?.bounds.x ?? 0,
        // @ts-ignore
        right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),
        // @ts-ignore
        top: showMenu?.bounds.y ?? 0,
        // @ts-ignore
        width: showMenu?.bounds.width ?? 0
      })
    },
    placement: "bottom-end",
    auto: true
  });

  const onHeaderMenuClick = useCallback((col:any, bounds:any) => {
    setIsSubMenuOpen((cv) => !cv);
    // @ts-ignore
    setShowMenu({ col, bounds });
  }, []);

  const onAddCol = useCallback(() => {
    const newData = data.map((row) => {
      return { ...row, new: "" };
    });
    setData(newData);
    // setIndexes([...Object.keys(data[0]), "new"]);
    setColumns([
      ...columns,
      {
        title: "New",
        id: "new",
        hasMenu: true
      }
    ]);
  }, [data, columns]);

  const onColMoved = useCallback((startIndex:any, endIndex:any) => {
    setColumns((old) => {
      const newCols = [...old];
      const [toMove] = newCols.splice(startIndex, 1);
      newCols.splice(endIndex, 0, toMove);
      return newCols;
    });
  }, []);

  return (
    <div className="App">
      {/* <button onClick={() => setShowSearch(true)}>
                  Show Search
            </button> */}
      <DataEditor
        {...cellProps}
        getCellContent={getContent}
        columns={columns}
        onCellEdited={onCellEdited}
        onHeaderMenuClick={onHeaderMenuClick}
        onHeaderClicked={onHeaderClicked}
        onCellContextMenu={(_, e) => e.preventDefault()}
        rows={data.length}
        rowMarkers={"both"}
        showSearch={showSearch}
        getCellsForSelection={true}
        onSearchClose={onSearchClose}
        onRowAppended={onRowAppended}
        onDragOverCell={onDragOverCell}
        onRowMoved={(s, e) => window.alert(`Moved row ${s} to ${e}`)}
        height={"500px"}
        onColumnMoved={onColMoved}
        trailingRowOptions={{
          // How to get the trailing row to look right
          sticky: true,
          tint: false,
          hint: "New row...",
          // @ts-ignore
          themeOverride: true
        }}
        smoothScrollX={true}
        smoothScrollY={true}
        verticalBorder={(c) => c > 0}
        // freezeColumns={1}
        onDragStart={(e) => {
          e.setData("text/plain", "Drag data here!");
        }}
        rightElement={
          <div className="addCol">
            <button onClick={() => onAddCol()}>+</button>
          </div>
        }
        rightElementProps={{
          fill: false,
          sticky: true
        }}
        onColumnResize={onColumnResize}
      />
      <div id="portal" />
      {showMenu !== undefined &&
        renderLayer(
          <div
            {...layerProps}
            style={{
              ...layerProps.style,
              width: 300,
              padding: 4,
              borderRadius: 8,
              backgroundColor: "white",
              border: "1px solid black"
            }}
          >
            <ul>
              <li>Action 1</li>
              <li>Action 2</li>
              <li>Action 3</li>
            </ul>
          </div>
        )}
    </div>
  );
};