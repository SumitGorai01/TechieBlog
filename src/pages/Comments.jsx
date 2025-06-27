import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Send, Edit2, Trash2, X, Check } from "lucide-react";
import Swal from 'sweetalert2';

import commentService from "../appwrite/comment";

export default function Comments({ post, userData }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsPage, setCommentsPage] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [triggerFetching, setTriggerFetching] = useState(false);
  
  // New states for CRUD operations
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  
  const COMMENTS_PER_PAGE = 10;

  const fetchComments = async () => {
    if (!post?.$id) return;

    try {
      setIsLoadingComments(true);
      const result = await commentService.getComments(post.$id, {
        limit: COMMENTS_PER_PAGE,
        offset: commentsPage * COMMENTS_PER_PAGE
      });

      setComments(prev =>
        commentsPage === 0 ? result.comments : [...prev, ...result.comments]
      );
      setHasMoreComments(result.total > (commentsPage + 1) * COMMENTS_PER_PAGE);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setIsLoadingComments(false);
      setTriggerFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post?.$id, commentsPage, triggerFetching]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userData) {
      Swal.fire('Error', 'You need to be logged in to comment', 'error');
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        commentBody: newComment.trim(),
        article: post.$id,
        commentBy: userData.$id,
        commentedOn: new Date().toISOString()
      };

      await commentService.createComment(commentData);
      setNewComment("");
      
      // Reset to first page and fetch comments again
      setCommentsPage(0);
      setTriggerFetching(true);
      Swal.fire({
        title: 'Success!',
        text: 'Comment posted successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire('Error', 'Failed to post comment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit Comment
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.$id);
    setEditingCommentText(comment.commentBody);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingCommentText.trim()) return;

    setIsUpdating(true);
    try {
      await commentService.updateComment(commentId, {
        commentBody: editingCommentText.trim()
      });

      // Update the comment in the local state
      setComments(prev => 
        prev.map(comment => 
          comment.$id === commentId 
            ? { ...comment, commentBody: editingCommentText.trim() }
            : comment
        )
      );

      setEditingCommentId(null);
      setEditingCommentText("");
      
      Swal.fire({
        title: 'Success!',
        text: 'Comment updated successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire('Error', 'Failed to update comment', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Delete Comment
  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      setIsDeleting(commentId);
      try {
        await commentService.deleteComment(commentId, post.$id);
        
        // Remove the comment from local state
        setComments(prev => prev.filter(comment => comment.$id !== commentId));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Comment has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire('Error', 'Failed to delete comment', 'error');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const loadMoreComments = () => {
    setCommentsPage(prev => prev + 1);
  };

  return (
    <section className="max-w-4xl mx-auto mt-8 px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Comments
      </h2>

      {userData ? (
        <form onSubmit={handleCommentSubmit} className="mb-8 transform transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                  {userData.name[0].toUpperCase()}
                </div>
              </div>
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                    focus:ring-1 focus:ring-orange-500 focus:border-transparent
                    placeholder-gray-500 dark:placeholder-gray-400
                    transition-all duration-300 ease-in-out
                    min-h-[60px] sm:min-h-[80px] max-h-[160px] resize-y text-sm sm:text-base"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 sm:gap-3 ml-10 sm:ml-14">
              <button
                type="button"
                onClick={() => setNewComment('')}
                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                  text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                  transform transition-all duration-200
                  ${isSubmitting || !newComment.trim()
                    ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60'
                    : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white'
                  }`}
              >
                {isSubmitting ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  'Comment'
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Please{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 
                font-medium hover:underline transition-colors duration-200"
            >
              login
            </Link>{" "}
            to join the discussion
          </p>
        </div>
      )}

      <div className="space-y-4 sm:space-y-6">
        {comments.length > 0 && (
          <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </div>
        )}
        
        {comments.map((comment) => (
          <div
            key={comment.$id}
            className="flex gap-2 sm:gap-4 group transition-colors"
          >
            <div className="flex-shrink-0">
              {comment.user?.profilePicture ? (
                <img
                  src={comment.user.profilePicture}
                  alt={comment.user.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                  {comment.user?.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    {comment.user?.name || 'Unknown User'}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.$createdAt), { addSuffix: true })}
                  </span>
                </div>
                
                {/* Action buttons - only show for comment owner */}
                {userData && comment.commentBy === userData.$id && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditComment(comment)}
                      disabled={editingCommentId !== null}
                      className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
                      title="Edit comment"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.$id)}
                      disabled={isDeleting === comment.$id}
                      className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Delete comment"
                    >
                      {isDeleting === comment.$id ? (
                        <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Comment content - either text or edit form */}
              {editingCommentId === comment.$id ? (
                <div className="mt-2">
                  <textarea
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                      focus:ring-1 focus:ring-orange-500 focus:border-transparent
                      text-sm sm:text-base min-h-[60px] resize-y"
                    rows="2"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateComment(comment.$id)}
                      disabled={isUpdating || !editingCommentText.trim()}
                      className="px-3 py-1.5 text-xs font-medium bg-orange-500 hover:bg-orange-600 
                        text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center gap-1"
                    >
                      {isUpdating ? (
                        <div className="w-3 h-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Check size={12} />
                      )}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base text-left leading-relaxed">
                  {comment.commentBody}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {isLoadingComments && commentsPage === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            </div>
          ))
        ) : hasMoreComments ? (
          <button
            onClick={loadMoreComments}
            disabled={isLoadingComments}
            className="w-full py-3 text-center text-orange-500 hover:text-orange-600 
              dark:text-orange-400 dark:hover:text-orange-300 font-medium
              disabled:opacity-50 transition-colors duration-200"
          >
            {isLoadingComments ? 'Loading...' : 'Show more comments'}
          </button>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No more comments.
          </div>
        )}
      </div>
    </section>
  );
}