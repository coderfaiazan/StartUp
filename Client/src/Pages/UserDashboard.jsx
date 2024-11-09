import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { calculateDaysToGo } from "../service/operations";

function UserDashboard() {
  // Mock user data
  // const user = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   avatar: "/Male-Avatar.png",
  // };

  const user = useSelector((state) => state.user.user);

  return (
    <>
      {user && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <img
                  src={user?.avatar.secure_url || "/Male-Avatar.png"}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-center mb-2 capitalize">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-center mb-4">{user.email}</p>
                <Link
                  to="/profile"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Your Projects</h3>
                {user.projects.length > 0 ? (
                  user.projects.map((project) => (
                    <div key={project._id} className="mb-4 p-4 border rounded">
                      <h4 className="font-semibold">{project.title}</h4>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>
                          {(project.amountRaised / project.fundingGoal) * 100}%
                          funded
                        </span>
                        <span>
                          {calculateDaysToGo(
                            project.createdAt,
                            project.deadline
                          )}{" "}
                          days to go
                        </span>
                      </div>
                      <div className="mt-2">
                        <Link
                          to={`/project/${project.title.replaceAll(" ", "-")}`}
                          className="text-blue-600 hover:underline"
                        >
                          View Project
                        </Link>
                      </div>
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
                <Link
                  to="/transactions"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Transaction History
                </Link>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Backed Projects</h3>
                {user.backedProjects.length > 0 ? (
                  user.backedProjects.map((project) => (
                    <div key={project._id} className="mb-4 p-4 border rounded">
                      <h4 className="font-semibold">{project.title}</h4>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Pledged: ${project.pledgeAmount}</span>
                        <span>Status: {project.status}</span>
                      </div>
                      <div className="mt-2">
                        <Link
                          to={`/project/${project._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-gray-600">
                      You haven't backed any projects yet.
                    </p>
                    <Link
                      to="/explore"
                      className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
                    >
                      Explore Projects
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDashboard;
