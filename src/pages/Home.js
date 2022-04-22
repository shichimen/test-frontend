import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', pt: 6 }}>
      <Typography align="center" color="text.primary" component="h1" gutterBottom variant="h2">
        Welcome home
      </Typography>
      <Typography align="center" color="text.secondary" paragraph variant="h5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis deserunt dolor eaque
        exercitationem iure nostrum officiis, perferendis tenetur vitae?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
        <Button component={Link} to="/login" variant="contained">Sign in</Button>
        <Button component={Link} to="/people" variant="outlined">List people</Button>
      </Stack>
    </Box>
  )
}
