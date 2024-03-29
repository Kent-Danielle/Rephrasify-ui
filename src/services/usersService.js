import createRestApi from "./createRestApi";

const api = createRestApi("/users");

const usersService = {
    getSecurityQuestions: () => api.get("getSecurityQuestions"),
    registerUser: (data) => api.post("register", false, data),
    loginUser: (data) => api.post("login", false, data),
    getUserSecurityQuestion: (data) => api.get("getUserSecurityQuestion?email=" + data.email),
    answerSecurityQuestion: (data) => api.post("answerSecurityQuestion", false, data),
    changePassword: (data) => api.post("changePassword", false, data),
};

export default usersService;
