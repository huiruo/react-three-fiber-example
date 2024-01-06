## cache 初始化怎么赋值
```js
const cache = React.useRef<ContentCache>(new ContentCache());
```

可见也是在`getCellContent`赋值
```js
const getCellContent = React.useCallback(
  ([col, row]: Item): GridCell => {
    let val = cache.current.get(col, row);
    if (val === undefined) {
      val = colsMapRef.current[col].getContent();
      // HACK: set row val
      // console.log('getCellContent-val:',(val as any)?.data)
      if (!readonly && isTextEditableGridCell(val)) {
        val = { ...val, readonly };
      }

      // console.log('%c====set===>1:','color:red')
      cache.current.set(col, row, val);
    }

    // console.log('getCellContent', { col, row, val }, cache.current)
    return val;
  },
  [readonly]
);
```

## util 代码解析
这段代码是一个使用faker库生成模拟数据的辅助函数`useMockDataGenerator`。它接受三个参数`numCols`、`readonly`和`group`，并返回一些帮助构建模拟数据的函数。

`useMockDataGenerator`函数中的`getResizableColumns`函数定义了一个默认的列配置数组`defaultColumns`，每个列配置都包含了一些属性，如标题、ID、组名、图标等。每个列配置还有一个`getContent`函数，该函数用来生成每个单元格的模拟数据。

`useMockDataGenerator`函数通过调用`getResizableColumns`函数生成列配置数组，并将其存储在`colsMap`状态中。然后，它使用`getGridColumn`函数将每个列配置转换为标准的`GridColumn`对象。最后，它返回了一些帮助构建模拟数据的函数，如`getCellContent`、`setCellValue`等。

`getCellContent`函数接受一个二维坐标`[col, row]`作为参数，从缓存中获取对应单元格的值。如果缓存中不存在该值，则调用列配置的`getContent`函数生成新的模拟数据，并将其存储在缓存中。

`setCellValue`函数用于设置单元格的值。它接受一个二维坐标`[col, row]`和新的单元格值作为参数。它首先从缓存中获取当前单元格的值，然后使用`lossyCopyData`函数将新的单元格值复制到当前单元格中。`lossyCopyData`函数根据目标单元格的类型将源单元格的值进行转换，并返回一个新的单元格对象。最后，将新的单元格值存储在缓存中。

这段代码还定义了一个`ContentCache`类，用于缓存单元格的值。`ContentCache`类使用一个`Map`对象来存储缓存数据，其中键是列号，值是一个嵌套的`Map`对象，键是行号，值是单元格的值。

## 调用 getResizableColumns 初始化
```js
function getResizableColumns(amount: number, group: boolean): GridColumnWithMockingInfo[] {
  const defaultColumns: GridColumnWithMockingInfo[] = [
    {
      title: "First name",
      id: "First name",
      group: group ? "Name" : undefined,
      icon: GridColumnIcon.HeaderString,
      hasMenu: false,
      getContent: () => {
        const firstName = faker.name.firstName();
        // const firstName = 'test';
        return {
          kind: GridCellKind.Text,
          displayData: firstName,
          data: firstName,
          allowOverlay: true,
          readonly: true,
        };
      },
    },
    {
      title: "Last name",
      id: "Last name",
      group: group ? "Name" : undefined,
      icon: GridColumnIcon.HeaderString,
      hasMenu: false,
      getContent: () => {
        // const lastName = faker.name.lastName();
        const lastName = 'test2';
        return {
          kind: GridCellKind.Text,
          displayData: lastName,
          data: lastName,
          allowOverlay: true,
          readonly: true,
        };
      },
    },
    {
      title: "Avatar",
      id: "Avatar",
      group: group ? "Info" : undefined,
      icon: GridColumnIcon.HeaderImage,
      hasMenu: false,
      getContent: () => {
        const n = Math.round(Math.random() * 100);
        return {
          kind: GridCellKind.Image,
          data: [`https://picsum.photos/id/${n}/900/900`],
          displayData: [`https://picsum.photos/id/${n}/40/40`],
          allowOverlay: true,
          allowAdd: false,
          readonly: true,
        };
      },
    },
    // ....
  ];

  if (amount < defaultColumns.length) {
    return defaultColumns.slice(0, amount);
  }

  return [...defaultColumns];
}
```

### 可见模拟的值是在`colsMapRef.current[col].getContent()`获取的
```js
  const getCellContent = React.useCallback(
    ([col, row]: Item): GridCell => {
      let val = cache.current.get(col, row);
      if (val === undefined) {
        val = colsMapRef.current[col].getContent();
        console.log('getCellContent-val:',(val as any)?.data)
        if (!readonly && isTextEditableGridCell(val)) {
          val = { ...val, readonly };
        }

        // console.log('%c====set===>1:','color:red')
        cache.current.set(col, row, val);
      }

      // console.log('getCellContent', { col, row, val }, cache.current)
      return val;
    },
    [readonly]
  );
```