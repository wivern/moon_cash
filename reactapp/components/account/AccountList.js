'use strict';

import React from "react";
import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import AccountActions from "../../actions/AccountActions";
import AccountStore from "../../stores/AccountStore";
import _ from "underscore";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "../../node_modules/material-ui/svg-icons/navigation/more-vert";
import IconButton from "material-ui/IconButton";

const iconButtonElement = (
    <IconButton touch={true} tooltip="more actions" tooltipPosition="bottom-left">
        <MoreVertIcon />
    </IconButton>
);

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
    onItemDelete(account){
        console.log('AccountList.onItemDelete', account);
        if (_.isFunction(this.props.onDelete)){
            this.props.onDelete(account);
        }
    }
    onItemOpen(account){
        console.log('AccountList.onItemOpen', account);
        if (_.isFunction(this.props.onOpen)){
            this.props.onOpen(account);
        }
    }
    render() {
        const accounts = this.state.accounts;
        const types = [];
        accounts.forEach(a => {
            let type = types.find(t => t.ID === a.AccountType.ID);
            if (!type){
                type = _.clone(a.AccountType);
                type.accounts = [];
                types.push(type);
            }
            type.accounts.push(a);
        });
        const items = types.map((t, index) => {
            const accs = t.accounts.map(a => {
                const rightIconMenu = !this.props.disableMenu ? (
                    <IconMenu iconButtonElement={iconButtonElement}>
                        <MenuItem key="add" primaryText="Add transaction" />
                        <MenuItem key="edit" primaryText="Edit" />
                        <Divider />
                        <MenuItem key="delete" onTouchTap={this.onItemDelete.bind(this, a)} primaryText="Delete" />
                    </IconMenu>
                ) : null;
                return <ListItem key={a.ID} primaryText={a.Name} secondaryText="150,000 р."
                                 onTouchTap={this.onItemOpen.bind(this, a)}
                                 rightIconButton={rightIconMenu} />
            });
            if (index < types.length - 1) {
                return <div key={t.ID}><List><Subheader inset={true}>{t.Name}</Subheader>{accs}</List><Divider inset={true}/>
                </div>;
            } else {
                return <div key={t.ID}><List><Subheader inset={true}>{t.Name}</Subheader>{accs}</List></div>;
            }
        });

        return <div className="accountList">
            {items}
        </div>;
    }
}