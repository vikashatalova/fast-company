import React from "react";
import { orderBy } from "lodash";
import AddCommentsForm from "../common/comments/addCommetsForm";
import CommentsList from "../common/comments/commentList";
import { useComments } from "../../hooks/useCommets";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();
    const handleSubmit = (data) => {
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
        // commentsApi.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
    };
    const sortedComments = orderBy(comments, ["created_ad"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentsForm onSubmit={handleSubmit}/>
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList comments={sortedComments} onRemove={handleRemoveComment}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
