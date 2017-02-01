'use strict';

import alt from "../alt";
import UserSource from "../sources/UserSource";

class UserActions{
    update(user){
        return user;
    }
    failed(error){
        return error;
    }
    currentUser(){
        return dispatch => {
            dispatch();
            UserSource.currentUser().then(user => this.update(user), error => this.failed(error));
        }
    }
}

export default alt.createActions(UserActions);