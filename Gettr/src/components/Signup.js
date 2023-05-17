import { useEffect, useState, useRef } from 'react';
import { signupFields } from "../constants/formFields"
import Input from "./Input";
import * as React from 'react';
import { register } from '../api/AuthApi.js'
import PasswordMeter from "./PasswordMeter";
import { useNavigate } from 'react-router-dom'; 

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
import TungstenOutlinedIcon from '@mui/icons-material/TungstenOutlined';


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

const navigate = useNavigate();

const userRef = useRef();
const errRef = useRef();

const [user, setUser] = useState('');
const [userFocus, setUserFocus] = useState(false);

const [fName, setFName] = useState('');
const [lName, setLName] = useState('');
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


  const [pwdInput, initValue] = useState({
    password: "",
  });

const [isError, setError] = useState(null);
const [success, setSuccess] = useState(false);

useEffect(() => {
    userRef.current.focus();
}, [])

//Validate email to see if it ends in .edu
useEffect(() => {
    const result = emailReg.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result)
}, [email])

//Validate the password with requirements: Length 8, 1 lowercase, 1 lowercase, 1 symbol
 const onChange = (e) => {
    let password = e.target.value;
    setPwd(e.target.value);
    initValue({
      ...pwdInput,
      password: e.target.value,
    });
    setError(null);
    setValidPwd(true);
    let caps, small, num, specialSymbol;
    if (password.length < 4) {
      setError(
        "Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &"
      );
      return;
      setValidPwd(false);
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        setError("Must add one UPPERCASE letter");
        setValidPwd(false);
        return;

      } else if (small < 1) {
        setError("Must add one lowercase letter");
        setValidPwd(false);
        return;
      } else if (num < 1) {
        setError("Must add one number");
        setValidPwd(false);
        return;
      } else if (specialSymbol < 1) {
        setError("Must add one special symbol: @$! % * ? &");
        setValidPwd(false);
        return;
      }
    }
  };

  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };

//Send data from form
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
    }); 
    //API call to AuthApi.js
    register(data.get('username'), data.get('password'), data.get('firstName') + data.get('lastName'))
         .then(response => {console.log(response.data.token); navigate("/");})
         .catch(error => console.log(error));


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
          <TungstenOutlinedIcon sx={{ m: 1, size: "large" }}/>
          
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
                  onChange = {(e) => setFName(e.target.value)}
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
                  onChange = {(e) => setLName(e.target.value)}
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
                  name="username"
                  label="Username"
                  id="username"
                  onChange = {(e) => setUser(e.target.value)}
                  autoComplete="username"
                  onFocus={() => setUserFocus(true)}
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
                  onChange={onChange}
                  autoComplete="new-password"
                  onFocus={() => setPwdFocus(true)}
                  onBlue={() => setPwdFocus(false)}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describebedby="confirmnote"
                />

              </Grid>
              {isError !== null && <p className="errors"> - {isError}</p>}
              <PasswordMeter password={pwdInput.password} actions={initPwdInput} />
              <Grid item xs={11}>
              </Grid>
              <Typography component="caption">
                 By clicking Sign Up, you are agreeing to the <Link href="/#" variant="body2"> Terms of Use </Link>and you are acknowledging the <Link href="/#" variant="body2"> Privacy Policy </Link>
              </Typography>
            </Grid>
            <Button
              //button is disabled until valid input of a valid email and valid password
              disabled = {!validEmail || !validPwd  ? true : false}
              type="submit"
              fullWidth
              variant="contained"
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