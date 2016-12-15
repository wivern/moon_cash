'use strict';

import React from "react";
import AccountList from "../components/account/AccountList";
import muiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AddIcon from "material-ui/svg-icons/content/add-circle";
import {Popover, PopoverAnimationVertical} from "material-ui/Popover";
import Formsy from "formsy-react";
import {FormsyText, FormsySelect} from "formsy-material-ui/lib";
import MenuItem from "material-ui/MenuItem";
import Subheader from "material-ui/Subheader";
import AccountTypeStore from "../stores/AccountTypeStore";
import AccountTypeActions from "../actions/AccountTypeActions";
import AccountActions from "../actions/AccountActions";

const style = {
    popover: {
        padding: '20px'
    }
};

class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newAccount: false, types: []};
        this.onStoreChanged = this.onStoreChanged.bind(this);
    }

    componentDidMount() {
        AccountTypeStore.listen(this.onStoreChanged);
        AccountTypeActions.fetch.defer();
    }

    componentWillUnmount() {
        AccountTypeStore.unlisten(this.onStoreChanged);
    }

    onStoreChanged(state) {
        console.log("AccountView.onStoreChanged", state);
        this.setState(state);
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

    onRequestClose(event) {
        this.setState({newAccount: false});
    }

    enableButtons() {
        this.setState({accountValid: true});
    }

    disableButtons() {
        this.setState({accountValid: false});
    }

    render() {
        const types = this.state.types.map(t => <MenuItem key={t.ID} value={t.ID} primaryText={t.Name}/>)
        return <div className="view">
            <muiThemeProvider>
                <AccountList
                    onOpen={this.onOpenAccount.bind(this)}
                    onDelete={this.onDeleteAccount.bind(this)}/>
            </muiThemeProvider>
            <RaisedButton label="Add account" primary={true} icon={<AddIcon />}
                          onTouchTap={this.onNewAccountRequest.bind(this)}/>
            <muiThemeProvider>
                <Popover open={this.state.newAccount}
                         anchorEl={this.state.anchorEl}
                         anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                         targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                         onRequestClose={this.onRequestClose.bind(this)}
                         useLayerForClickAway={true}
                         animation={PopoverAnimationVertical}>
                    <div style={style.popover}>
                        <Subheader>New account</Subheader>
                        <Formsy.Form onValid={this.enableButtons.bind(this)}
                                     onInvalid={this.disableButtons.bind(this)}
                                     onValidSubmit={this.onNewAccount.bind(this)}>
                            <FormsyText required name="Name"
                                        floatingLabelText="Account name"/><br />
                            <FormsySelect required name="AccountTypeID" floatingLabelText="Account type">
                                {types}
                            </FormsySelect><br />
                            <RaisedButton label="Add" disabled={!this.state.accountValid} primary={true} type="submit"/>
                            <RaisedButton style={{marginLeft: '10px'}} label="Cancel" secondary={true}
                                          onTouchTap={this.onRequestClose.bind(this)}/> <br />
                        </Formsy.Form>
                    </div>
                </Popover>
            </muiThemeProvider>
        </div>;
    }
}

AccountView.contextTypes = {
    router: React.PropTypes.object
};

export default AccountView;