'use strict';

import React from "react";
import {AgGridReact} from "ag-grid-react";
import TransactionActions from "../../actions/TransactionActions";
import TransactionStore from "../../stores/TransactionStore";
import format from "date-format";

const columns = [
    {headerName: 'Type', field: 'Type'},
    {headerName: 'Date', field: 'Date',
        cellRenderer: params => format.asString("dd.MM", new Date(params.value))},
    {headerName: 'Amount', field: 'Amount', cellStyle: params => {
        const type = params.data.type;
        switch(type){
            case 'income':
                return {color: 'green'};
            case 'expense':
                return {color: 'red'};
        }
    }},
    {headerName: 'Balance', field: 'Balance'},
    {headerName: 'Description', field: 'Description'},
    {headerName: 'Account', field: 'Account', cellRenderer: params => {
        console.log('render', params.value);
        return params.value.Name;
    }}
];

export default class TransactionList extends React.Component{
    constructor(props){
        super(props);
        this.state = {transactions: []};
        this.onStoreChanged = this.onStoreChanged.bind(this);
    }
    componentDidMount(){
        TransactionStore.listen(this.onStoreChanged);
        const account = this.props.account;
        if (account){
            TransactionActions.list(account.ID);
        }
    }
    componentWillUnmount(){
        TransactionStore.unlisten(this.onStoreChanged);
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.account){
            TransactionActions.list.defer(nextProps.account.ID);
        }
    }
    onStoreChanged(state){
        console.log('TransactionList.onStoreChanged', state);
        this.setState(state);
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