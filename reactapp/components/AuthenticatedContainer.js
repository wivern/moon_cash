'use strict';

import React from "react";

class AuthenticatedContainer extends React.Component {
    constructor(props){
        super(props);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }
    componentDidMount(){
        const {dispatch, currentURL} = this.props;
        if (!this.isLoggedIn()){
            this.context.router.replace("/login");
        }
    }
    isLoggedIn(){
        const user = this.context.user;
        return user && user.Login;
    }
    render() {
        if (this.isLoggedIn()){
            return this.props.children;
        } else {
            return null;
        }
    }
}

AuthenticatedContainer.contextTypes = {
    router: React.PropTypes.object,
    user: React.PropTypes.object
};

export default AuthenticatedContainer;