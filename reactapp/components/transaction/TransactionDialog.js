'use strict';

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import _ from "underscore";
import {Form} from "formsy-react";
import {FormsyText, FormsyRadioGroup, FormsyRadio, FormsyDate} from "formsy-material-ui";
import View from "react-flexbox-ui";

export default class TransactionDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formValid: false};
    }

    handleClose() {
        if (_.isFunction(this.props.onHandleClose)) {
            this.props.onHandleClose();
        }
    }

    onSubmit(data) {
        console.log('TransactionDialog.onSubmit', data);
        if (_.isFunction(this.props.onSubmit)){
            this.props.onSubmit(data);
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label={this.props.submitLabel || 'Add transaction'}
                primary={true}
                disabled={!this.state.formValid}
                onTouchTap={() => this.formsyForm.submit()}
            />,
        ];
        return <Dialog open={this.props.open}
                       title={this.props.title || 'Transaction'}
                       actions={actions}
                       onRequestClose={this.handleClose.bind(this)}
                       modal={false}>
            <Form ref={(form) => this.formsyForm = form}
                  onValid={() => this.setState({formValid: true})}
                  onInvalid={() => this.setState({formValid: false})}
                  onValidSubmit={this.onSubmit.bind(this)}
            >
                <FormsyRadioGroup defaultSelected="expense" name="type">
                    <FormsyRadio value="expense" label="Expense"/>
                    <FormsyRadio value="income" label="Income"/>
                    <FormsyRadio value="transfer" label="Tramsfer"/>
                    <FormsyRadio value="refund" label="Refund"/>
                </FormsyRadioGroup>
                <View row expand alignStart>
                    <View column>
                        <FormsyText name="description" floatingLabelText="Description"/><br />
                        <FormsyText name="amount" floatingLabelText="Amount"/><br />
                    </View>
                    <View column>
                        <FormsyDate name="date" defaultValue={() => new Date()} floatingLabelText="Date"/>
                    </View>
                </View>
            </Form>
        </Dialog>;
    }
}