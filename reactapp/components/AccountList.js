'use strict';

import React from "react";
import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import AccountActions from "../actions/AccountActions";
import AccountStore from "../stores/AccountStore";
import _ from "underscore";

export default class AccountList extends React.Component {
    constructor(props){
        super(props);
        this.state = {accounts: []};
        this.storeChanged = this.storeChanged.bind(this);
    }
    componentDidMount(){
        AccountStore.listen(this.storeChanged);
        AccountActions.list();
    }
    componentWillUnmount(){
        AccountStore.unlisten(this.storeChanged);
    }
    storeChanged(state){
        console.log('AccountList.storeChanged', state);
        this.setState(state);
    }
    render() {
        const accounts = this.state.accounts;
        const types = {};
        accounts.forEach(a => {
            if (!_.has(types, a.AccountType.ID)){
                types[a.AccountType.ID] = a.AccountType;
                types[a.AccountType.ID].accounts = [];
            }
            types[a.AccountType.ID].accounts.push(a);
        });

        return <div>
            <List>
                <Subheader inset={true}>SAVINGS</Subheader>
                <ListItem primaryText={<p>Alfabank savings</p>} secondaryText={<p>150,000 р.</p>}/>
            </List>
            <Divider inset={true}/>
            <List>
                <Subheader inset={true}>CREDIT CARD</Subheader>
                <ListItem primaryText={<p>Sberbank VISA</p>}/>
                <ListItem primaryText={<p>Citybank MASTERCARD</p>}/>
            </List>
        </div>;
    }
}