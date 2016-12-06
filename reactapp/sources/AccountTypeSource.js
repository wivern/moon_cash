'use strict';

import rest from "rest";
import mime from "rest/interceptor/mime";
import errorCode from "rest/interceptor/errorCode";

const API = "/api/account_type";

const AccountTypeSource = {
	fetch(){
		return new Promise((resolve, reject) => {
			const client = rest.wrap(mime).wrap(errorCode);
			client({path: API}).then(response => resolve(response.entity), error => reject(error.entity));
		});
	}
};

export default AccountTypeSource;