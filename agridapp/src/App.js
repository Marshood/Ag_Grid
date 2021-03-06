import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import json from './Data/json.json'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

function App() {
  useEffect(() => {
    // console.log("data , ",json)
    setRowData(json);
    return () => {

    }
  }, [])
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
 
  const [rowData, setRowData] = useState([

  ]);
  const columns = [
    { headerName: "id", field: 'id', checkboxSelection: true },
    { headerName: "BarCode", field: 'BarCode', tooltipField: "BarCode" },
    { headerName: "ProduName", field: 'ProduName', tooltipField: "ProduName" },
    { headerName: "Segment", field: 'Segment', tooltipField: "Segment" },
    { headerName: "Brand", field: 'Brand', tooltipField: "Brand" },
    { headerName: "Series", field: 'Series', tooltipField: "Series" },
    { headerName: "TotalPrice", field: 'TotalPrice', tooltipField: "TotalPrice" },
    { headerName: "Percent_TotalPrice", field: 'Percent_TotalPrice', tooltipField: "Percent_TotalPrice", valueFormatter: PercentFormatter },
    { headerName: "TotalAmount", field: 'TotalAmount', tooltipField: "TotalAmount" },
    { headerName: "Percent_TotalAmount", field: 'Percent_TotalAmount', tooltipField: "Percent_TotalAmount" },
    { headerName: "Percent_Avg", field: 'Percent_Avg', tooltipField: "Percent_Avg" },
    { headerName: "Percent_Profit", field: 'Percent_Profit', tooltipField: "Percent_Profit" },
    { headerName: "Percent_MarketAmount", field: 'Percent_MarketAmount', tooltipField: "Percent_MarketAmount" },
    { headerName: "MarketPrice", field: 'MarketPrice', tooltipField: "MarketPrice" },
    { headerName: "Status", field: 'Status', tooltipField: "Status" },
    { headerName: "Remark", field: 'Remark', tooltipField: "Remark" },
    { headerName: "date", field: 'date', tooltipField: "date" },

  ]
  function PercentFormatter(params) {
    return params.value + '%';//formatNumber(params.value)
  }

  const defaultColDef = {
    sortable: true, editable: true, filter: true, floatingFilter: true,
    flex: true,
  };
  const onGridReady= (params) => {
    setGridApi(params);
    setGridColumnApi(params.columnApi);
 
}
  const onFilterTextChange = (e) => {
    gridApi.api.setQuickFilter(e.target.value)
  }
  return (
    <div className="App">
      <div className="ag-theme-alpine center" style={{ height: 400, width: 600 }}>

        <input type="serach" onChange={onFilterTextChange}
          placeholder="Search"></input>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columns}
          onGridReady={onGridReady}
          // enableBrowserTooltips={true}
        // tooltipShowDelay={{ tooltipShowDelay: 2 }}
        // sideBar={true}

        >
          {/*          
          <AgGridColumn field="id" />
          <AgGridColumn field="name" minWidth={180} />
          <AgGridColumn field="body" />
          <AgGridColumn
            field="athlete"
            filter="agTextColumnFilter"
            minWidth={200}
          /> */}
        </AgGridReact>

      </div>
    </div>
  );
}

export default App;
