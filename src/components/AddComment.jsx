import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/comment";

export default function AddComment() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const articleId = "last";
    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const fetchComments = async () => {
        if (!articleId) {
            console.warn("No article ID provided");
            return;
        }

        try {
            const { comments } = await appwriteService.getComments(articleId, { limit: 10, offset: 0 });
            setComments(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const submitComment = async () => {
        if (!newComment.trim()) return;
        
        setLoading(true);
        const data = {
            commentBy : '679fa880000084781482', 
            commentBody : "This is a comment Body 2 ",
            article : "last",
            commentedOn: new Date().toISOString()
        };

        try {
            await appwriteService.createComment(data);
            setNewComment("");
            fetchComments(); 
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comments-section">
            <div className="comment-input">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-2 border rounded"
                />
                <button 
                    onClick={submitComment}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {loading ? "Posting..." : "Comment"}
                </button>
            </div>

            <div className="comments-list mt-4">
                {comments.map((comment) => (
                    <div key={comment.$id} className="comment-item p-3 border-b">
                        <div className="comment-header flex items-center gap-2">
                            {comment.user?.profilePicture && (
                                <img 
                                    src={comment.user.profilePicture} 
                                    alt={comment.user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <span className="font-semibold">{comment.user?.name}</span>
                        </div>
                        <p className="comment-body mt-2">{comment.commentBody}</p>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.commentedOn).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}