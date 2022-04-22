import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from '../store/peopleListSlice'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

export default function PeopleList() {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const { data, totalPages, loading } = useSelector(state => state.peopleList)

  useEffect(() => {
    dispatch(fetch({ page: 1 }))
  }, [])

  const changePage = (event, page) => {
    setPage(page)
    dispatch(fetch({ page }))
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Typography color="text.primary" component="h1" variant="h5">People list</Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell component="th" scope="row" sx={{ textAlign: 'right' }}>
                  <Link to={`/people/${item.id}`}>Show full</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalPages} color="primary" onChange={changePage} page={page} sx={{ mt: 3 }} />
    </>
  )
}
