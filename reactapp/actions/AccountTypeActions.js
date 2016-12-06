'use strict';

import alt from "../alt";
import AccountTypeSource from "../sources/AccountTypeSource";

class AccountTypeActions{
	updateList(types){
		return types;
	}
	failed(error){
		return error;
	}
	fetch(){
		return dispatch => {
			dispatch();
			AccountTypeSource.fetch().then(types => this.updateList(types), error => this.failed(error));
		}
	}
}

export default alt.createActions(AccountTypeActions);