'use strict';

import alt from "../alt";
import AccountActions from "../actions/AccountActions";

class AccountStore{
    constructor(){
        this.accounts = null;
        this.bindActions(AccountActions);
    }
    onFailed(error){
        this.setState({error});
    }
    onFetchList(accounts){
        console.log('AccountStore.onFetchList', accounts);
        this.setState({accounts});
    }
}

export default alt.createStore(AccountStore, 'AccountStore');