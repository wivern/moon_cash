'use strict';

import alt from "../alt";
import AccountSource from "../sources/AccountSource";

class AccountActions{
    fetchList(accounts){
        return accounts;
    }
    failed(error){
        return error;
    }
    accountCreated(account){
        return account;
    }
    accountUpdated(account){
        return account;
    }
    accountDeleted(account){
        return account;
    }
    list(){
        return dispatch => {
            dispatch();
            AccountSource.list().then(accounts => this.fetchList(accounts), error => this.failed(error));
        }
    }
    create(account){
        return dispatch => {
            dispatch();
            AccountSource.create(account).then(account => this.accountCreated(account), error => this.failed(error));
        }

    }
    update(account){
        return dispatch => {
            dispatch();
            AccountSource.update(account).then(account => this.accountUpdated(account), error => this.failed(error));
        }
    }
    remove(account){
        return dispatch => {
            dispatch();
            AccountSource.remove(account).then(account => this.accountDeleted(account), error => this.failed(error));
        }
    }
}

export default alt.createActions(AccountActions);