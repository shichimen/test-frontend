import React from 'react'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { login } from '../store/authSlice'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

const validationSchema = yup.object({
  login: yup
    .string('Enter your login')
    .required('Login is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
})

export default function Login() {
  const { error, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(login({ credentials: values, navigate }))
    }
  })

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
      <Avatar sx={{ my: 3, p: 4, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h4">Authorization</Typography>
      {error &&
        <Alert severity="error" sx={{ width: '100%', mt: 3 }}>{error}</Alert>
      }
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
        <LoadingButton
          fullWidth
          loading={loading}
          size="large"
          type="submit"
          variant="contained"
        >
          Sign in
        </LoadingButton>
      </Stack>
    </Box>
  )
}
