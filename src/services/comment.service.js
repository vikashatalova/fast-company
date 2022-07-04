import httpServise from "./http.service";

const commentEndPoint = "comment/";

const CommentService = {
    createComment: async (payload) => {
        const { data } = await httpServise.put(commentEndPoint + payload._id, payload);
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpServise.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        console.log(commentId);
        const { data } = await httpServise.delete(commentEndPoint + commentId);
        return data;
    }
};

export default CommentService;
