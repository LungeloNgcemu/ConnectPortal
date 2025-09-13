class StorageService {

    static setItem(key, value) {
        localStorage.setItem(key, value);
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static getToken() {
        return localStorage.getItem("token");
    }

    static getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    static setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    static setToken(token) {
        localStorage.setItem("token", token);
    }

    static getUserDetails() {
        const user = this.getUser();
        return user
            ? {
                userId: user.userId,
                userName: user.userName,
                gender: user.gender,
                church: user.church,
                role: user.role,
                uniqueChurchId: user.uniqueChurchId,
            }
            : null;
    }

}

export default StorageService;
