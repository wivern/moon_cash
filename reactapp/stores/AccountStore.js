'use strict';

import alt from "../alt";
import AccountActions from "../actions/AccountActions";
import _ from "underscore";

class AccountStore{
    constructor(){
        this.accounts = null;
        this.bindActions(AccountActions);
        this.exportPublicMethods({
            getAccount: this.getAccount.bind(this)
        })
    }
    onFailed(error){
        this.setState({error});
    }
    onFetchList(accounts){
        console.log('AccountStore.onFetchList', accounts);
        this.setState({accounts});
    }
    onAccountCreated(account){
        console.log('AccountStore.onAccountCreated', account);
        this.setState({accounts: this.accounts.concat([account])});
    }
    onAccountDeleted(account){
        console.log('AccountStore.onAccountDeleted', account);
        this.setState({accounts: this.accounts.filter(a => a.ID !== account.ID)});
    }
    onAccountUpdated(account){
        console.log('AccountStore.onAccountUpdated', account);
        this.setState({accounts: this.accounts.filter(a => a.ID !== account.ID).concat([account])});
    }
    getAccount(id){
        id = parseInt(id, 10);
        return _.find(this.accounts, a => a.ID === id);
    }
}

export default alt.createStore(AccountStore, 'AccountStore');