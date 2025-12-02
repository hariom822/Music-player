import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingers = createAsyncThunk(
  "music/fetchSingers",
  async () => {
    const res = await axios.get("http://localhost:8000/find");
    return res.data;
  }
);
const singerSlice = createSlice({
  name: "music",
  initialState: {
    singers: [],
    selectedSinger: null,
    searchText: "",
    favourites: [],
    history: [],    
    loading: false,
    error: null,
    viewMode: "card",
  },

  reducers: {
    setSelectedSinger: (state, action) => {
      state.selectedSinger = action.payload;
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload; 
    },
    addToHistory: (state, action) => {
      const song = action.payload;

      state.history = state.history.filter((x) => x.id !== song.id);

      state.history.unshift(song);

      if (state.history.length > 20) {
        state.history.pop();
      }
    },

    toggleFavourite: (state, action) => {
      const song = action.payload;
      const exists = state.favourites.some((x) => x.id === song.id);

      if (exists) {
        state.favourites = state.favourites.filter((x) => x.id !== song.id);
      } else {
        state.favourites.push(song);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSingers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingers.fulfilled, (state, action) => {
        state.loading = false;
        state.singers = action.payload;
      })
      .addCase(fetchSingers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load singers";
      });
  },
});

export const {
  setSelectedSinger,
  addToHistory,
  setSearchText,
  toggleFavourite,
   setViewMode,
} = singerSlice.actions;

export default singerSlice.reducer;
