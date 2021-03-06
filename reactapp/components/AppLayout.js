'use strict';

import React from "react";
import {Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import AccountIcon from "material-ui/svg-icons/action/account-balance-wallet";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import UserActions from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import Avatar from "material-ui/Avatar";
import UserIcon from "material-ui/svg-icons/social/person";
import AuthenticatedContainer from "./AuthenticatedContainer";

class AppLayout extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {open: false};
        this.onUserStoreChanged = this.onUserStoreChanged.bind(this);
    }

    componentDidMount(){
        UserStore.listen(this.onUserStoreChanged);
        UserActions.currentUser();
    }

    componentWillUnmount(){
        UserStore.unlisten(this.onUserStoreChanged);
    }

    onUserStoreChanged(state){
        console.log('AppLayout.onUserStoreChanged', state);
        this.setState(state);
    }

    onMenu() {
        this.setState({open: true});
    }

    onNavigate(path){
        const router = this.context ? this.context.router : null;
        if (router){
            router.push(path);
        }
        this.setState({open: false});
    }

    getChildContext(){
        const user = this.state.user;
        return {
            muiTheme: getMuiTheme(),
            user: user
        }
    }

    renderUser(){
        const user = this.state.user;
        if (user){
            return <ToolbarGroup lastChild={true}>
                <Avatar icon={<UserIcon />} />
                <ToolbarTitle style={{marginLeft: '10px'}} text={user.Login} />
            </ToolbarGroup>;
        }
    }

    render() {
        var childrenWithProps = React.Children.map(this.props.children,
            child => React.cloneElement(child, {}));
        return <div>
            <MuiThemeProvider>
                <Drawer docked={false} open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onTouchTap={this.onNavigate.bind(this, '/')} leftIcon={<DashboardIcon />}>Dashboard</MenuItem>
                    <MenuItem onTouchTap={this.onNavigate.bind(this, '/accounts')} leftIcon={<AccountIcon />}>Accounts</MenuItem>
                </Drawer>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconButton onTouchTap={this.onMenu.bind(this)}><MenuIcon /></IconButton>
                        <ToolbarTitle text="MOON CASH" />
                    </ToolbarGroup>
                    {this.renderUser()}
                </Toolbar>
            </MuiThemeProvider>
            <AuthenticatedContainer>
            {childrenWithProps}
            </AuthenticatedContainer>
        </div>;
    }
}

AppLayout.childContextTypes = {
    muiTheme: React.PropTypes.object,
    history: React.PropTypes.object,
    user: React.PropTypes.object
};

AppLayout.contextTypes = {
    router: React.PropTypes.object,
    muiTheme: React.PropTypes.object
};


export default AppLayout;