'use strict';

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import _ from "underscore";

export default class TransactionDialog extends React.Component {
    handleClose(){
        if (_.isFunction(this.props.onHandleClose)){
            this.props.onHandleClose();
        }
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label={this.props.submitLabel || 'Add transaction'}
                primary={true}
                disabled={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        return <Dialog open={this.props.open}
                       title={this.props.title || 'Transaction'}
                       actions={actions}
                       onRequestClose={this.handleClose.bind(this)}
                       modal={false}>
        </Dialog>;
    }
}