import createRestApi from "./createRestApi";

const api = createRestApi("/users");

const usersService = {
    getSecurityQuestions: () => api.get("getSecurityQuestions"),
    registerUser: (data) => api.post("register", true, data),
    loginUser: (data) => api.post("login", true, data),
    logoutUser: () => api.get("logout", true),
    getUserSecurityQuestion: (data) => api.get("getUserSecurityQuestion?email=" + encodeURIComponent(data.email)),
    answerSecurityQuestion: (data) => api.post("answerSecurityQuestion", false, data),
    changePassword: (data) => api.put("changePassword", false, data),
};

export default usersService;
