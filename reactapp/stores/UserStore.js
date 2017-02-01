'use strict';

import alt from "../alt";
import UserActions from "../actions/UserActions";

class UserStore{
    constructor(){
        this.user = null;
        this.bindActions(UserActions);
    }
    onUpdate(user){
        this.setState({user});
    }
    onFailed(error){
        this.setState({error});
    }
}

export default alt.createStore(UserStore, 'UserStore');