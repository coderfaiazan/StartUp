import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, CheckIcon, CameraIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../Redux/Slices/userSlice";
import { formatDate } from "../service/operations";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [projectsCount, setProjectsCount] = useState(0);
  const [avatarFile, setAvatarFile] = useState(null);

  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setEditedUser({
        ...userData,
        avatar: userData.avatar.secure_url || "/Male-Avatar.png",
        profile: {
          bio: userData.profile?.bio || "",
          location: userData.profile?.location || "",
          website: userData.profile?.website || "",
        },
      });
      if (userData.projects) setProjectsCount(userData.projects.length);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      profile: { ...prev.profile, [name]: value },
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = () => {
  //   if (editedUser) {
  //     dispatch(editUser(editedUser));
  //     window.location.reload();
  //     setIsEditing(false);
  //     // reload page
  //   }
  // };

  const handleSave = async () => {
    if (editedUser) {
      // Here you would typically upload the avatar file to your server
      // and get back a URL to store in the user's profile
      // For this example, we'll just pretend we have a URL
      const avatarUrl = avatarFile ? avatarFile : editedUser.avatar;

      const updatedUser = {
        ...editedUser,
        avatar: avatarUrl,
        profile: {
          ...editedUser.profile,
        },
      };
      console.log(updatedUser);
      const reponse = await dispatch(editUser(updatedUser));
      if (reponse) {
        window.location.reload();
      }
      setIsEditing(false);
      setAvatarFile(null);
    }
  };

  if (!editedUser) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="bg-white shadow-md rounded-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 rounded-full relative">
            <img
              className="h-48 w-full rounded-full object-cover md:w-48"
              src={editedUser.avatar}
              alt={editedUser.name}
            />
            {isEditing && (
              <div className="absolute inset-0 h-48 flex md:w-48 rounded-full items-center justify-center bg-black bg-opacity-50">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <CameraIcon className="h-12 w-12 rounded-full text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="p-8 w-full">
            <div className="flex justify-between items-start mb-6">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  className="text-2xl font-bold mb-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none capitalize"
                />
              ) : (
                <h2 className="text-2xl font-bold mb-2 capitalize">
                  {editedUser.name}
                </h2>
              )}
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                >
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Email:</strong>{" "}
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="ml-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  />
                ) : (
                  editedUser.email
                )}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Location:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editedUser.profile.location}
                    onChange={handleInputChange}
                    className="ml-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  />
                ) : (
                  editedUser.profile.location
                )}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Member since:</strong>{" "}
                {formatDate(userData.createdAt, "DD-MM-YYYY")}
              </p>
            </div>
            <div>
              <strong>Bio:</strong>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUser.profile.bio}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-blue-500 outline-none"
                  rows="4"
                />
              ) : (
                <p className="text-gray-600 mt-2">
                  {editedUser.profile.bio || ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Backed Projects</h3>
          {userData.backedProjects.length == 0 ? (
            <p className="text-gray-600">
              You haven't backed any projects yet.
            </p>
          ) : (
            <>
              <p className="mb-3 text-gray-500">
                Number Projects: {userData.backedProjects.length}
              </p>
              {userData.backedProjects.map((project) => {
                <div key={project._id} className="mb-4 p-4 border rounded">
                  <h4 className="font-semibold">{project.title}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Pledged: ${project.pledgeAmount}</span>
                    <span>Status: {project.status}</span>
                  </div>
                  <div className="mt-2">
                    <Link
                      to={`/project/${project.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Project
                    </Link>
                  </div>
                </div>;
              })}
            </>
          )}
          <Link
            to="/explore"
            className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
          >
            Explore Projects
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Created Projects</h3>
          <p className="mb-3 text-gray-500">Number Projects: {projectsCount}</p>
          {userData.projects && userData.projects.length > 0 ? (
            userData.projects.map((project) => (
              <div key={project._id} className="mb-4 p-4 border rounded">
                <Link
                  to={`/project/${project.title?.replaceAll(" ", "-")}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              You haven't created any projects yet.
            </p>
          )}
          <Link
            to="/start-project"
            className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 mt-4"
          >
            Start a New Project
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/transactions" className="text-blue-500 hover:text-blue-600">
          View Your Transaction History
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
