import {useState} from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
export default function Tables(props) {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [musicianName,setMusicianName] = useState('')
  const [id,setID] = useState();
  const handleCreateUser = () => {
    navigate("/users/create");
  };
  const { user } = useAuth();
  return (
    <>
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Users
        </Typography>

        <IconButton
          aria-label="create"
          color="primary"
          onClick={handleCreateUser}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users &&
            props.users.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell><ul>{row.roles.map((item,idx) => <li key={idx}>{item.name}</li> )}</ul></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
