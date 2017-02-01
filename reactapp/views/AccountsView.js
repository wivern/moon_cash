'use strict';

import React from "react";

const styles = {
    view: {margin: '10px'}
};

class AccountsView extends React.Component{
    render(){
        return <div style={styles.view} className="fullheight">{this.props.children}</div>;
    }
}

AccountsView.contextTypes = {
    user: React.PropTypes.object
};

export default AccountsView;