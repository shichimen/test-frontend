import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import peopleListSlice from './peopleListSlice'
import peopleSlice from './peopleSlice'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    peopleList: peopleListSlice.reducer,
    people: peopleSlice.reducer
  }
})
