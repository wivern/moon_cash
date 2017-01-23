'use strict';

import alt from "../alt";
import TransactionActions from "../actions/TransactionActions";

class TransactionStore{
    constructor(){
        this.transactions = null;
        this.bindActions(TransactionActions);
    }
    onFailed(error){
        this.setState({error});
    }
    onUpdateList(transactions){
        console.log('TransactionStore.onUpdateList', transactions);
        this.setState({transactions});
    }
    onCreated(transaction){
        console.log('TransactionStore.onCreated', transaction);
        this.setState({transactions: this.transactions.concat([transaction])});
    }
}

export default alt.createStore(TransactionStore, 'TransactionStore');