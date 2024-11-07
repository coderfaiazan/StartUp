import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
  HandThumbUpIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import { formatDate } from "../service/operations";

const Comments = ({
  comments: initialComments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment.trim(),
        createdAt: new Date(),
        likes: 0,
        creator: {
          name: "Current User",
          avatar: "/Male-Avatar.png",
        },
      };
      setComments([...comments, comment]);
      setNewComment("");
      onAddComment(comment);
    }
  };

  const handleStartEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = (id) => {
    if (editContent.trim() !== "") {
      setComments(
        comments.map((comment) =>
          comment.id === id
            ? { ...comment, content: editContent.trim() }
            : comment
        )
      );
      setEditingComment(null);
      onEditComment(id, editContent.trim());
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    onDeleteComment(id);
  };

  const handleLikeComment = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
    onLikeComment(id);
  };

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div
          key={comment._id || index}
          className="flex items-start space-x-3 text-sm"
        >
          <img
            src={comment.creator?.avatar || "/Male-Avatar.png"}
            alt={comment.userName || "Anonymous"}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 bg-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold capitalize">
                {comment.userName || "Anonymous"}
              </p>
              {editingComment !== comment._id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStartEdit(comment)}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            {editingComment === comment._id ? (
              <div>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm mb-2"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleSaveEdit(comment._id)}
                    className="bg-green-500 text-white rounded-full p-1 hover:bg-green-600 transition duration-300"
                  >
                    <CheckIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <p>{comment.content}</p>
            )}
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <p>{formatDate(comment.createdAt, "DD-MM-YYYY")}</p>
              <button
                onClick={() => handleLikeComment(comment._id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
              >
                <HandThumbUpIcon className="h-4 w-4" />
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-full px-4 py-2 text-sm"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-300"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Comments;
