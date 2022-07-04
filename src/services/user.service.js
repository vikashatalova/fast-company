import httpServise from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServise.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServise.put(userEndPoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpServise.get(
            userEndPoint + localStorageService.getUserId()
        );
        return data;
    },
    updateUser: async (payload) => {
        const { data } = await httpServise.patch(userEndPoint + localStorageService.getUserId(), payload);
        return data;
    }
};

export default userService;
