import createRestApi from "./createRestApi";

const api = createRestApi("/usermanagement");

const userManagementService = {
    getAllUsers: (adminId) => api.get("getAllUsers?adminId=" + adminId, true),
    getAllUsage: (adminId) => api.get("getAllUsages?adminId=" + adminId, true),
    updateRole: (data) => api.put("updateRole", true, data),
    deleteUser: (data) => api.delete("deleteUser", true, data),
    getUserById: (userId) => api.get("getUserInfoById?userId=" + userId, true),
};

export default userManagementService;
