import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetch } from '../store/peopleSlice'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from "@mui/material/Typography"
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

export default function People() {
  const { id } = useParams()
  const { data, loading } = useSelector(state => state.people)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch({ id }))
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Typography color="text.primary" component="h1" variant="h5">{data.name}</Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Name</TableCell>
                <TableCell align="right" component="th" scope="row">{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Height</TableCell>
                <TableCell align="right" component="th" scope="row">{data.height}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Mass</TableCell>
                <TableCell align="right" component="th" scope="row">{data.mass}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Hair color</TableCell>
                <TableCell align="right" component="th" scope="row">{data.hair_color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Skin color</TableCell>
                <TableCell align="right" component="th" scope="row">{data.skin_color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Eye color</TableCell>
                <TableCell align="right" component="th" scope="row">{data.eye_color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Birth year</TableCell>
                <TableCell align="right" component="th" scope="row">{data.birth_year}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">Gender</TableCell>
                <TableCell align="right" component="th" scope="row">{data.gender}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
