import httpServise from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServise.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServise.put(userEndPoint + payload._id, payload);
        return data;
    }
};

export default userService;
