import React from "react";
import { Link } from "react-router-dom";
import { calculateDaysToGo } from "../service/operations";

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={project.mediaurls?.secure_url || "/placeholder.jpg"}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.category}</p>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(project.amountRaised / project.fundingGoal) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>
              {(project.amountRaised / project.fundingGoal) * 100}% funded
            </span>
            <span>
              {calculateDaysToGo(project.createdAt, project.deadline)} days to
              go
            </span>
          </div>
        </div>
        <Link
          to={`/project/${project.title.replace(" ", "-")}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          View Project
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
