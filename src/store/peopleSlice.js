import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetch = createAsyncThunk(
  'people/fetch',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/people/${id}`)
      return response.data
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export default createSlice({
  name: 'people',
  initialState: {
    data: {},
    loading: false
  },
  extraReducers: {
    [fetch.pending]: state => {
      state.loading = true
    },
    [fetch.fulfilled]: (state, { payload }) => {
      state.data = payload.data
      state.loading = false
    },
    [fetch.rejected]: state => {
      state.loading = false
    }
  }
})
