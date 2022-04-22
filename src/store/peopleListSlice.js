import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetch = createAsyncThunk(
  'peopleList/fetch',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/people?page=${page}`)
      return response.data
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export default createSlice({
  name: 'peopleList',
  initialState: {
    data: [],
    totalPages: 0,
    loading: false
  },
  extraReducers: {
    [fetch.pending]: state => {
      state.loading = true
    },
    [fetch.fulfilled]: (state, { payload }) => {
      state.data = payload.data
      state.totalPages = payload.meta.last_page
      state.loading = false
    },
    [fetch.rejected]: (state, { payload }) => {
      state.loading = false
    }
  }
})
