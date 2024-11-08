import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch } from "react-redux";
import { createCollectionItem } from "../Redux/Slices/chatSlice";
import ErrorPage from "./ErrorPage";

const AdminDashboard = () => {
  const [chatbotData, setChatbotData] = useState(null);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  // Dummy data for the chart
  const data = [
    { name: "Jan", Projects: 4000, Users: 2400, amt: 2400 },
    { name: "Feb", Projects: 3000, Users: 1398, amt: 2210 },
    { name: "Mar", Projects: 2000, Users: 9800, amt: 2290 },
    { name: "Apr", Projects: 2780, Users: 3908, amt: 2000 },
    { name: "May", Projects: 1890, Users: 4800, amt: 2181 },
    { name: "Jun", Projects: 2390, Users: 3800, amt: 2500 },
    { name: "Jul", Projects: 3490, Users: 4300, amt: 2100 },
  ];

  const handleChatbotDataUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setChatbotData(jsonData);
          // Here you would typically send this data to your backend or chatbot service
          if (jsonData) {
            try {
              jsonData.map((chat) => {
                // const { content, description } = chat;
                dispatch(createCollectionItem(chat));
              });
            } catch (error) {
              console.log(error);
            }
          }
          console.log("Chatbot data uploaded:", jsonData);
          alert("Chatbot data uploaded successfully!");
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert(
            "Error uploading chatbot data. Please ensure it's a valid JSON file."
          );
        }
      };
      reader.readAsText(file);
    }
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                      {/* Icon */}
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">
                        8,282
                      </h4>
                      <div className="text-gray-500">New Users</div>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                      {/* Icon */}
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">
                        200,521
                      </h4>
                      <div className="text-gray-500">Total Users</div>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                    <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                      {/* Icon */}
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">
                        215,542
                      </h4>
                      <div className="text-gray-500">Available Products</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Name
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Title
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Role
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>

                              <div className="ml-4">
                                <div className="text-sm font-medium leading-5 text-gray-900">
                                  John Doe
                                </div>
                                <div className="text-sm leading-5 text-gray-500">
                                  john@example.com
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              Software Engineer
                            </div>
                            <div className="text-sm leading-5 text-gray-500">
                              Web dev
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              Active
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            Owner
                          </td>

                          <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-gray-600">Platform Statistics</h4>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Projects" fill="#8884d8" />
                    <Bar dataKey="Users" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-gray-600">Chatbot Data Upload</h4>
              <div className="mt-4">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleChatbotDataUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
