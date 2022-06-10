import httpServise from "./http.service";

const professionEndPoint = "profession/";

const professionService = {
    get: async () => {
        const { data } = await httpServise.get(professionEndPoint);
        return data;
    }
};

export default professionService;
