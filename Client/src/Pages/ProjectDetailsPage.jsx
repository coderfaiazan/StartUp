import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  CameraIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { DonationModal, ProjectUpdatesFeed } from "../Components";
import ErrorPage from "./ErrorPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectByTitle,
  addReward,
  updateProject,
} from "../Redux/Slices/projectSlice";
import {
  calculateDaysToGo,
  checkAuthor,
  formatDate,
} from "../service/operations";

function ProjectDetailsPage() {
  const dispatch = useDispatch();
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationConfirmation, setDonationConfirmation] = useState(null);
  const [isEditingCoverImage, setIsEditingCoverImage] = useState(false);
  const [isEditingRewards, setIsEditingRewards] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [NewImage, setNewImage] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [newReward, setNewReward] = useState({
    projectId: "",
    title: "",
    minContribution: "",
    description: "",
    available: "10",
    estimatedDate: "",
  });

  const project = useSelector((state) => state.project.project);
  const isLoading = useSelector((state) => state.project.isLoading);
  const isError = useSelector((state) => state.project.isError);
  const errorMessage = useSelector((state) => state.project.errorMessage);

  useEffect(() => {
    const title = getTitleFromURL();
    if (title) {
      dispatch(fetchProjectByTitle(title));
    }
  }, [dispatch]);

  useEffect(() => {
    if (project.creatorId) {
      setIsAuthor(checkAuthor(project));
      setEditedProject(project);
    }
  }, [project]);

  function getTitleFromURL() {
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    return parts[parts.length - 1];
  }

  const handleDonation = (donationData) => {
    console.log("Donation data:", donationData);
    setShowDonationModal(false);
    setDonationConfirmation({
      success: donationData.success,
      amount: donationData.amount,
      rewardTitle:
        project.rewards.find((r) => r._id === donationData.rewardId)?.title ||
        "No reward selected",
    });
    setTimeout(() => {
      setDonationConfirmation(false);
    }, 5000);
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewImage(reader.result);
        setEditedProject((prev) => ({
          ...prev,
          mediaurls: file,
        }));
        setIsEditingCoverImage(false);
      };
    }
  };

  const handleEditReward = (id, field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      rewards: prev.rewards.map((reward) =>
        reward._id === id ? { ...reward, [field]: value } : reward
      ),
    }));
  };

  const handleAddReward = () => {
    if (newReward.title && newReward.minContribution && newReward.description) {
      dispatch(addReward({ ...newReward, projectId: project._id }));
      setNewReward({
        projectId: "",
        title: "",
        minContribution: "",
        description: "",
        available: "10",
        estimatedDate: "",
      });
    }
  };

  const handleRemoveReward = (id) => {
    setEditedProject((prev) => ({
      ...prev,
      rewards: prev.rewards.filter((reward) => reward._id !== id),
    }));
  };

  const handleEditDetails = (field, value) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    const response = await dispatch(
      updateProject({ id: project._id, ...editedProject })
    );
    if (response) {
      const title = editedProject.title.replaceAll(" ", "-");
      dispatch(fetchProjectByTitle(title));
      window.location.reload();
      console.log(response);
    }
    setIsEditingDetails(false);
    setIsEditingRewards(false);
  };

  if (isLoading) {
    return <ErrorPage loading errorMessage={"Loading..."} />;
  }

  if (isError) {
    return <ErrorPage errorMessage={errorMessage} />;
  }

  if (!project) {
    return <ErrorPage errorMessage={"Project Not Found!"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {donationConfirmation && (
        <div
          className={`${
            donationConfirmation.success
              ? "bg-green-100 border-l-4 border-green-500 text-green-700"
              : "bg-red-100 border-l-4 border-red-500 text-red-700"
          } p-4 mb-4`}
          role="alert"
        >
          {donationConfirmation.success ? (
            <>
              <p className="font-bold">Thank you for your support!</p>
              <p>
                You have donated ₹{donationConfirmation.amount} to this project.
              </p>
              <p>Selected reward: {donationConfirmation.rewardTitle}</p>
            </>
          ) : (
            <p className="font-bold">Transaction Failed!</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {isAuthor && isEditingCoverImage ? (
            <div className="w-full h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <label htmlFor="coverImage" className="cursor-pointer w-full h-[400px] flex justify-center flex-col items-center">
                <CameraIcon className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload new cover image
                </p>
                <input
                  id="coverImage"
                  type="file"
                  className="hidden"
                  onChange={handleCoverImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
          ) : (
            <img
              src={
                NewImage ||
                project.mediaurls?.secure_url ||
                "/placeholder.jpg"
              }
              alt={project.title}
              className="w-full h-[400px] object-fill rounded-lg shadow-lg"
            />
          )}
          {isAuthor && isEditingDetails && (
            <button
              onClick={() => setIsEditingCoverImage(!isEditingCoverImage)}
              className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <CameraIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <div>
          {isEditingDetails ? (
            <input
              type="text"
              value={editedProject.title}
              onChange={(e) => handleEditDetails("title", e.target.value)}
              className="text-3xl font-bold mb-4 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          )}
          <p className="text-gray-600 mb-4 capitalize">
            by {project.creatorId?.name || "Anonymous"}
          </p>
          {isEditingDetails ? (
            <textarea
              value={editedProject.description}
              onChange={(e) => handleEditDetails("description", e.target.value)}
              className="mb-6 w-full h-32 p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="mb-6">{project.description}</p>
          )}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">₹{project.amountRaised}</span>
              <span className="text-gray-600">
                pledged of ₹{project.fundingGoal} goal
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (project.amountRaised / project.fundingGoal) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{project.backers} backers</span>
              <span>
                {calculateDaysToGo(project.createdAt, project.deadline)} days to
                go
              </span>
            </div>
          </div>
          {isAuthor ? (
            isEditingDetails ? (
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            ) : (
              <div>
                <button
                  className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300"
                  onClick={() => setIsEditingDetails(true)}
                >
                  Edit Project Details
                </button>
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300"
                  onClick={() => setShowDonationModal(true)}
                >
                  Back This Project
                </button>
              </div>
            )
          ) : (
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300"
              onClick={() => setShowDonationModal(true)}
            >
              Back This Project
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        {isAuthor && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Rewards</h2>
            <button
              onClick={() => setIsEditingRewards(!isEditingRewards)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {isEditingRewards ? "Finish Editing" : "Edit Rewards"}
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editedProject?.rewards &&
            editedProject.rewards.map((reward) => (
              <div key={reward._id} className="border rounded-lg p-4 shadow-sm">
                {isEditingRewards ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={reward.title}
                      onChange={(e) =>
                        handleEditReward(reward._id, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded text-lg font-semibold"
                    />
                    <input
                      type="number"
                      value={reward.minContribution}
                      onChange={(e) =>
                        handleEditReward(
                          reward._id,
                          "minContribution",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      value={reward.estimatedDate}
                      onChange={(e) =>
                        handleEditReward(
                          reward._id,
                          "estimatedDate",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <textarea
                      value={reward.description}
                      onChange={(e) =>
                        handleEditReward(
                          reward._id,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    ></textarea>
                    <button
                      onClick={() => handleRemoveReward(reward._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                      Remove Reward
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2 capitalize">
                      {reward.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Pledge ₹{reward.minContribution} or more
                    </p>
                    <p className="mb-4">{reward.description}</p>
                    <p className="mb-4 text-sm text-gray-500">
                      Estimated Date:{" "}
                      {formatDate(reward.estimatedDate, "DD-MM-YYYY")}
                    </p>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => {
                        setShowDonationModal(true);
                      }}
                    >
                      Select This Reward
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
        {isEditingRewards && (
          <div className="mt-6 border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Add New Reward</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={newReward.title}
                onChange={(e) =>
                  setNewReward({ ...newReward, title: e.target.value })
                }
                placeholder="Reward Title"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={newReward.minContribution}
                onChange={(e) =>
                  setNewReward({
                    ...newReward,
                    minContribution: e.target.value,
                  })
                }
                placeholder="Minimum Pledge"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="date"
                value={newReward.estimatedDate}
                onChange={(e) =>
                  setNewReward({
                    ...newReward,
                    estimatedDate: e.target.value,
                  })
                }
                placeholder="Estimated Date"
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                value={newReward.description}
                onChange={(e) =>
                  setNewReward({
                    ...newReward,
                    description: e.target.value,
                  })
                }
                placeholder="Reward Description"
                className="w-full px-3 py-2 border rounded"
                rows="3"
              ></textarea>
              <button
                onClick={handleAddReward}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Add Reward
              </button>
            </div>
          </div>
        )}
      </div>

      {showDonationModal && (
        <DonationModal
          project={project}
          onClose={() => setShowDonationModal(false)}
          onDonate={handleDonation}
        />
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Project Updates</h2>
        <ProjectUpdatesFeed
          isAuthor={isAuthor}
          projectId={project._id}
          updates={project.posts}
        />
      </div>

      <div className="mt-12">
        <Link to="/transactions" className="text-blue-600 hover:text-blue-800">
          View Your Transaction History
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
