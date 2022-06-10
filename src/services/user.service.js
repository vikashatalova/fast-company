import httpServise from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServise.get(userEndPoint);
        return data;
    }
};

export default userService;
