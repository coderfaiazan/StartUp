import React, { useState, useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";
import ErrorPage from "./ErrorPage";
import { getCollection } from "../service/collection";

function ExploreProjects() {
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [projects, setProjects] = useState([]);

  function getCategoryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("category");
  }

  useEffect(() => {
    async function fetchProjects() {
      let category = getCategoryFromUrl();
      // console.log(category);
      if (category == null) category = "All";

      try {
        // Fetch the collections
        const collections = await getCollection(category);
        if (collections.data) setProjects(collections?.data);
        // console.log(collections);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    // Call the async function
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Projects</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded ${
              view === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            List
          </button>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="endingSoon">Ending Soon</option>
        </select>
      </div>

      {projects ? (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <ErrorPage errorMessage="No Projects Found" statusCode={0} />
      )}
    </div>
  );
}

export default ExploreProjects;
