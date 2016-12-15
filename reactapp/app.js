'use strict';

import AppLayout from "./components/AppLayout";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import IndexView from "./views/IndexView";
import AccountsView from "./views/AccountView";
import AccountDetailsView from "./views/AccountDetailsView";
import "./css/main.scss";

injectTapEventPlugin();

class App extends React.Component{
    render(){
        return <Router history={browserHistory}>
            <Route path="/" component={AppLayout}>
                <IndexRoute component={IndexView} />
                <Route path="/accounts" component={AccountsView}>
                    <Route path=":id" component={AccountDetailsView} />
                </Route>
            </Route>
        </Router>;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
