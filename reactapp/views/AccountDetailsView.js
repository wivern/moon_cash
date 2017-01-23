'use strict';

import React from "react";
import TransactionList from "../components/transaction/TransactionList";
import RaisedButton from "material-ui/RaisedButton";
import AccountStore from "../stores/AccountStore";
import AccountActions from "../actions/AccountActions";
import AccountIcon from "material-ui/svg-icons/action/account-balance";
import {blue800} from "material-ui/styles/colors";
import TransactionDialog from "../components/transaction/TransactionDialog";
import FlatButton from "material-ui/FlatButton";
import Popover from "material-ui/Popover";
import AccountList from "../components/account/AccountList";
import TransactionActions from "../actions/TransactionActions";

const styles = {
    panel: {
        margin: '10px 0 10px'
    },
    button: {
        marginRight: '10px'
    }
};

class AccountDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {account: AccountStore.getAccount(this.props.params.id)};
        this.onStoreChanged = this.onStoreChanged.bind(this);
    }

    componentDidMount() {
        AccountStore.listen(this.onStoreChanged);
        if (!this.state.account) {
            AccountActions.list();
        }
    }

    componentWillUnmount() {
        AccountStore.unlisten(this.onStoreChanged);
    }

    componentWillReceiveProps(nextProps){
        this.setState({account: AccountStore.getAccount(nextProps.params.id)});
    }

    onStoreChanged(state) {
        this.setState({account: AccountStore.getAccount(this.props.params.id)});
    }

    onAddRequest(){
        this.setState({dialogOpen: true});
    }

    handleRequestClose(){
        this.setState({open: false});
    }

    onPopover(event){
        this.setState({open: true, anchorEl: event.currentTarget});
    }
    onAddTransaction(data){
        console.log('AccountDetailsView.onAddTransaction', data);
        const account = this.state.account;
        if (account){
            TransactionActions.create(account.ID, data);
        }
        this.setState({dialogOpen: false});
    }
    onAccountOpen(account){
        console.log('AccountDetailsView.onAccountOpen', account);
        const router = this.context.router;
        if (router) {
            router.push("/accounts/" + account.ID);
            this.setState({open: false});
        }
    }

    render() {
        const account = this.state.account;
        const titleBar = account ? <div className="titlePanel">
                <AccountIcon viewBox="32 32" color={blue800} style={{verticalAlign: 'middle'}} />
                <FlatButton labelStyle={{color: '#1565C8'}} style={{marginLeft: '10px'}}
                            onTouchTap={this.onPopover.bind(this)}
                            label={account.Name} />
            </div> : null;

        return <div className="fullheight">
            {titleBar}
            <Popover open={this.state.open}
                     anchorEl={this.state.anchorEl}
                     anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                     targetOrigin={{horizontal: 'left', vertical: 'top'}}
                     style={{width: '250px'}}
                     onRequestClose={this.handleRequestClose.bind(this)}>
                <AccountList disableMenu={true} onOpen={this.onAccountOpen.bind(this)} />
            </Popover>
            <div style={styles.panel}>
                <RaisedButton style={styles.button} primary={true}
                              onTouchTap={this.onAddRequest.bind(this)}
                              label="Add transaction"/>
            </div>
            <TransactionDialog open={this.state.dialogOpen}
                               onSubmit={this.onAddTransaction.bind(this)}
                               onHandleClose={() => this.setState({dialogOpen: false})} />
            <TransactionList account={this.state.account}/>
        </div>;
    }
}

AccountDetailsView.contextTypes = {
    router: React.PropTypes.object
};

export default AccountDetailsView;