import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import { getCollection } from "../service/collection";

function HomePage() {
  // Mock data for featured projects
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Fetch the collections
        const collections = await getCollection("All");
        if (collections.data) setProjects(collections.data.splice(1, 3));
        // console.log(collections);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    // Call the async function
    fetchProjects();
  }, []);

  // const featuredProjects = [
  //   {
  //     _id: "672b7240da129d7a75b2c3ca",
  //     title: "Sustainable Development Goals",
  //     description:
  //       "Sustainable development is a comprehensive approach to economic, social, and environmental progress that aims to meet the needs of the present without compromising the ability of future generations to meet their own needs. Below are 10 key subtopics that can serve as the basis for website content:",
  //     category: "Education",
  //     collaborators: [
  //       {
  //         $oid: "67267daf73f17b406875fce7",
  //       },
  //     ],
  //     fundingGoal: 1000000,
  //     amountRaised: 0,
  //     deadline: "2025-02-14T00:00:00.000Z",
  //     mediaurls: {
  //       public_id: "STARTUP/ambnqpflbww6bfmeahc1",
  //       secure_url:
  //         "https://res.cloudinary.com/faizandb/image/upload/v1730900754/STARTUP/ambnqpflbww6bfmeahc1.jpg",
  //     },
  //     status: "active",
  //     rewards: [],
  //     transactions: [],
  //     posts: [],
  //     createdAt: "2024-11-06T13:42:24.993Z",
  //     updatedAt: "2024-11-06T13:42:29.146Z",
  //   },
  //   {
  //     _id: "672b72d3da129d7a75b2c3f0",
  //     title: "Test Upload 4",
  //     description: " test",
  //     category: "Technology",
  //     collaborators: [
  //       {
  //         $oid: "67267daf73f17b406875fce7",
  //       },
  //     ],
  //     fundingGoal: 1,
  //     amountRaised: 0,
  //     deadline: "2024-11-07T00:00:00.000Z",
  //     mediaurls: {
  //       public_id: "STARTUP/oxv2cuphhttx4tm48iul",
  //       secure_url:
  //         "https://res.cloudinary.com/faizandb/image/upload/v1730900899/STARTUP/oxv2cuphhttx4tm48iul.jpg",
  //     },
  //     status: "active",
  //     rewards: [
  //       {
  //         $oid: "672b74f5da129d7a75b2c47c",
  //       },
  //       {
  //         $oid: "672b7574da129d7a75b2c4b5",
  //       },
  //     ],
  //     transactions: [],
  //     posts: [
  //       {
  //         $oid: "672b75c6da129d7a75b2c4ce",
  //       },
  //     ],
  //     createdAt: "2024-11-06T13:44:51.236Z",
  //   },
  //   {
  //     _id: "672c98607f9014c5674d9207",
  //     title: "Rockband",
  //     description: " Rock band",
  //     category: "Music",
  //     fundingGoal: 1000,
  //     amountRaised: 0,
  //     deadline: "2024-11-17T00:00:00.000Z",
  //     mediaurls: {
  //       public_id: "STARTUP/a2cy5re7ygebir2dm8br",
  //       secure_url:
  //         "https://res.cloudinary.com/faizandb/image/upload/v1730976051/STARTUP/a2cy5re7ygebir2dm8br.jpg",
  //     },
  //     createdAt: "2024-11-07T10:37:20.799Z",
  //   },
  // ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fund Your Dreams
          </h1>
          <p className="text-xl mb-8">
            Join our community of creators and backers to bring ideas to life.
          </p>
          <div className="space-x-4">
            <Link
              to="/start-project"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Start a Project
            </Link>
            <Link
              to="/explore"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Discover Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects &&
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Technology",
              "Art",
              "Film",
              "Games",
              "Music",
              "Food",
              "Health",
              "Education",
            ].map((category) => (
              <Link
                key={category}
                to={`/explore?category=${category}`}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              >
                <i
                  className={`fas fa-${category.toLowerCase()} text-3xl mb-2 text-blue-600`}
                ></i>
                <h3 className="font-semibold">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
