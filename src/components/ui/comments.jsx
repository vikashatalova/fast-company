import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commentsApi from "../../api/fake.api/comments.api";
import { orderBy } from "lodash";
import AddCommentsForm from "../common/comments/addCommetsForm";
import CommentsList from "../common/comments/commentList";

const Comments = () => {
    const userId = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        commentsApi
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        commentsApi
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        commentsApi.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
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
