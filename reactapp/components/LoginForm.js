'use strict';

import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: null, password: null};
    }

    render() {
        return <div>
            <h1>Moon Cash Login</h1>
            <MuiThemeProvider>
                <div>
                    <TextField floatingLabelText="Login or email"/><br />
                    <TextField floatingLabelText="Password" type="password"/><br />
                    <RaisedButton label="Sign in"/>
                </div>
            </MuiThemeProvider>
        </div>;
    }
}