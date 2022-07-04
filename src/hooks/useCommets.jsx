import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import CommentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getComments();
    }, [userId]);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher (error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getComments () {
        try {
            const { content } = await CommentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function createComment (data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        console.log(userId);
        try {
            const { content } = await CommentService.createComment(comment);
            console.log(content);
            setComments((prevSrtate) => [...prevSrtate, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function removeComment (id) {
        console.log(id);
        try {
            const { content } = await CommentService.removeComment(id);
            if (content === null) {
                setComments((prevState) => prevState.filter((c) => c._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <CommentsContext.Provider value={{ comments, createComment, isLoading, removeComment }}>
            { children }
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
