import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { createproject } from "../Redux/Slices/projectSlice";
import { useNavigate } from "react-router-dom";

function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  let [projectData, setProjectData] = useState({
    title: "",
    category: "",
    description: " ",
    fundingGoal: "",
    amountRaised: "0",
    duration: "",
    previewImage: "",
    deadline: "",
    mediaurls: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function calculateDeadlineDate(daysFromNow) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt(daysFromNow, 10));
    return currentDate.toISOString().split("T")[0]; // Returns the date in YYYY-MM-DD format
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);

    if (file) {
      // You can store the file object directly if you plan to upload it later
      setProjectData((prevData) => ({
        ...prevData,
        mediaurls: file, // Store the file itself (not the Data URL)
      }));

      // Optional: If you want to preview the image, use FileReader to read the image as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the preview URL as well, if necessary
        setProjectData((prevData) => ({
          ...prevData,
          previewImage: reader.result, // Store the Data URL for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    projectData.deadline = calculateDeadlineDate(projectData.duration);
    if (projectData.fundingGoal < 100) {
      alert("Funding Goal must be greater than ₹100");
    } else {
      const reponse = await dispatch(createproject(projectData));
      if (reponse) {
        // alert("Project submitted successfully!");
        setShowModal({
          success: true,
          title: projectData.title,
        });
        setTimeout(() => {
          navigate("/project/" + projectData.title.replaceAll(" ", "-"));
        }, 3000); // Navigate to the project page
      } else {
        setShowModal({
          success: false,
          title: projectData.title,
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Start Your Project</h1>

      {showModal && (
        <div
          className={`${
            showModal.success
              ? "bg-green-100 border-l-4 border-green-500 text-green-700"
              : "bg-red-100 border-l-4 border-red-500 text-red-700"
          } p-4 mb-4`}
          role="alert"
        >
          {showModal.success ? (
            <p className="font-bold">Project submitted successfully!</p>
          ) : (
            <p className="font-bold">Project creation failed!</p>
          )}
          <p>Project Title: {showModal.title}.</p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((item) => (
            <React.Fragment key={item}>
              <div
                className={`rounded-full h-12 w-12 flex items-center justify-center border-2 ${
                  step >= item
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {item}
              </div>
              {item < 3 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step > item ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Basics</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={projectData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={projectData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Art">Art</option>
                <option value="Film">Film</option>
                <option value="Games">Games</option>
                <option value="Music">Music</option>
                <option value="Food">Food</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="coverImage" className="block mb-2">
                Cover Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="coverImage"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {projectData.previewImage ? (
                    <img
                      src={projectData.previewImage}
                      alt="Cover"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CameraIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="coverImage"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Funding</h2>
            <div className="mb-4">
              <label htmlFor="fundingGoal" className="block mb-2">
                Funding Goal (₹)
              </label>
              <input
                type="number"
                id="fundingGoal"
                name="fundingGoal"
                value={projectData.fundingGoal}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block mb-2">
                Campaign Duration (days)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={projectData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit Project
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StartProjectPage;
