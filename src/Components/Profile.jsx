import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

export default function Profile(props) {

    const { firstName, lastName, email, city, street, streetNumber, image, birthDate } = props.loggedUser;

    const logoutUser = () => {
        props.logout(email)
    }
    const editUserDetails = () => {
        props.showEdit()
    }
    const redirectToGame = () => {
        window.open('https://poki.com/il/g/subway-surfers',"_blank");
    };

    return (
        <Container component="main" maxWidth="md" dir="rtl">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Card sx={{ maxWidth: 345 }} dir="rtl">
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {firstName} {lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {email} <br /> {street} {streetNumber}, {city} <br /> {birthDate}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={editUserDetails}>עדכון פרטים</Button>
                        <Button size="small" onClick={redirectToGame}>למשחק</Button>
                        <Button size="small" onClick={logoutUser}>התנתק</Button>
                    </CardActions>
                </Card>
            </Box>
        </Container >
    );
}