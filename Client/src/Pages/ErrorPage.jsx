import React, { useState, useEffect } from "react";
import ErrorComponent from "../Components/ErrorComponent";
import Loader from "../Components/Loader";

const ErrorPage = ({
  errorMessage = "Page Not Found",
  statusCode = 404,
  loading = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate an API call
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Uncomment the next line to simulate an error
      // setHasError(true)
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Loader size="large" />
      </div>
    );
  }

  if (hasError) {
    return (
      <ErrorComponent statusCode={500} message="An unexpected error occurred" />
    );
  }

  return (
    <div className="min-h-[80vh] bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {statusCode == 0 ? "" : statusCode}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
          <div className="mt-6">{loading && <Loader size="small" />}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
