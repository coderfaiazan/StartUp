import React from "react";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ErrorComponent = ({ statusCode = 404, message = "Page not found" }) => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Error {statusCode}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
          </div>

          <div className="mt-8">
            <div className="text-sm text-center">
              <Link
                to="/"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Go back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
