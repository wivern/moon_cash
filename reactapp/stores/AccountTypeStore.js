'use strict';

import alt from '../alt';
import AccountTypeActions from "../actions/AccountTypeActions";

class AccountTypeStore {
	constructor(){
		this.types = [];
		this.bindActions(AccountTypeActions);
	}
	onFailed(error){
		this.setState({error});
	}
	onUpdateList(types){
		console.log('AccountTypeStore.onUpdateList', types);
		this.setState({types});
	}
}

export default alt.createStore(AccountTypeStore, 'AccountTypeStore');