import { useState, useRef, useEffect } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import ReCAPTCHA from "react-google-recaptcha"
import { authenticate } from '../api/AuthApi.js'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles';

function Copyright(props){
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.csusm.edu/">
        Gettr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(){

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErrorMsg('');
    }, [username, password])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(username, password)
        authenticate(username, password)
            .then(response => {
                console.log(response.data);
                //localStorage.setItem('token', response.data.token);
                localStorage.setItem('user',JSON.stringify(response.data));
                console.log(JSON.parse(localStorage.getItem('user')).id);
            })
            .catch(error => {
                console.log(error);
            })
        setUsername('');
        setPassword('');
        setSuccess(true);
    }





    return(
      <div>
      <ThemeProvider theme={theme}>
           <Container component="main" maxWidth="xs">
             <CssBaseline />

             <Box
               sx={{
                 marginTop: 8,
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',


               }}
             >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

               </Avatar>
               <Typography component="h1" variant="h4">
                 Welcome Back to Gettr
               </Typography>
               <Typography component = "caption" variant="block">
                 Sign in to Continue
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                 <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="username"
                   label="Username"
                   name="username"
                   autoComplete="email"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   autoFocus
                 />
                 <TextField
                   margin="normal"
                   required
                   fullWidth
                   name="password"
                   label="Password"
                   type="password"
                   id="password"
                   autoComplete="current-password"
                   value = {password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
                 <FormControlLabel
                   control={<Checkbox value="remember" color="primary" />}
                   label="Remember me"
                 />
                 <ReCAPTCHA sitekey={"6LftRrUlAAAAAK0KXzALnJC4vo4gjbC3cP7azEwp"} />
                 <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                   Sign In
                 </Button>
                 <Grid container>
                   <Grid item xs>
                     <Link href="/forgot-password" variant="body2">
                       Forgot password?
                     </Link>
                   </Grid>
                   <Grid item>
                     <Link href="/signup" variant="body2">
                       {"Don't have an account? Sign Up"}
                     </Link>
                   </Grid>
                 </Grid>
               </Box>
             </Box>
           </Container>
         <Copyright sx={{ mt: 8, mb: 4 }} />
         </ThemeProvider>
         </div>
    )
}