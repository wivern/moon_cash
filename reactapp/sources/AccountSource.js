'use strict';

import rest from "rest";
import mime from "rest/interceptor/mime";
import errorCode from "rest/interceptor/errorCode";

const API = "/api/accounts";

const AccountSource = {
    list(){
        return new Promise(function (resolve, reject) {
            const client = rest.wrap(mime).wrap(errorCode);
            client({path: API}).then(response => resolve(response.entity), error => reject(error.entity));
        });
    },
    create(account){
        return new Promise(function(resolve, reject){
            const client = rest.wrap(mime).wrap(errorCode);
            client({path: API, method: 'POST', entity: account, headers: {'Content-Type': 'application/json'}})
                .then(response => resolve(response.entity), error => reject(error.entity));
        });
    },
    update(account){
        return new Promise(function (resolve, reject) {
            const client = rest.wrap(mime).wrap(errorCode);
            client({path: API + '/{id}', params: {'id': account.Id}, method: 'PUT',
                headers: {'Content-Type': 'application/json'}, entity: account})
                .then(response => resolve(response.entity), error => reject(error.entity));
        });
    },
    remove(account){
        return new Promise(function (resolve, reject) {
            const client = rest.wrap(mime).wrap(errorCode);
            client({path: API + '/{id}', params: {'id': account.Id}, method: 'DELETE'})
                .then(response => resolve(response.entity), error => reject(error.entity));
        })
    }
};

export default AccountSource;