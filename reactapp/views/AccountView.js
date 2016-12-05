'use strict';

import React from "react";
import AccountList from "../components/AccountList";
import muiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AddIcon from "material-ui/svg-icons/content/add-circle";
import {Popover, PopoverAnimationVertical} from "material-ui/Popover";
import Formsy from "formsy-react";
import {FormsyText} from "formsy-material-ui/lib";
import Subheader from "material-ui/Subheader";

const style = {
    popover: {
        padding: '20px'
    }
};

export default class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newAccount: false};
    }

    onNewAccountRequest(event) {
        this.setState({newAccount: true, targetEl: event.target})
    }

    onNewAccount() {

    }

    onRequestClose(event) {
        this.setState({newAccount: false});
    }

    render() {
        return <div className="view">
            <muiThemeProvider>
                <AccountList />
            </muiThemeProvider>
            <RaisedButton label="Add account" primary={true} icon={<AddIcon />}
                          onTouchTap={this.onNewAccountRequest.bind(this)}/>
            <Popover open={this.state.newAccount}
                     anchorEl={this.state.anchorEl}
                     anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                     targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                     onRequestClose={this.onRequestClose.bind(this)}
                     useLayerForClickAway={true}
                     animation={PopoverAnimationVertical}>
                <div style={style.popover}>
                    <Subheader>New account</Subheader>
                    <Formsy.Form>
                        <FormsyText name="name" required validations="isWords" floatingLabelText="Account name"/><br />
                        <RaisedButton label="Add" primary={true} onTouchTap={this.onNewAccount.bind(this)}/>
                        <RaisedButton style={{marginLeft: '10px'}} label="Cancel" secondary={true}
                                      onTouchTap={this.onRequestClose.bind(this)}/> <br />
                    </Formsy.Form>
                </div>
            </Popover>
        </div>;
    }
}