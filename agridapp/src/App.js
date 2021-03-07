import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import json from './Data/json.json'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';
import { Modal } from '@material-ui/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

function App() {
  useEffect(() => {
    // console.log("data , ",json)
    setRowData(json);
    return () => {
    }
  }, [])
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [SelectionChanged, seTSelectionChanged] = useState(null)


  const columns = [
    {
      headerName: "id", field: 'id', checkboxSelection: true,// filter: 'agNumberColumnFilter',
      filter: 'agNumberColumnFilter', suppressMenu: true,
      floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    {
      headerName: "Sum(Percent_Avg)", field: 'Sum(Percent_Avg)', tooltipField: "Sum(Percent_Avg)"

      , field: "Percent_Avg",
      aggFunc: "sum",
      enableValue: true
    },
    {
      headerName: "BarCode", field: 'BarCode', tooltipField: "BarCode", floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    { headerName: "ProduName", field: 'ProduName', tooltipField: "ProduName" },
    { headerName: "Segment", field: 'Segment', tooltipField: "Segment", rowGroup: true },
    { headerName: "Brand", field: 'Brand', tooltipField: "Brand" },
    { headerName: "Series", field: 'Series', tooltipField: "Series" },
    {
      headerName: "TotalPrice", field: 'TotalPrice', tooltipField: "TotalPrice", floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    {
      headerName: "Percent_TotalPrice", field: 'Percent_TotalPrice', tooltipField: "Percent_TotalPrice", valueFormatter: PercentFormatter,
      floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    { headerName: "TotalAmount", field: 'TotalAmount', tooltipField: "TotalAmount" },
    {
      headerName: "Percent_TotalAmount", field: 'Percent_TotalAmount', tooltipField: "Percent_TotalAmount", valueFormatter: PercentFormatter, floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    {
      headerName: "Percent_Avg", field: 'Percent_Avg', tooltipField: "Percent_Avg", floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    {
      headerName: "Percent_Profit", field: 'Percent_Profit', tooltipField: "Percent_Profit", floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    {
      headerName: "Percent_MarketAmount", field: 'Percent_MarketAmount', tooltipField: "Percent_MarketAmount", valueFormatter: PercentFormatter, floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    {
      headerName: "MarketPrice", field: 'MarketPrice', tooltipField: "MarketPrice", floatingFilterComponent: 'customNumberFloatingFilter',
      floatingFilterComponentParams: {
        // suppressFilterButton: true,
        color: 'red'
      }
    },
    { headerName: "Status", field: 'Status', tooltipField: "Status" },
    { headerName: "Remark", field: 'Remark', tooltipField: "Remark" },
    {
      headerName: "date", field: 'date', tooltipField: "date",
      filter: "agDateColumnFilter",
      filterParams: {
        debounceMs: 500,
        suppressAndOrCondition: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          if (cellValue == null) {
            return 0;
          }
          var dateParts = cellValue.split("/");
          var year = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var day = Number(dateParts[0]);
          var cellDate = new Date(year, month, day);
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    },


  ]
  function PercentFormatter(params) {
    return params.value + '%';//formatNumber(params.value)
  }

  const defaultColDef = {
    sortable: true,
    // editable: true,
    filter: true,
    floatingFilter: true,
    flex: true,

  };
  const onGridReady = (params) => {
    setGridApi(params);
    setGridColumnApi(params.columnApi);
  }
  const onFilterTextChange = (e) => {
    gridApi.api.setQuickFilter(e.target.value)
  }
  var gridOptions = {
    columnDefs: defaultColDef,
    defaultColDef: {
      sortable: true,
    },
    autoGroupColumnDef: {
      comparator: function (valueA, valueB, nodeA, nodeB, isInverted) {
        var res = valueA == valueB ? 0 : valueA > valueB ? 1 : -1;
        return res;
      },
      field: 'athlete',
      sort: 'asc',
    },
  };
  function handleOpen() {
    setOpen(true);

  }
  function handleRemove() {
    let newArray = [];
    if (SelectionChanged == [] || SelectionChanged == null) {
      alert("Choose item to remove");
    } else {
      newArray = []
      console.log(rowData)
      SelectionChanged.map(DeleteValue => {
        let newRowData = rowData.filter(row => {
          return row !== DeleteValue;
        });
        setRowData(newRowData)
      })
    }
  }
  function handleClose() {
    setOpen(false);
  }
  //add new data to table
  function handleSubmitData(e) {
    e.preventDefault();
    let inputID = e.target.inputID.value;
    let BarCode = e.target.BarCode.value;
    let ProduName = e.target.ProduName.value;
    let Segment = e.target.Segment.value;
    let Brand = e.target.Brand.value;
    let Series = e.target.Series.value;
    let TotalPrice = e.target.TotalPrice.value;
    let Percent_TotalAmount = e.target.Percent_TotalAmount.value;
    let Percent_Avg = e.target.Percent_Avg.value;
    let Percent_Profit = e.target.Percent_Profit.value;
    let Percent_MarketAmount = e.target.Percent_MarketAmount.value;
    let MarketPrice = e.target.MarketPrice.value;
    let Status = e.target.Status.value;
    let Remark = e.target.Remark.value;
    let TotalAmount = e.target.TotalAmount.value;
    let Percent_TotalPrice = e.target.Percent_TotalPrice.value;
    // let date = e.target.InputDate.value;
    // 
    var dateControl = document.querySelector('input[type="date"]');
    // dateControl.value = '2017-06-01';
    console.log(dateControl.value); // prints "2017-06-01"
    let newData = {
      "id": inputID,
      "BarCode": BarCode,
      "ProduName": ProduName,
      "Supplier": "din",
      "Segment": Segment,
      "Brand": Brand,
      "Series": Series,
      "TotalPrice": TotalPrice,
      "Percent_TotalPrice": Percent_TotalPrice,
      "TotalAmount": TotalAmount,
      "Percent_TotalAmount": Percent_TotalAmount,
      "Percent_Avg": Percent_Avg,
      "Percent_Profit": Percent_Profit,
      "Percent_MarketAmount": Percent_MarketAmount,
      "MarketPrice": MarketPrice,
      "Status": Status,
      "Remark": Remark,
      "date": dateControl.value
    }
    setRowData([...rowData, {
      "id": inputID,
      "BarCode": BarCode,
      "ProduName": ProduName,
      "Supplier": "din",
      "Segment": Segment,
      "Brand": Brand,
      "Series": Series,
      "TotalPrice": TotalPrice,
      "Percent_TotalPrice": Percent_TotalPrice,
      "TotalAmount": TotalAmount,
      "Percent_TotalAmount": Percent_TotalAmount,
      "Percent_Avg": Percent_Avg,
      "Percent_Profit": Percent_Profit,
      "Percent_MarketAmount": Percent_MarketAmount,
      "MarketPrice": MarketPrice,
      "Status": Status,
      "Remark": Remark,
      "date": dateControl.value
    }])
    console.log(("newData", rowData))
    handleClose();
  }
  // to sort by number's
  function getNumberFloatingFilterComponent() {
    function NumberFloatingFilter() { }
    NumberFloatingFilter.prototype.init = function (params) {
      this.eGui = document.createElement('div');
      this.eGui.innerHTML =
        ' <input type="number" min="0" />';//&gt; style="width: 30px"
      this.currentValue = null;
      this.eFilterInput = this.eGui.querySelector('input');
      this.eFilterInput.style.color = params.color;
      
      this.eFilterInput.style.position='absolute';
      this.eFilterInput.style.left='10px';
      this.eFilterInput.style.right='10px'
      this.eFilterInput.style.top='10px'
      this.eFilterInput.style.bottom='10px'

      var that = this;
      function onInputBoxChanged() {
        if (that.eFilterInput.value === '') {
          params.parentFilterInstance(function (instance) {
            instance.onFloatingFilterChanged(null, null);
          });
          return;
        }
        that.currentValue = Number(that.eFilterInput.value);
        params.parentFilterInstance(function (instance) {
          instance.onFloatingFilterChanged('greaterThan', that.currentValue);
        });
      }
      this.eFilterInput.addEventListener('input', onInputBoxChanged);
    };
    NumberFloatingFilter.prototype.onParentModelChanged = function (parentModel) {
      if (!parentModel) {
        this.eFilterInput.value = '';
        this.currentValue = null;
      } else {
        this.eFilterInput.value = parentModel.filter + '';
        this.currentValue = parentModel.filter;
      }
    };
    NumberFloatingFilter.prototype.getGui = function () {
      return this.eGui;
    };
    return NumberFloatingFilter;
  }
  // get selected row's 
  const onSelectionChanged = (evnet) => {
    console.log(evnet.api.getSelectedRows())
    seTSelectionChanged(evnet.api.getSelectedRows())
  }
  // sum value
  function sumFunction(params) {
    var result = 0;
    params.values.forEach(function (value) {
      if (typeof value === 'number') {
        result += value;
      }
    });
    return result;
  }
  function oneTwoThreeFunc(nodes) {
    return 123;
  }
  function xyzFunc(nodes) {
    return 'xyz';
  }
  return (
    <div className="App">
      <div className="ag-theme-alpine center" style={{ height: '600px', width: '1000px' }}>
        <div>      <input type="serach" onChange={onFilterTextChange}
          placeholder="Search"></input>
          <button type="button" onClick={handleOpen}>Add item </button>
          <button type="button" onClick={handleRemove}>Remove item </button>
          <Modal
            open={open}
            onClose={handleClose}
            // aria-labelledby="simple-modal-title"
            // aria-describedby="simple-modal-description"
            aria-labelledby="contained-modal-title-vcenter"
            className='paper center ModalDiv'
            hideBackdrop={true}
         
            disableAutoFocus={true}
           >
            <div className='Modal_div'>
              <button onClick={handleClose}>Close</button>
              <br></br>
              <br></br>
              <form onSubmit={(e) => handleSubmitData(e)}>
                <h1>Adding new Item</h1>
                <label>ID </label> <br></br><input type='number' placeholder="Enter id" name='inputID' required></input> <br></br>
                <label>BarCode</label> <br></br><input type='number' placeholder="Enter BarCode" name='BarCode' required></input><br></br>
                <label>ProduName</label><br></br> <input placeholder="Enter ProduName" name='ProduName' required></input><br></br>
                <label>Segment</label><br></br> <input placeholder="Enter Segment" name='Segment' required></input><br></br>
                <label>Brand</label> <br></br><input placeholder="Enter Brand" name='Brand' required></input><br></br>
                <label>Series</label> <br></br><input placeholder="Enter Series" name='Series' required></input><br></br>
                <label>TotalPrice</label> <br></br><input type='number' placeholder="Enter TotalPrice" name='TotalPrice' required></input><br></br>
                <label>Percent_TotalPrice</label><br></br> <input type='number' placeholder="Enter Percent_TotalPrice" name='Percent_TotalPrice' required></input><br></br>
                <label>Percent_TotalAmount</label> <br></br><input type='number' placeholder="Enter Percent_TotalAmount" name='Percent_TotalAmount' required></input><br></br>
                <label>TotalAmount</label><br></br> <input type='number' type='number' placeholder="Enter TotalAmount" name='TotalAmount' required></input><br></br>
                <label>Percent_Avg</label><br></br> <input type='number' placeholder="Enter Percent_Avg" name='Percent_Avg' required></input><br></br>
                <label>Percent_Profit</label> <br></br><input type='number' placeholder="Enter Percent_Profit" name='Percent_Profit' required></input><br></br>
                <label>Percent_MarketAmount</label> <br></br><input type='number' placeholder="Enter Percent_MarketAmount" name='Percent_MarketAmount' required></input><br></br>
                <label>MarketPrice</label> <br></br><input type='number' placeholder="Enter MarketPrice" name='MarketPrice' required></input><br></br>
                <label>Status</label> <br></br><input placeholder="Enter Status" name='Status' required></input><br></br>
                <label>Remark</label> <br></br><input placeholder="Enter Remark" name='Remark' required></input><br></br>
                <label>Date:</label> <br></br><input type='date' placeholder="Enter Date" name='Date' required></input><br></br>
                <br></br>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </Modal>
        </div>

        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columns}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          // enableBrowserTooltips={true}
          // tooltipShowDelay={{ tooltipShowDelay: 2 }}
          // sideBar={true}
          components={{
            customNumberFloatingFilter: getNumberFloatingFilterComponent(),
          }}
          onSelectionChanged={onSelectionChanged}
          autoGroupColumnDef={{
            flex: 1,
            minWidth: 280,
            field: 'athlete',
          }}
          modules={[RowGroupingModule]}
          aggFuncs={{
            sum: sumFunction,
            '123': oneTwoThreeFunc,
            xyz: xyzFunc,
          }}
          rowSelection='multiple'
          groupSelectsChildren={true}
        // suppressRowClickSelection={true}
        // suppressAggFuncInHeader={true}
        >

        </AgGridReact>

      </div>
    </div>
  );
}

export default App;
