import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import Comments from "./Comments";
import { useDispatch } from "react-redux";
import {
  addCommentToPost,
  addPost,
  removeCommentFromPost,
} from "../Redux/Slices/projectSlice";
import { formatDate } from "../service/operations";

const ProjectUpdatesFeed = ({ projectId, updates, isAuthor }) => {
  const [newUpdate, setNewUpdate] = useState("");
  const [expandedComments, setExpandedComments] = useState({});

  const dispatch = useDispatch();

  const handlePostUpdate = () => {
    if (newUpdate.trim()) {
      dispatch(addPost({ projectId, content: newUpdate }));
      setNewUpdate("");
      window.location.reload();
    }
  };

  const handleLike = (updateId) => {
    // Dispatch an action to like the update
    console.log(`Liked update: ${updateId}`);
  };

  const handleToggleComments = (updateId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [updateId]: !prev[updateId],
    }));
  };

  const handleAddComment = (updateId, newComment) => {
    dispatch(addCommentToPost({ postId: updateId, content: newComment }));
    // window.location.reload();
  };

  const handleEditComment = (updateId, commentId, newContent) => {
    // Dispatch an action to edit the comment
    // console.log(
    //   `Edited comment ${commentId} in update ${updateId}: ${newContent}`
    // );
  };

  const handleDeleteComment = (postId, commentId) => {
    // Dispatch an action to delete the comment
    dispatch(removeCommentFromPost({ postId, commentId }));
    // console.log(`Deleted comment ${commentId} from update ${postId}`);
  };

  const handleLikeComment = (updateId, commentId) => {
    // Dispatch an action to like the comment
    // console.log(`Liked comment ${commentId} in update ${updateId}`);
  };

  return (
    <div className="space-y-6">
      {isAuthor && (
        <div className="bg-white shadow rounded-lg p-4">
          <textarea
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            placeholder="Share a project update..."
            className="w-full p-2 border rounded-md"
            rows="3"
          />
          <button
            onClick={handlePostUpdate}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Post Update
          </button>
        </div>
      )}

      {updates &&
        updates.map((update) => (
          <div key={update._id} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center mb-4">
              <img
                src={update.userId?.avatar || "/Male-Avatar.png"}
                alt={update.userName || "User"}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold capitalize">
                  {update.userName || "Anonymous"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {formatDate(update.createdAt, "DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <p className="mb-4">{update.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <button
                onClick={() => handleLike(update._id)}
                className="flex items-center hover:text-blue-500"
              >
                <HandThumbUpIcon className="h-5 w-5 mr-1" />
                <span>{update.likes ? update.likes.length : 0}</span>
              </button>
              <button
                onClick={() => handleToggleComments(update._id)}
                className="flex items-center hover:text-blue-500"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mr-1" />
                <span>{update.comments ? update.comments.length : 0}</span>
              </button>
              <button className="flex items-center hover:text-blue-500">
                <ShareIcon className="h-5 w-5 mr-1" />
                <span>Share</span>
              </button>
            </div>

            {expandedComments[update._id] && (
              <div className="mt-4">
                <Comments
                  comments={update.comments || []}
                  onAddComment={(newComment) =>
                    handleAddComment(update._id, newComment.content)
                  }
                  onEditComment={(commentId, newContent) =>
                    handleEditComment(update._id, commentId, newContent)
                  }
                  onDeleteComment={(commentId) =>
                    handleDeleteComment(update._id, commentId)
                  }
                  onLikeComment={(commentId) =>
                    handleLikeComment(update._id, commentId)
                  }
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ProjectUpdatesFeed;
