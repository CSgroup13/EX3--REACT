import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import EditDetails from './EditDetails';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function SystemAdmin(props) {
    // State for managing edit mode and selected user for editing
    const [edit, setEdit] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Function to logout admin
    const logoutAdmin = () => {
        props.logout();
    }

    // Function to delete a user
    const deleteFromUsers = (email) => {
        props.deleteUser(email);
    }

    // Function to handle edit button click
    const handleEditClick = (user) => {
        setEditingUser(user);
        setEdit(prev => !prev);
    }

    return (
        <Container component="main" dir="rtl">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #ccc', // Add border
                    borderRadius: '3%',
                    padding: '20px',
                    marginBottom: "35px",
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add shadow
                }}
            >
                <TableContainer component={Paper} dir="rtl">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            {/* Table header */}
                            <TableRow>
                                <TableCell align="right">שם משתמש</TableCell>
                                <TableCell align="right">שם מלא</TableCell>
                                <TableCell align="right">תאריך לידה</TableCell>
                                <TableCell align="right">כתובת</TableCell>
                                <TableCell align="right">דואר אלקטרוני</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Iterate over users to display user details */}
                            {props.users.map((user) => (
                                <>
                                    <TableRow
                                        key={user.email}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{user.username}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.firstName} {user.lastName}
                                        </TableCell>
                                        <TableCell align="right">{user.birthDate}</TableCell>
                                        <TableCell align="right">{user.street} {user.streetNumber}, {user.city}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                        {/* Edit and delete buttons */}
                                        <TableCell align="right">
                                            <IconButton aria-label="edit" style={{ color: "blue" }} onClick={() => handleEditClick(user)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" style={{ color: "red" }} onClick={() => deleteFromUsers(user.email)}>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Render EditDetails component if edit mode is enabled */}
                {edit && <EditDetails user={editingUser} users={props.users} editUser={props.editUser} />}
                {/* Button for admin logout */}
                <Button
                    onClick={logoutAdmin}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    התנתקות מממשק המנהל
                </Button>
            </Box>
        </Container>
    );
}