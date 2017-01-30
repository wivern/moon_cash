'use strict';

import AppLayout from "./components/AppLayout";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import IndexView from "./views/IndexView";
import AccountsView from "./views/AccountsView";
import AccountView from "./views/AccountView";
import AccountDetailsView from "./views/AccountDetailsView";
import "./css/main.scss";
import "ag-grid-root/dist/styles/ag-grid.css";
import "ag-grid-root/dist/styles/theme-material.css";
import {IntlProvider} from "react-intl";

injectTapEventPlugin();

class IntlApp extends React.Component{
    render(){
        return <IntlProvider locale="en"><AppLayout/></IntlProvider>;
    }
}

class IntlDetailsView extends React.Component{
    render(){
        const view = React.createElement(AccountDetailsView, this.props);
        return <IntlProvider locale="en">
            {view}
        </IntlProvider>;
    }
}

class App extends React.Component{
    render(){
        return <Router history={browserHistory}>
            <Route path="/" component={AppLayout}>
                <IndexRoute component={IndexView} />
                <Route path="/accounts" component={AccountsView}>
                    <IndexRoute component={AccountView} />
                    <Route path=":id" component={IntlDetailsView} />
                </Route>
            </Route>
        </Router>;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
