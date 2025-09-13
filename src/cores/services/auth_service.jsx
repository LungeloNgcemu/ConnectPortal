
import NavigationService from "./navigation_service";
import StorageService from "./storage_service";

class AuthService {

    static isLoggedIn(navigate) {
        const token = StorageService.getToken();
        const user = StorageService.getUser();
        const pathname = window.location.pathname;
        if (token && user) {
            console.log("token", token);
            console.log("user", user);
            if (pathname === "/") {
                NavigationService.navigate(navigate, "/main");
            }
        } else {
            NavigationService.navigate(navigate, "/");
        }

    }

    static logout(navigate) {
        StorageService.clear();
        NavigationService.navigate(navigate, "/");
    }
}

export default AuthService;