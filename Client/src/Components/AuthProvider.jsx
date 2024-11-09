import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user, isError, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking for a token in cookies)
    const curruser = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      if (curruser) {
        try {
          dispatch(getUserData());
        } catch (error) {
          navigate("/signin");
        }
      } else {
        navigate("/signin");
      }
    }
  }, [dispatch]);

  return (
    <div>
      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {children}
    </div>
  );
};

export const useAuth = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  return { isLoggedIn, user };
};
