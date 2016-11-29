'use strict';

import React from "react";
import AccountList from "../components/AccountList";
import muiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AddIcon from "material-ui/svg-icons/content/add-circle";

export default class AccountView extends React.Component {
    render() {
        return <div>
            <muiThemeProvider>
                <AccountList />
            </muiThemeProvider>
            <RaisedButton label="Add account" primary={true} icon={<AddIcon />} />
        </div>;
    }
}