import React from 'react'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { updateAccount } from '../store/authSlice'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/AccountBox'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import CircularProgress from '@mui/material/CircularProgress'
import { Navigate } from 'react-router-dom'

const validationSchema = yup.object({
  login: yup
    .string()
    .required('Login is required'),
  name: yup
    .string()
    .required('Name is required'),
  email: yup
    .string()
    .email()
    .required('Email is required')
})

export default function Login() {
  const { authenticated, user, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      login: user ? user.login : '',
      password: '',
      name: user ? user.name : '',
      email: user ? user.email : ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(updateAccount(values))
    }
  })

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!authenticated) {
    return <Navigate to="/" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '500px',
        margin: '0 auto'
    }}
    >
      <Avatar sx={{ p: 4, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" sx={{ mt: 3 }} variant="h4">{user && user.login}</Typography>
      <Stack component="form" onSubmit={formik.handleSubmit} spacing={3} sx={{ width: '100%', mt: 3 }}>
        <TextField
          autoComplete="login"
          autoFocus
          error={formik.touched.login && Boolean(formik.errors.login)}
          fullWidth
          helperText={formik.touched.login && formik.errors.login}
          label="Login"
          name="login"
          onChange={formik.handleChange}
          value={formik.values.login}
        />
        <TextField
          autoComplete="current-password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          name="password"
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        <TextField
          error={formik.touched.name && Boolean(formik.errors.name)}
          fullWidth
          helperText={formik.touched.name && formik.errors.name}
          label="Name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <TextField
          error={formik.touched.email && Boolean(formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
          name="email"
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <LoadingButton
          fullWidth
          loading={loading}
          size="large"
          type="submit"
          variant="contained"
        >
          Save
        </LoadingButton>
      </Stack>
    </Box>
  )
}
