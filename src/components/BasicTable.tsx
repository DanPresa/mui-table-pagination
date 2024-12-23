import { ChangeEvent, FC, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination, TableSortLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getAllUsers,
  getAllUsersPaginated,
} from '../redux/users/users.actions';
import {
  setLimit,
  setPage,
  setOrder,
  setSortBy,
  userSelector,
} from '../redux/users/users.slice';

const BasicTable: FC<unknown> = () => {
  const dispatch = useAppDispatch();
  const { data, page, limit, totalRecords, sortBy, order } =
    useAppSelector(userSelector);

  const [hidePagination, setHidePagination] = useState(false);

  const handleClickGetPaginatedData = () => {
    setHidePagination(true);
    dispatch(getAllUsersPaginated());
  };

  const handleClickGetAllUsers = () => {
    setHidePagination(false);
    dispatch(getAllUsers());
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(getAllUsersPaginated(newPage, limit));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    dispatch(setLimit(newLimit));
    dispatch(getAllUsersPaginated(0, newLimit));
  };

  const handleRequestSort = (property: keyof User) => {
    const isAsc = sortBy === property && order === 'asc';
    dispatch(setOrder(isAsc ? 'desc' : 'asc'));
    dispatch(setSortBy(property));
    dispatch(getAllUsersPaginated(page, limit));
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickGetPaginatedData}>
        Get All Paginated Users
      </Button>
      <Button variant="outlined" onClick={handleClickGetAllUsers}>
        Get All Users
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortBy === 'id' ? order : false}>
                <TableSortLabel
                  active={sortBy === 'id'}
                  direction={sortBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'firstName' ? order : false}>
                <TableSortLabel
                  active={sortBy === 'firstName'}
                  direction={sortBy === 'firstName' ? order : 'asc'}
                  onClick={() => handleRequestSort('firstName')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: User) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {hidePagination && (
        <TablePagination
          rowsPerPageOptions={[20, 50, 75, { label: 'All', value: -1 }]}
          component="div"
          count={totalRecords}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

export default BasicTable;
