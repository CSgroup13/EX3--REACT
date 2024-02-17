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
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete component

const Register = (props) => {
    // State variables for form fields and error messages
    const [firstName, setFirstName] = useState(null);
    const [errorFirstName, setErrorFirstName] = useState("");
    const [lastName, setLastName] = useState(null);
    const [errorLastName, setErrorLastName] = useState("");
    const [username, setUsername] = useState(null);
    const [errorUsername, setErrorUsername] = useState("");
    const [email, setEmail] = useState(null);
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState(null);
    const [errorPassword, setErrorPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState(null);
    const [errorPasswordValidation, setErrorPasswordValidation] = useState("");
    const [birthdate, setBirthdate] = useState(null);
    const [errorBirthdate, setErrorBirthdate] = useState("");
    const [image, setImage] = useState(null);
    const [errorImage, setErrorImage] = useState("");
    const [city, setCity] = useState(null);
    const [errorCity, setErrorCity] = useState("");
    const [street, setStreet] = useState(null);
    const [errorStreet, setErrorStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState(null);
    const [errorStreetNumber, setErrorStreetNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const cities = ['ירושלים', 'תל אביב-יפו', 'חיפה', 'ראשון לציון', 'פתח תקווה', 'אשדוד', 'נתניה', 'באר שבע', 'חולון', 'בני ברק', 'רמת גן', 'אשקלון', 'בת ים', 'הרצליה', 'רמלה', 'לוד', 'קרית גת', 'רעננה', 'נצרת', 'הוד השרון'];

    // Function to handle changes in form fields
    const fieldChange = (e) => {
        switch (e.target.id) {
            case 'firstName':
                // Validation for first name
                // Only letters and spaces allowed
                if (/^[\u0590-\u05FFa-zA-Z\s]*$/.test(e.target.value)) {
                    setFirstName(e.target.value);
                    setErrorFirstName('');
                } else {
                    setFirstName(null);
                    setErrorFirstName('שם פרטי יכול להכיל אותיות באנגלית או בעברית בלבד.');
                }
                break;
            case 'lastName':
                // Validation for last name
                // Only letters and spaces allowed
                if (/^[\u0590-\u05FFa-zA-Z\s]*$/.test(e.target.value)) {
                    setLastName(e.target.value);
                    setErrorLastName('');
                } else {
                    setLastName(null);
                    setErrorLastName('שם משפחה יכול להכיל אותיות באנגלית או בעברית בלבד.');
                }
                break;
            case 'username':
                // Validation for username
                // Alphanumeric characters and special characters allowed, max length 60
                if (/^[a-zA-Z0-9!@#$%^&*()-_=+`~{}\[\]|;:'",.<>/?\\]*$/.test(e.target.value) && e.target.value.length <= 60) {
                    setUsername(e.target.value);
                    setErrorUsername('');
                } else {
                    setUsername(null);
                    setErrorUsername('שם המשתמש יכול להכיל אותיות לועזיות, מספרים ותווים בלבד. אורך הטקסט לא יעלה על 60 תווים.');
                }
                break;
            case 'email':
                // Validation for email
                // Must be a valid email address
                if (/^[a-zA-Z\d]+@[a-zA-Z\d]+\.com$/.test(e.target.value)) {
                    setEmail(e.target.value);
                    setErrorEmail('');
                } else {
                    setEmail(null);
                    setErrorEmail('כתובת המייל חייבת להכיל @ פעם אחת ולהסתיים ב.com. ');
                }
                break;
            case 'password':
                // Validation for password
                // Must contain 7-12 characters, at least one uppercase letter, one digit, and one special character
                if (/^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()]{7,12}$/.test(e.target.value)) {
                    setPassword(e.target.value);
                    setErrorPassword('');
                } else {
                    setPassword(null);
                    setErrorPassword('הסיסמא צריכה להכיל 7-12 תווים, ולפחות תו אחד מיוחד, אות גדולה אחת ומספר אחד.');
                }
                break;
            case 'passwordValidation':
                // Validation for password confirmation
                // Must match the password entered
                if (e.target.value == password) {
                    setPasswordValidation(e.target.value);
                    setErrorPasswordValidation('');
                } else {
                    setPasswordValidation(null);
                    setErrorPasswordValidation('יש להזין סיסמא זהה לסיסמא שבחרת.');
                }
                break;
            case 'birthdate':
                // Validation for birthdate
                // Must be a valid date and the user must be between 18 and 120 years old
                const birthDate = new Date(e.target.value);
                const currentDate = new Date();
                let age = currentDate.getFullYear() - birthDate.getFullYear();
                // Check if the current date has passed the birthdate for this year
                // If not, decrease the age by 1
                if (currentDate.getMonth() < birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age > 120 || age < 18) {
                    setErrorBirthdate('תאריך הלידה לא תקין.');
                    setBirthdate(null);
                } else {
                    setBirthdate(birthDate);
                    setErrorBirthdate('');
                }
                break;
            case 'image':
                // Validation for image upload
                // Must be a jpeg or jpg file
                const file = e.target.files[0];
                if (file && file.type && file.type.startsWith('image/') && /\.(jpg|jpeg)$/i.test(file.name)) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageUrl = event.target.result;
                        setImage(imageUrl);
                        setErrorImage('')
                    };
                    reader.readAsDataURL(file);
                } else {
                    setImage(null);
                    setErrorImage('יש לבחור קובץ מסוג תמונה בלבד, קבצי jpeg או jpg.')
                }
                break;
            case 'street':
                // Validation for street name
                // Only Hebrew letters and spaces allowed
                if (/^[\u0590-\u05FF\s]+$/.test(e.target.value)) {
                    setStreet(e.target.value);
                    setErrorStreet('');
                } else {
                    setStreet(null);
                    setErrorStreet('יש להזין אותיות בעברית בלבד.');
                }
                break;
            case 'streetNumber':
                // Validation for street number
                // Must be a positive number
                if (e.target.value >= 0) {
                    setStreetNumber(e.target.value);
                    setErrorStreetNumber('')
                } else {
                    setStreetNumber(null);
                    setErrorStreetNumber('מספר הרחוב לא יכול להיות שלילי.')
                }
                break;
            default:
                break;
        }
    }

    // Function to handle city selection
    const handleCitySelect = (value) => {
        if (value === null) {
            setCity(null);
            setErrorCity('יש לבחור עיר מהרשימה.');
        } else {
            setCity(value);
            setErrorCity('');
        }
    }

    // Function to register a new user
    const registerUser = () => {
        if (firstName === null || lastName === null || username === null || email === null || password === null || passwordValidation === null || birthdate === null || image === null || city === null || street === null || streetNumber === null)
            setErrorMessage("יש למלא את כל השדות כנדרש.");
        else {
            const userExists = props.users.find((user) => user.username == username || user.email == email);
            if (userExists) {
                setErrorMessage(' המשתמש כבר קיים במערכת.');
            } else {
                const userBirthdate = new Date(birthdate).toLocaleDateString();
                const newUser = { firstName, lastName, username, email, password, 'birthDate': userBirthdate, image, city, street, streetNumber };
                setErrorMessage('נרשמת בהצלחה!');
                props.addNewUser(newUser);
            }
        }
    }

    return (
        // Register form component
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
                    הרשמה
                </Typography>
                <Box component="form" sx={{ mt: 3 }} >
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            {/* First name input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="firstName"
                                label="שם פרטי"
                                type="text"
                            />
                            <p style={{ color: "red" }}>{errorFirstName}</p>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Last name input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="lastName"
                                label="שם משפחה"
                                type="text"
                            />
                            <p style={{ color: "red" }}>{errorLastName}</p>
                        </Grid>
                        <Grid item xs={6} >
                            {/* Username input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="username"
                                label="שם משתמש"
                                type="text"
                            />
                            <p style={{ color: "red" }}>{errorUsername}</p>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Email input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                label="כתובת מייל"
                                autoComplete="user-email"
                                id="email"
                                type="email"
                            />
                            <p style={{ color: "red" }}>{errorEmail}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* Password input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="password"
                                autoComplete="new-password"
                                label="סיסמא"
                                type="password"
                            />
                            <p style={{ color: "red" }}>{errorPassword}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* Password validation input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="passwordValidation"
                                autoComplete="new-password"
                                label="אימות סיסמא"
                                type="password"
                            />
                            <p style={{ color: "red" }}>{errorPasswordValidation}</p>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Birthdate input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="birthdate"
                                type="date"
                            />
                            <p style={{ color: "red" }}>{errorBirthdate}</p>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {/* Image upload input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                id="image"
                                type="file"
                            />
                            <p style={{ color: "red" }}>{errorImage}</p>
                        </Grid>
                        <Grid item xs={12}>
                            {/* City selection dropdown */}
                            <Autocomplete
                                disablePortal
                                onChange={(event, value) => handleCitySelect(value)}
                                required
                                id="city"
                                options={cities}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="עיר" required />}
                            />
                            <p style={{ color: "red" }}>{errorCity}</p>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Street name input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                label="רחוב"
                                id="street"
                                type="text"
                            />
                            <p style={{ color: "red" }}>{errorStreet}</p>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Street number input field */}
                            <TextField onChange={(e) => fieldChange(e)}
                                required
                                fullWidth
                                label="מספר"
                                type="number"
                                id="streetNumber"
                            />
                            <p style={{ color: "red" }}>{errorStreetNumber}</p>
                        </Grid>
                    </Grid>
                    {/* Register button */}
                    <Button
                        onClick={registerUser}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        הרשמה
                    </Button>
                    {/* Error message display */}
                    <p style={{ color: "red" }}>{errorMessage}</p>
                </Box>
            </Box>
        </Container>
    )
}

export default Register;
