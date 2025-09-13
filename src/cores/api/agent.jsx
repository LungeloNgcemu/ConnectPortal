import axios from "axios";

let API_URL = "";

if (window.location.hostname.includes("localhost")) {
    API_URL = "http://localhost:3000";
} else if (window.location.hostname.includes("uat")) {
    API_URL = "http://uat.connect.com";
} else {
    API_URL = "https://connect.com";
}

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const setToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

const auth = {
    login: (data) => api.post("/auth/login", data),
    passwordCheck: (data) => api.post("/api/auth/checkPassword", data),
    sendOtp: (data) => api.post("/api/auth/liveSendUnixOtp", data),
    verifyOtp: (data) => api.post("/api/auth/liveVerifyUnixOtp", data),
};

const connects = {
    getConnects: () => api.get("/api/baseData/getChurches"),
}

const users = {
    getAll: () => api.get("/users"),
    getAllUsers: () => api.get("/api/user/getAllUsers"),
};

const agent = {
    auth,
    users,
    connects,
};

export default agent;
