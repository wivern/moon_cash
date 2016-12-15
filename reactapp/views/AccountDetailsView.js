'use strict';

import React from "react";
import TransactionList from "../components/transaction/TransactionList";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
    panel: {
        margin: '10px 0 10px'
    },
    button: {
        marginRight: '10px'
    }
};

export default class AccountDetailsView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return <div className="fullheight">
            <div style={styles.panel}>
                <RaisedButton style={styles.button} label="Add transaction" />
            </div>
            <TransactionList />
        </div>;
    }
}