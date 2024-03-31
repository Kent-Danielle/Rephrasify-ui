import createRestApi from "./createRestApi";

const api = createRestApi("/usermanagement");

const userManagementService = {
    getAllUsers: () => api.get("getAllUsers", true),
    getAllUsage: () => api.get("getAllUsages", true),
    updateRole: (data) => api.put("updateRole", true, data),
    deleteUser: (data) => api.delete("deleteUser", true, data),
};

export default userManagementService;
