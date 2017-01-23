'use strict';

import rest from "rest";
import mime from "rest/interceptor/mime";
import errorCode from "rest/interceptor/errorCode";


const API = '/api/accounts/{id}/transactions';

const TransactionSource = {
    list(account){
        return new Promise(function (resolve, reject) {
            const client = rest.wrap(mime).wrap(errorCode);
            client({path: API, params: {'id': account}})
                .then(response => resolve(response.entity), error => reject(error.entity));
        });
    },
    create(account, transaction){
        return new Promise(function (resolve, reject) {
            const client = rest.wrap(mime).wrap(errorCode);
            client({path: API, params: {'id': account}, method: 'POST',
                headers: {'Content-Type': 'application/json'},
                entity: transaction})
                .then(response => resolve(response.entity), error => reject(error.entity));
        });
    }
};

export default TransactionSource;