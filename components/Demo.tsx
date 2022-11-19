/* eslint-disable require-jsdoc */
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {AgGridReact} from 'ag-grid-react';
import {useCallback, useState} from 'react';
import './style.css';


const App = () => {
  const [rowData, setRowData] = useState(null);
  const [inputRow, setInputRow] = useState({});

  const [columnDefs] = useState([
    {field: 'athlete'},
    {
      field: 'sport',
      cellRenderer: SportRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: ['Swimming', 'Gymnastics', 'Cycling', 'Ski Jumping'],
        cellRenderer: SportRenderer,
      },
    },
    {field: 'date', cellEditor: DatePicker},
    {field: 'age'},
  ]);

  const [defaultColDef] = useState({
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
      isEmptyPinnedCell(params) ?
        createPinnedCellPlaceholder(params) :
        undefined,
  });

  const getRowStyle = useCallback(
      ({node}) =>
      node.rowPinned ? {fontWeight: 'bold', fontStyle: 'italic'} : {},
      [],
  );

  const onCellEditingStopped = useCallback(
      (params) => {
        if (isPinnedRowDataCompleted(params)) {
          setRowData([...rowData, inputRow]);
          setInputRow({});
        }
      },
      [rowData, inputRow],
  );

  const onGridReady = () => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => setRowData(data.slice(3, 6)));
  };

  return (
    <div style={{height: '100%', width: '100%'}} className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        getRowStyle={getRowStyle}
        pinnedTopRowData={[inputRow]}
        onGridReady={onGridReady}
        onCellEditingStopped={onCellEditingStopped}
      ></AgGridReact>
    </div>
  );

  function isEmptyPinnedCell(params) {
    console.log(params);
    return (
      (params.node.rowPinned === 'top' && params.value == null) ||
      (params.node.rowPinned === 'top' && params.value === '')
    );
  }

  function createPinnedCellPlaceholder({colDef}) {
    return colDef.field[0].toUpperCase() + colDef.field.slice(1) + '...';
  }

  function isPinnedRowDataCompleted(params) {
    if (params.rowPinned !== 'top') return;
    return columnDefs.every((def) => inputRow[def.field]);
  }
};

export default App;
