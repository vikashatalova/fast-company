import httpServise from "./http.service";

const qualitiesEndPoint = "quality/";

const QualitiesService = {
    get: async () => {
        const { data } = await httpServise.get(qualitiesEndPoint);
        return data;
    }
};

export default QualitiesService;
