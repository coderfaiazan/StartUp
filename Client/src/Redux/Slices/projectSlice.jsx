import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_url = "http://localhost:7000";

// Thunk for creating a project
export const createproject = createAsyncThunk(
  "project/createproject",
  async (formData, { getState, rejectWithValue }) => {
    // Access user data from user slice
    const { user } = getState().user;
    if (user && user._id) {
      try {
        // Create a new FormData instance to send data with file
        const formDataToSend = new FormData();

        // Append non-file fields from formData
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("fundingGoal", formData.fundingGoal);
        formDataToSend.append("amountRaised", formData.amountRaised);
        formDataToSend.append("deadline", formData.deadline);

        // Append the single file from mediaurls (which is a file input)
        // if (formData.mediaurls) {
        formDataToSend.append("mediaurls", formData.mediaurls);
        // }

        const response = await fetch(
          `${server_url}/api/v1/project/register/${user._id}`,
          {
            method: "PUT",
            body: formDataToSend, // Send FormData with file and data
            credentials: "include", // Include cookies (if needed)
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(
            errorData.message || "Failed to create project"
          );
        }

        const result = await response.json();
        return result; // Return the project data directly
      } catch (error) {
        return rejectWithValue(error.message || "Network error occurred");
      }
    } else {
      return rejectWithValue("User ID is not available.");
    }
  }
);

// For Adding rewards
export const addReward = createAsyncThunk(
  "project/addReward",
  async ({
    projectId,
    title,
    description,
    minContribution,
    available,
    estimatedDate,
  }) => {
    try {
      const response = await fetch(`${server_url}/api/v1/project/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          title,
          description,
          minContribution,
          available,
          estimatedDate,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to Add Reward");
      }

      const result = await response.json();
      return result; // Return the project data directly
    } catch (error) {
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

// For Adding post to the project
export const addPost = createAsyncThunk(
  "project/addPost",
  async ({ projectId, content }, { getState, rejectWithValue }) => {
    // Access user data from user slice
    const { user } = getState().user;
    if (user && user._id) {
      try {
        const response = await fetch(`${server_url}/api/v1/project/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            userId: user._id,
            content,
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || "Failed to create post");
        }

        const result = await response.json();
        return result; // Return the project data directly
      } catch (error) {
        return rejectWithValue(error.message || "Network error occurred");
      }
    } else {
      return rejectWithValue("User ID is not available.");
    }
  }
);

// Comment
export const addCommentToPost = createAsyncThunk(
  "project/addCommentToPost",
  async ({ postId, content }) => {
    try {
      const response = await fetch(`${server_url}/api/v1/project/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to Add Comment");
      }

      const result = await response.json();
      return result; // Return the project data directly
    } catch (error) {
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

// Comment
export const removeCommentFromPost = createAsyncThunk(
  "project/removeCommentFromPost",
  async ({ postId, commentId }) => {
    try {
      const response = await fetch(
        `${server_url}/api/v1/project/remove-comment`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            commentId,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to Remove Comment");
      }

      const result = await response.json();
      return result; // Return the project data directly
    } catch (error) {
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

// Thunk to fetch a project by title
export const fetchProjectByTitle = createAsyncThunk(
  "project/fetchProjectByTitle",
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server_url}/api/v1/project/me/${title}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update project details
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (
    {
      id,
      title,
      description,
      category,
      fundingGoal,
      amountRaised,
      deadline,
      mediaurls,
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("fundingGoal", String(fundingGoal));
    formData.append("amountRaised", amountRaised);
    formData.append("deadline", deadline);
    if (mediaurls) formData.append("mediaurls", mediaurls);

    try {
      const response = await fetch(
        `${server_url}/api/v1/project/update/${id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  isError: false,
  errorMessage: "",
  project: {},
};

// Slice definition
export const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createproject.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(createproject.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload.project; // Assign the full response to project
      })
      .addCase(addReward.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addReward.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload; // Assign the full response to project
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload; // Assign the full response to project
      })
      .addCase(addCommentToPost.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload; // Assign the full response to project
      })
      .addCase(fetchProjectByTitle.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload.project;
      })
      .addCase(fetchProjectByTitle.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(removeCommentFromPost.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload;
      })
      .addCase(removeCommentFromPost.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
        state.project = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default projectSlice.reducer;
