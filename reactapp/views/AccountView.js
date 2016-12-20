'use strict';

import React from "react";
import AccountList from "../components/account/AccountList";
import muiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AddIcon from "material-ui/svg-icons/content/add-circle";
import AccountActions from "../actions/AccountActions";
import AccountDialog from "../components/account/AccountDialog";

const style = {
    popover: {
        padding: '20px'
    }
};

class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newAccount: false};
    }

    onNewAccountRequest(event) {
        this.setState({newAccount: true, targetEl: event.target})
    }

    onNewAccount(data) {
        console.log('AccountView.onNewAccount', data);
        AccountActions.create(data);
        this.setState({newAccount: false});
    }

    onDeleteAccount(account) {
        AccountActions.remove(account);
    }

    onOpenAccount(account) {
        console.log('AccountView.onOpenAccount');
        const router = this.context.router;
        if (router) {
            router.push("/accounts/" + account.ID);
        }
    }

    render() {
        return <div className="view">
            <muiThemeProvider>
                <AccountList
                    onOpen={this.onOpenAccount.bind(this)}
                    onDelete={this.onDeleteAccount.bind(this)}/>
            </muiThemeProvider>
            <RaisedButton label="Add account" primary={true} icon={<AddIcon />}
                          onTouchTap={this.onNewAccountRequest.bind(this)}/>
            <muiThemeProvider>
                <AccountDialog open={this.state.newAccount}
                               onSubmit={this.onNewAccount.bind(this)}
                               onRequestClose={() => this.setState({newAccount: false})} />
            </muiThemeProvider>
        </div>;
    }
}

AccountView.contextTypes = {
    router: React.PropTypes.object
};

export default AccountView;