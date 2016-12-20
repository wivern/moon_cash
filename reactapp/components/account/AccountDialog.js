'use strict';

import React from "react";
import Dialog from "material-ui/Dialog";
import _ from "underscore";
import FlatButton from "material-ui/FlatButton";
import {Form} from "formsy-react";
import {FormsyText, FormsySelect} from "formsy-material-ui";
import AccountTypeActions from "../../actions/AccountTypeActions";
import AccountTypeStore from "../../stores/AccountTypeStore";
import MenuItem from "material-ui/MenuItem";

export default class AccountDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formValid: false, types: []};
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
        this.setState(state);
    }

    handleClose() {
        if (_.isFunction(this.props.onRequestClose)) {
            this.props.onRequestClose();
        }
    }

    onSubmit(data) {
        if (_.isFunction(this.props.onSubmit)) {
            this.props.onSubmit(data);
        }
    }

    render() {
        const actions = [<FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleClose.bind(this)}/>,
            <FlatButton
                label={this.props.submitLabel || 'Add account'}
                primary={true}
                disabled={!this.state.formValid}
                onTouchTap={() => this.formsyForm.submit()}
            />
        ];
        const types = this.state.types.map(t => <MenuItem key={t.ID} value={t.ID} primaryText={t.Name}/>)
        return <Dialog open={this.props.open}
                       title={this.props.title || 'Account'}
                       onRequestClose={this.handleClose.bind(this)}
                       modal={false}
                       actions={actions}>
            <Form ref={(form) => this.formsyForm = form }
                  onValid={() => this.setState({formValid: true})}
                  onInvalid={() => this.setState({formValid: false})}
                  onValidSubmit={this.onSubmit.bind(this)}>
                <FormsyText required name="Name"
                            floatingLabelText="Account name"/><br />
                <FormsySelect required name="AccountTypeID" floatingLabelText="Account type">
                    {types}
                </FormsySelect><br />
            </Form>
        </Dialog>;
    }
}