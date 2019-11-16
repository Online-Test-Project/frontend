import { BehaviorSubject } from 'rxjs';

import config from '../_config/config';
// import { handleResponse } from '../_helpers/index';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.SERVER_URL}/api/users/Login`, requestOptions)
        .then(response => response.json())
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                console.log(user);
                return user;
            } else if(user.Message) {
                console.log(user);
            }
            
        })
}

function register(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.SERVER_URL}/api/users/register`, requestOptions)
        .then(response => response.json())
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                console.log(user);
                return user;
            } else if(user.Message) {
                console.log(user);
            }  
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
