import { FC, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getAllUsers,
  getAllUsersPaginated,
} from '../redux/users/users.actions';
import { setLimit, setPage, userSelector } from '../redux/users/users.slice';

const BasicTable: FC<unknown> = () => {
  const dispatch = useAppDispatch();
  const { data, page, limit, totalRecords } = useAppSelector(userSelector);

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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    dispatch(setLimit(newLimit));
    dispatch(getAllUsersPaginated(0, newLimit));
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
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
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
