import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchAccount = createAsyncThunk(
  'auth/fetchAccount',
  async (payload, { rejectWithValue }) => {
    if (!localStorage.getItem('accessToken')) {
      return rejectWithValue(null)
    }

    try {
      const response = await axios.get('api/me')
      return response.data.data
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

export const updateAccount = createAsyncThunk(
  'auth/updateAccount',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put('api/me', payload)
      return response.data
    } catch (e) {
      localStorage.removeItem('accessToken')
      return rejectWithValue(e.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/login ', credentials)
      localStorage.setItem('accessToken', response.data.accessToken)
      navigate('/')
      return response.data.user
    } catch (e) {
      if (e.response.status === 401) {
        return rejectWithValue('The provided credentials are incorrect')
      }

      return rejectWithValue(e.message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate }, { rejectWithValue }) => {
    try {
      await axios.post('api/logout')
      localStorage.removeItem('accessToken')
      navigate('/')
      return null
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    user: null,
    loading: true,
    error: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: {
    [fetchAccount.pending]: state => {
      state.loading = true
    },
    [fetchAccount.fulfilled]: (state, { payload }) => {
      state.authenticated = true
      state.user = payload
      state.loading = false
    },
    [fetchAccount.rejected]: state => {
      state.loading = false
    },
    [updateAccount.pending]: state => {
      state.loading = true
    },
    [updateAccount.fulfilled]: (state, { payload }) => {
      state.user = payload
      state.loading = false
    },
    [updateAccount.rejected]: state => {
      state.loading = false
    },
    [login.pending]: state => {
      state.loading = true
      state.error = null
    },
    [login.fulfilled]: (state, { payload }) => {
      state.authenticated = true
      state.user = payload
      state.loading = false
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [logout.pending]: state => {
      state.loading = true
    },
    [logout.fulfilled]: state => {
      state.authenticated = false
      state.user = null
      state.loading = false
    },
    [logout.rejected]: state => {
      state.loading = false
    },
  }
})

export const { setLoading } = authSlice.actions
export default authSlice