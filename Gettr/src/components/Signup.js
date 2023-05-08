import { useEffect, useState, useRef } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
//import Image from './Images/pic.jpg'
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
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
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

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[Ee][Dd][Uu]$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z)(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const theme = createTheme();

export default function SignUp() {

const userRef = useRef();
const errRef = useRef();

const [pwd, setPwd] = useState('');
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setPwdFocus] = useState(false);

const [emailFocus, setEmailFocus]  = useState(false);
const [email,setEmail] = useState("");
const [validEmail, setValidEmail] = useState(false);
const [message, setMessage] = useState("");

const [matchPwd, setMatchPwd] = useState('');
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);

const [errMsg, setErrMsg] = useState('');
const [success, setSuccess] = useState(false);

useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    const result = emailReg.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result)
}, [email])

useEffect(() => {
    const result = passReg.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');
}, [email, pwd, matchPwd])



const emailValidation = (e) => {
    e.preventDefault();

};

const handleOnChange = (e) => {
    setEmail(e.target.value)
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
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
           Join the Community
          </Typography>
          <Typography component = "caption" variant="block">
            Create an Account to get Started
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
           <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
             />
            </Grid>
            <Grid item xs={12} sm={6}>
                  <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
             />
            </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  ref={userRef}
                  autoComplete = "off"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange = {(e) => setEmail(e.target.value)}
                  onFocus = {() => setEmailFocus(true)}
                  onBlur = {() => setEmailFocus(false)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange = {(e) => setPwd(e.target.value)}
                  autoComplete="new-password"
                  onFocus={() => setPwdFocus(true)}
                  onBlue={() => setPwdFocus(false)}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describebedby="confirmnote"
                />
              </Grid>
              <Grid item xs={11}>
              </Grid>
              <Typography component="caption">
                 By clicking Sign Up, you are agreeing to the <Link href="/#" variant="body2"> Terms of Use </Link>and you are acknowledging the <Link href="/#" variant="body2"> Privacy Policy </Link>
              </Typography>
            </Grid>
            <Button
              //button is disabled until valid input of a valid email and valid password
              disabled = {!validEmail || !validPwd ? true : false}
              type="submit"
              fullWidth
              variant="contained"
              onChange = {emailValidation}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}