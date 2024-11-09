import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VULTR_API_BASE_URL = import.meta.env.VITE_CHATBOT_SERVER_URL;
const VULTR_API_KEY = import.meta.env.VITE_VULTR_API_KEY;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

// Async thunk for creating a vector store collection
export const createVectorStoreCollection = createAsyncThunk(
  "chat/createVectorStoreCollection",
  async (collectionName, { rejectWithValue }) => {
    try {
      // console.log(
      //   "Attempting to create vector store collection:",
      //   collectionName
      // );
      const response = await axios.post(
        `${VULTR_API_BASE_URL}/vector_store`,
        { name: collectionName },
        {
          headers: {
            Authorization: `Bearer ${VULTR_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(
      //   "Vector store collection created successfully:",
      //   response.data
      // );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating vector store collection:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Async thunk for creating a collection item
export const createCollectionItem = createAsyncThunk(
  "chat/createCollectionItem",
  async (data, { rejectWithValue }) => {
    try {
      // console.log("Attempting to create collection item:", {
      //   content,
      //   description,
      // });
      const response = await axios.post(
        `http://localhost:7000/api/v1/createCollectionItem`,
        data
      );
      // console.log("Collection item created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating collection item:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Async thunk for sending a RAG chat completion request
export const sendRagChatCompletion = createAsyncThunk(
  "chat/sendRagChatCompletion",
  async ({ message }, { rejectWithValue }) => {
    try {
      // console.log("Sending RAG chat completion request:", {
      //   message,
      // });
      const response = await axios.post(
        `${VULTR_API_BASE_URL}/chat/completions/RAG`,
        {
          collection: COLLECTION_ID,
          model: "llama2-7b-chat-Q5_K_M",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 512,
          seed: -1,
          temperature: 0.8,
          top_k: 40,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${VULTR_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("RAG chat completion received:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error sending RAG chat completion:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    collections: [],
    currentCollection: COLLECTION_ID,
    messages: [
      {
        role: "assistant",
        content: "Hello! How can I help you with your startup queries today?",
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentCollection: (state, action) => {
      state.currentCollection = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVectorStoreCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVectorStoreCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections.push(action.payload);
        state.currentCollection = action.payload;
      })
      .addCase(createVectorStoreCollection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to create vector store collection";
      })
      .addCase(createCollectionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCollectionItem.fulfilled, (state, action) => {
        state.loading = false;
        // You might want to update the current collection or add the item to a list of items
      })
      .addCase(createCollectionItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to create collection item";
      })
      .addCase(sendRagChatCompletion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRagChatCompletion.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: "assistant",
          content: action.payload.choices[0].message.content,
        });
      })
      .addCase(sendRagChatCompletion.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to send RAG chat completion";
      });
  },
});

export const { setCurrentCollection, addMessage, clearError } =
  chatSlice.actions;

export default chatSlice.reducer;
