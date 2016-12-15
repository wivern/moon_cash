'use strict';

import React from 'react';
import {AgGridReact} from 'ag-grid-react';

const columns = [
    {headerName: 'Date', field: 'date'},
    {headerName: 'Amount', field: 'amount'},
    {headerName: 'Balance', field: 'balance'},
    {headerName: 'Description', field: 'description'},
    {headerName: 'Account', field: 'account'}
];

export default class TransactionList extends React.Component{
    constructor(props){
        super(props);
        this.state = {transactions: []};
    }
    onReady(params){
        this.api = params.api;
        this.columnsApi = params.columnsApi;
    }
    render(){
        return <div className="ag-material" style={{height: '80vh'}}>
            <AgGridReact
                onGridReady={this.onReady.bind(this)}
                columnDefs={columns}
                rowData={this.state.transactions}
                rowHeight="48"
            />
        </div>
    }
}