'use strict';

import React from "react";
import {AgGridReact} from "ag-grid-react";
import TransactionActions from "../../actions/TransactionActions";
import TransactionStore from "../../stores/TransactionStore";

const columns = [
    {headerName: 'Type', field: 'Type'},
    {headerName: 'Date', field: 'Date'},
    {headerName: 'Amount', field: 'Amount'},
    {headerName: 'Balance', field: 'Balance'},
    {headerName: 'Description', field: 'Description'},
    {headerName: 'Account', field: 'Account'}
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