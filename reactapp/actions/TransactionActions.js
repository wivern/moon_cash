'use strict';

import alt from "../alt";
import TransactionSource from "../sources/TransactionSource";

class TransactionActions{
    updateList(transactions){
        return transactions;
    }
    failed(error){
        return error;
    }
    created(result){
        return result;
    }
    list(account){
        return dispatch => {
            dispatch();
            TransactionSource.list(account)
                .then(transactions => this.updateList(transactions), error => this.failed(error));
        };
    }
    create(account, transaction){
        return dispatch => {
            dispatch();
            TransactionSource.create(account, transaction)
                .then(result => this.created(result), error => this.failed(error));
        }
    }
}

export default alt.createActions(TransactionActions);