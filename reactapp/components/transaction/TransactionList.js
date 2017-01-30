'use strict';

import React from "react";
import {AgGridReact} from "ag-grid-react";
import TransactionActions from "../../actions/TransactionActions";
import TransactionStore from "../../stores/TransactionStore";
import UpIcon from "material-ui/svg-icons/action/trending-up";
import DownIcon from "material-ui/svg-icons/action/trending-down";
import {red500, green500} from "material-ui/styles/colors";
import {FormattedNumber, FormattedDate} from "react-intl";

const STYLES = {
    income: {
        color: 'green',
        align: 'right'
    },
    expense: {
        color: 'red'
    },
    numeric: {
        'text-align': 'right',
        'padding-right': '10px'
    }
};

class AmountCellRenderer extends React.Component{
    renderIncome(value){
        return <span style={STYLES.income}>+<FormattedNumber value={value} minimumFractionDigits={2} style="decimal" /></span>;
    }
    renderExpense(value){
        return <span style={STYLES.expense}>-<FormattedNumber value={value} minimumFractionDigits={2} style="decimal" /></span>;
    }

    render(){
        const type = this.props.data.Type;
        switch (type){
            case 'income':
                return this.renderIncome(this.props.value);
            case 'expense':
                return this.renderExpense(this.props.value);
            default:
                return <span><FormattedNumber value={this.props.value} minimumFractionDigits={2} style='decimal' /></span>;
        }
    }
}

class BalanceCellRenderer extends React.Component{
    renderIcon(){
        const type = this.props.data.Type;
        switch (type){
            case 'income':
                return <UpIcon color={green500} />;
            case 'expense':
                return <DownIcon color={red500} />;
        }
    }
    render(){
        const value = this.props.value;
        let style = value > 0 ? STYLES.income : STYLES.expense;
        // style.verticalAlign = 'top';
        const sign = value > 0 ? "" : "-";
        return <div style={style}>{sign}<FormattedNumber value={value} minimumFractionDigits={2} style="decimal" /></div>;
    }
}

class DateCellRenderer extends React.Component{
    render(){
        return <FormattedDate day="2-digit" month="long" value={this.props.value} />
    }
}

const columns = [
    {headerName: 'Type', field: 'Type'},
    {headerName: 'Date', field: 'Date',
        cellRendererFramework: DateCellRenderer},
    {headerName: 'Amount', field: 'Amount',
        cellStyle: STYLES.numeric,
        cellRendererFramework: AmountCellRenderer},
    {headerName: 'Balance', field: 'Balance',
        cellStyle: STYLES.numeric,
        cellRendererFramework: BalanceCellRenderer},
    {headerName: 'Description', field: 'Description'},
    {headerName: 'Account', field: 'Account', cellRenderer: params => {
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
                enableColResize={true}
                columnDefs={columns}
                rowData={this.state.transactions}
                rowHeight="48"
            />
        </div>
    }
}