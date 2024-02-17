import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';


const EditDetails = (props) => {
  const user = props.user;

  const [firstName, setFirstName] = useState(user.firstName)
  const [errorFirstName, setErrorFirstName] = useState("")
  const [lastName, setLastName] = useState(user.lastName)
  const [errorLastName, setErrorLastName] = useState("")
  const [username, setUsername] = useState(user.username)
  const [errorUsername, setErrorUsername] = useState("")
  const [email, setEmail] = useState(user.email)
  const [errorEmail, setErrorEmail] = useState("")
  const [password, setPassword] = useState(user.password)
  const [errorPassword, setErrorPassword] = useState("")
  const [passwordValidation, setPasswordValidation] = useState(user.passwordValidation)
  const [errorPasswordValidation, setErrorPasswordValidation] = useState("")
  const [birthdate, setBirthdate] = useState(user.birthdate)
  const [errorBirthdate, setErrorBirthdate] = useState("")
  const [image, setImage] = useState(user.image)
  const [errorImage, setErrorImage] = useState("")
  const [city, setCity] = useState(user.city)
  const [errorCity, setErrorCity] = useState("")
  const [street, setStreet] = useState(user.street)
  const [errorStreet, setErrorStreet] = useState("")
  const [streetNumber, setStreetNumber] = useState(user.streetNumber)
  const [errorStreetNumber, setErrorStreetNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const cities = ['ירושלים', 'תל אביב-יפו', 'חיפה', 'ראשון לציון', 'פתח תקווה', 'אשדוד', 'נתניה', 'באר שבע', 'חולון', 'בני ברק', 'רמת גן', 'אשקלון', 'בת ים', 'הרצליה', 'רמלה', 'לוד', 'קרית גת', 'רעננה', 'נצרת', 'הוד השרון'];

  const editDetails = () => {
    if (firstName === null || lastName === null || username === null || email === null || password === null || passwordValidation === null || !birthdate || !image || city === null || street === null || streetNumber === null)
      setErrorMessage("יש למלא את כל השדות כנדרש.")
    else {
      const userExists = props.users.find((u) => u.username == username && u.email !== email);
      if (userExists) {
        setErrorMessage(' שם המשתמש כבר קיים במערכת.');
      }
      else {
        const userBirthdate = new Date(birthdate).toLocaleDateString();
        const newUser = { firstName, lastName, username, email, password, 'birthDate': userBirthdate, image, city, street, streetNumber };
        setErrorMessage('הפרטים עודכנו בהצלחה!');
        props.editUser(newUser);
      }
    }
  }

  const fieldChange = (e) => {
    switch (e.target.id) {
      case 'firstName':
        if (/^[\u0590-\u05FFa-zA-Z\s]*$/.test(e.target.value)) {
          setFirstName(e.target.value);
          setErrorFirstName('');
        } else {
          setFirstName(null);
          setErrorFirstName('שם פרטי יכול להכיל אותיות באנגלית או בעברית בלבד.');
        }
        break;
      case 'lastName':
        if (/^[\u0590-\u05FFa-zA-Z\s]*$/.test(e.target.value)) {
          setLastName(e.target.value);
          setErrorLastName('');
        } else {
          setLastName(null);
          setErrorLastName('שם משפחה יכול להכיל אותיות באנגלית או בעברית בלבד.');
        }
        break;
      case 'username':
        if (/^[a-zA-Z0-9!@#$%^&*()-_=+`~{}\[\]|;:'",.<>/?\\]*$/.test(e.target.value) && e.target.value.length <= 60) {
          setUsername(e.target.value);
          setErrorUsername('');
        } else {
          setUsername(null);
          setErrorUsername('שם המשתמש יכול להכיל אותיות לועזיות, מספרים ותווים בלבד. אורך הטקסט לא יעלה על 60 תווים.');
        }
        break;
      case 'password':
        if (/^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()]{7,12}$/.test(e.target.value)) {
          setPassword(e.target.value);
          setErrorPassword('');
        } else {
          setPassword(null);
          setErrorPassword('הסיסמא צריכה להכיל 7-12 תווים, ולפחות תו אחד מיוחד, אות גדולה אחת ומספר אחד.');
        }
        break;
      case 'passwordValidation':
        if (e.target.value == password) {
          setPasswordValidation(e.target.value);
          setErrorPasswordValidation('');
        } else {
          setPasswordValidation(null);
          setErrorPasswordValidation('יש להזין סיסמא זהה לסיסמא שבחרת.');
        }
        break;
      case 'birthdate':
        const birthDate = new Date(e.target.value)
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
        const file = e.target.files[0];
        if (file && file.type && file.type.startsWith('image/') && /\.(jpg|jpeg)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target.result;
            setImage(imageUrl);
            setErrorImage('')
          };
          reader.readAsDataURL(file);
        }
        else {
          setImage(null);
          setErrorImage('יש לבחור קובץ מסוג תמונה בלבד, קבצי jpeg או jpg.')
        }
        break;
      case 'street':
        if (/^[\u0590-\u05FF\s]+$/.test(e.target.value)) {
          setStreet(e.target.value);
          setErrorStreet('');
        } else {
          setStreet(null);
          setErrorStreet('יש להזין אותיות בעברית בלבד.');
        }
        break;
      case 'streetNumber':
        if (e.target.value >= 0) {
          setStreetNumber(e.target.value);
          setErrorStreetNumber('')
        }
        else {
          setStreetNumber(null);
          setErrorStreetNumber('מספר הרחוב לא יכול להיות שלילי.')
        }
        break;
      default:
        break;
    }
  }

  const handleCitySelect = (value) => {
    if (value === null) {
      setCity(null);
      setErrorCity('יש לבחור עיר מהרשימה.');
    }
    else {
      setCity(value);
      setErrorCity('');
    }
  }

  return (
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
          marginTop: "35px",
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add shadow
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          עדכון פרטים
        </Typography>
        <Box component="form" sx={{ mt: 3 }} >
          <Grid container spacing={2} >
            <Grid item xs={6} >
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                type="text"
                defaultValue={user.firstName || ""}
              />
              <p style={{ color: "red" }}>{errorFirstName}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                type="text"
                defaultValue={user.lastName || ""}
              />
              <p style={{ color: "red" }}>{errorLastName}</p>
            </Grid>
            <Grid item xs={6} >
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="username"
                label="שם משתמש"
                type="text"
                defaultValue={user.username || ""}
              />
              <p style={{ color: "red" }}>{errorUsername}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={(e) => fieldChange(e)}
                fullWidth
                label="כתובת מייל"
                autoComplete="user-email"
                id="email"
                type="email"
                disabled
                value={user.email}
              />
              <p style={{ color: "red" }}>{errorEmail}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="password"
                autoComplete="new-password"
                label="סיסמא"
                type="password"
                defaultValue={user.password || ""}
              />
              <p style={{ color: "red" }}>{errorPassword}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="passwordValidation"
                autoComplete="new-password"
                label="אימות סיסמא"
                type="password"
                defaultValue={user.password || ""}
              />
              <p style={{ color: "red" }}>{errorPasswordValidation}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="birthdate"
                type="date"
                defaultValue={user.birthdate || ""}
              />
              <p style={{ color: "red" }}>{errorBirthdate}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                id="image"
                type="file"
              />
              <p style={{ color: "red" }}>{errorImage}</p>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                onChange={(event, value) => handleCitySelect(value)}
                required
                id="city"
                options={cities}
                defaultValue={user.city || ""}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="עיר" required />}
              />
              <p style={{ color: "red" }}>{errorCity}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                label="רחוב"
                id="street"
                type="text"
                defaultValue={user.street || ""}
              />
              <p style={{ color: "red" }}>{errorStreet}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={(e) => fieldChange(e)}
                required
                fullWidth
                label="מספר"
                type="number"
                id="streetNumber"
                defaultValue={user.streetNumber || ""}
              />
              <p style={{ color: "red" }}>{errorStreetNumber}</p>
            </Grid>
          </Grid>
          <Button
            onClick={editDetails}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            עדכון
          </Button>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Box>
      </Box>
    </Container>
  )
}

export default EditDetails
