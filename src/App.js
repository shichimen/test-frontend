import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link, Routes, Route, Navigate } from 'react-router-dom'
import { fetchAccount, setLoading } from './store/authSlice'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { logout } from './store/authSlice'
import Container from '@mui/material/Container'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PeopleList from './pages/PeopleList'
import People from './pages/People'

const theme = createTheme();

const checkAuth = dispatch => {
  if (localStorage.getItem('accessToken')) {
    dispatch(fetchAccount())
  } else {
    dispatch(setLoading(false))
  }
}

export default function App() {
  const { authenticated, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth(dispatch)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography color="inherit" variant="h6">Test Application</Typography>
          <Button component={Link} color="inherit" to="/" variant="flat" sx={{ ml: 3 }}>Home page</Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          {!authenticated
            ? <Button component={Link} color="inherit" to="/login" variant="outlined">Sign in</Button>
            : <>
                <Button
                  component={Link}
                  color="inherit"
                  to="/profile"
                  variant="outlined"
                >
                  My profile
                </Button>
                <Button
                  color="inherit"
                  onClick={() => { dispatch(logout({ navigate })) }}
                  sx={{ ml: 3 }}
                  variant="outlined"
                >
                  Logout
                </Button>
              </>
          }
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ pt: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={authenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="people" element={<PeopleList />}></Route>
            <Route path="people/:id" element={<People />}></Route>
          </Routes>
        </Container>
      </main>
    </ThemeProvider>
  )
}
