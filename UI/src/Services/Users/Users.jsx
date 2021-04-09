import Interceptors from './../Interceptors/Interceptors';

class Users {
    constructor() {
        this.interceptors = new Interceptors();
    }

    async login(data) {
        return this.interceptors.POST('users/login', data);
    }

    async register(data) {
        return this.interceptors.POST('users/register', data);
    }
}

export default Users;