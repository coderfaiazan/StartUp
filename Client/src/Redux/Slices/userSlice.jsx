import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_url = import.meta.env.VITE_SERVER_URL;

// Helper function to set a JWT as a cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// User Signup
export const userSignup = createAsyncThunk(
  "user/userSignup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server_url}/api/v1/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      setCookie("token", data.token, 7);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User Signin
export const userSignin = createAsyncThunk(
  "user/userSignin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server_url}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      setCookie("token", data.token, 7);
      localStorage.setItem("authToken", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User Logout
export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server_url}/api/v1/user/logout`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      localStorage.removeItem("user");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get User Data
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); 
      const response = await fetch(`${server_url}/api/v1/user/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  // Add the token here
          "Content-Type": "application/json"
        },
        credentials: "include", // Ensures cookies are sent with the request

      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.data));
      setCookie("token", data.token, 7);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit User Profile
export const editUser = createAsyncThunk(
  "user/editUser",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("profile", JSON.stringify(data.profile));
      formData.append("avatar", data.avatar);
      // console.log("Form Data: ", formData.get("profile"));

      const response = await fetch(
        `${server_url}/api/v1/user/update/${data._id}`,
        {
          method: "PUT",
          // headers: { "Content-Type": "application/json" }, // Do not do this when uploading file
          body: formData,
          credentials: "include", // Ensures cookies are sent with the request
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  isError: false,
  error: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signin Reducers
      .addCase(userSignin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isError = false;
        state.error = null;
      })
      .addCase(userSignin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isError = true;
        state.error = action.payload || "Login failed";
      })

      // Signup Reducers
      .addCase(userSignup.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isError = false;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isError = true;
        state.error = action.payload || "Signup failed";
      })

      // Logout Reducers
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.isError = false;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload || "Logout failed";
      })

      // Get User Data Reducers
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.data;
        state.isError = false;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload || "Failed to fetch user data";
      })

      // Edit User Profile Reducers
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.user };
        state.isError = false;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload || "Failed to update user profile";
      });
  },
});

export default userSlice.reducer;
