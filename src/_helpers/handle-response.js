import { authenticationService } from '../_services/index';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(response.statusCode());
        if (response.status == 400) {
            console.log("Loi");
        }
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        return data;
    });
}