import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { IUser } from '../../../reducer/user/model/IUser';
import { useAppDispatch } from '../../../app/hooks';
import { deleteUser } from "../../../reducer/user/userSlice";
interface IProps {
    data: IUser[];
} 
 

const BasicTable = (props: IProps) =>{
 const {data} = props;
 const dispatch= useAppDispatch()
 const onRemoveItem = (branchId: number) => { 
  dispatch(deleteUser(branchId));
 } 
  return (
    <TableContainer sx={{ margin: '5px',width: '95%' }}  component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow> 
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Branch Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Position</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index: number) => (
            <TableRow
              key={index}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index}</TableCell>
              <TableCell align="left">{row.branchId}</TableCell>
              <TableCell align="left">{row.firstName} {row.middleName} {row.lastName}</TableCell> 
              <TableCell align="left">{row.position}</TableCell>
              <TableCell align="left">
                <Button color="primary" variant="contained" onClick={()=>onRemoveItem(row.branchId)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
