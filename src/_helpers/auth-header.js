import { authenticationService } from '../_services/index';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser) {
        return {
            "Content-Type" : "application/json", 
            JWT: currentUser.jwt };
    } else {
        return {};
    }
}