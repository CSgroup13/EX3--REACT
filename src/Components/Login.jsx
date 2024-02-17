import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = (props) => {
    // State for managing username, password, and error messages
    const [username, setUsername] = useState(null);
    const [errorUsername, setErrorUsername] = useState("");
    const [password, setPassword] = useState(null);
    const [errorPassword, setErrorPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle user login
    const loginUser = () => {
        // Validation for empty fields
        if (username === null || password === null) {
            setErrorMessage("יש למלא את כל השדות כנדרש.");
        } else {
            // Checking if user is already logged in
            if (sessionStorage["loggedUser"] !== undefined) {
                const usernameLoggedin = JSON.parse(sessionStorage["loggedUser"]).username;
                setErrorMessage(`המשתמש ${usernameLoggedin} כבר מחובר למערכת.`);
            } else {
                // Handling admin login
                if (username === 'admin' && password === 'ad12343211ad') {
                    setErrorMessage("התחברת לממשק המנהל בהצלחה!");
                    props.loginUser(username, password);
                } else {
                    // Handling regular user login
                    let users = props.users;
                    const user = users.find((user) => user.username === username && user.password === password);
                    if (user === undefined) {
                        setErrorMessage("שם משתמש או סיסמא לא נכונים.");
                    } else {
                        setErrorMessage("התחברת למערכת בהצלחה!");
                        props.loginUser(username, password);
                    }
                }
            }
        }
    }

    // Function to handle input field changes
    const fieldChange = (e) => {
        if (e.target.id === "usernameLogin") {
            if (e.target.value !== "admin") {
                // Validation for username field
                if (/^[a-zA-Z0-9!@#$%^&*()-_=+`~{}\[\]|;:'",.<>/?\\]*$/.test(e.target.value) && e.target.value.length <= 60) {
                    setUsername(e.target.value);
                    setErrorUsername('');
                } else {
                    setUsername(null);
                    setErrorUsername('שם המשתמש יכול להכיל אותיות לועזיות, מספרים ותווים בלבד. אורך הטקסט לא יעלה על 60 תווים.');
                }
            } else {
                setUsername(e.target.value);
                setErrorUsername('');
            }
        } else if (e.target.id === "passwordLogin") {
            if (e.target.value !== "ad12343211ad") {
                // Validation for password field
                if (/^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()]{7,12}$/.test(e.target.value)) {
                    setPassword(e.target.value);
                    setErrorPassword('');
                } else {
                    setPassword(null);
                    setErrorPassword('הסיסמא צריכה להכיל 7-12 תווים, ולפחות תו אחד מיוחד, אות גדולה אחת ומספר אחד.');
                }
            } else {
                setPassword(e.target.value);
                setErrorPassword('');
            }
        }
    }

    return (
        // Login form component
        <Container component="main" maxWidth="sm" dir="rtl">
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    התחברות
                </Typography>
                <Box component="form" sx={{ mt: 3 }} >
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            {/* Username input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="usernameLogin"
                                autoComplete="user-name"
                                label="שם משתמש"
                                name="username"
                            />
                            <p style={{ color: "red" }}>{errorUsername}</p>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Password input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                fullWidth
                                id="passwordLogin"
                                label="סיסמא"
                            />
                            <p style={{ color: "red" }}>{errorPassword}</p>
                        </Grid>
                    </Grid>
                    {/* Login button */}
                    <Button
                        onClick={loginUser}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        התחברות
                    </Button>
                    {/* Error message */}
                    <p style={{ color: "red" }}>{errorMessage}</p>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;
