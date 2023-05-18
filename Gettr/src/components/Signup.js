import { useEffect, useState, useRef } from 'react';
import * as React from 'react';
import Popup from './Popup'
import Avatar from '@mui/material/Avatar';
import { register } from '../api/AuthApi.js'
import PasswordMeter from "./PasswordMeter";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
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

//Regex to set valid names
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[Ee][Dd][Uu]$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z)(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const userReg = /^[a-zA-Z][a-zA-Z0-9]{4,24}$/

const theme = createTheme();

export default function SignUp() {

const navigate = useNavigate();

const userRef = useRef();
const errRef = useRef();

//To set the username
const [user, setUser] = useState('');
const [userFocus, setUserFocus] = useState(false);
//To set t
const [validUser, setValidUser] = useState(false);

const [fName, setFName] = useState('');
const [lName, setLName] = useState('');
const [pwd, setPwd] = useState('');
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setPwdFocus] = useState(false);

const [emailFocus, setEmailFocus]  = useState(false);
const [email,setEmail] = useState("");
const [validEmail, setValidEmail] = useState(false);
const [message, setMessage] = useState("");

//For the popup button
const [isOpenTerms, setIsOpenTerms] = useState(false);

const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);

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

const togglePopup = () => {
    setIsOpenTerms(!isOpenTerms);
}

const togglePopup2 = () => {
    setIsOpenPrivacy(!isOpenPrivacy);
}

//Validate email to see if it ends in .edu
useEffect(() => {
    const result = emailReg.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result)
}, [email])


//Validate username to make sure it's in
useEffect(() => {
    const result = userReg.test(user);
    console.log(result);
    console.log(user)
    setValidUser(result)
}, [user])

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
         .then(response => {console.log(response.data.token); navigate("/#");})
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
                 By clicking Sign Up, you are agreeing to the
                 {" "}
                  <input
                    type = "button"
                    value = "Terms and Conditions"
                    onClick = {togglePopup}
                  />
                 {" "}
                    and you are acknowledging the
                 {" "}
                 <input
                    type = "button"
                    value = "Privacy Policy"
                    onClick = {togglePopup2}
                 />
              </Typography>

              {isOpenTerms &&  <Popup
                content = {<>
                          <h2 style={{textAlign: "center"}}>Terms and Conditions</h2>
                           <p>
                           Welcome to Gettr. Before using our platform, please read the following terms and conditions carefully. By using our website, you agree to these terms and conditions.
                           </p>
                           <p>
                           <br/>
                           1. User Conduct: You must use our forum in a responsible and respectful manner. Do not post any content that is defamatory, abusive, obscene, vulgar, or harmful. You must respect the privacy and personal information of others and comply with all applicable laws and regulations.
                           </p>
                           <p>
                           <br/>
                           2. Intellectual Property: You must respect the intellectual property rights of others. Do not post any content that violates the copyright, trademark, or other proprietary rights of any person or entity.
                           </p>
                           <p>
                           <br/>
                           3. User Content: By posting content on our forum, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, modify, distribute, and display your content on our website.
                           </p>
                           <p>
                           <br/>
                           4. Moderation: We reserve the right to moderate the content posted on our forum. We may remove or edit any content that we deem inappropriate or in violation of these terms and conditions. We may also suspend or terminate your access to our forum at any time, for any reason, without prior notice.
                           </p>
                           <p>
                           <br/>
                           5. Disclaimer of Warranties: Our forum is provided "as is" and we make no warranties, express or implied, about the accuracy, reliability, completeness, or timeliness of any information or content posted on our website.
                           </p>
                           <p>
                           <br/>
                           6. Limitation of Liability: We shall not be liable for any damages, including but not limited to, direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our forum.
                           </p>
                           <p>
                           <br/>
                           7. Indemnification: You agree to indemnify and hold us harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of our forum, your violation of these terms and conditions, or your violation of any rights of another person or entity.
                           </p>
                           <p>
                           <br/>
                           8. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which we are based. Any legal action or proceeding arising out of or in connection with these terms and conditions shall be brought in the courts of that jurisdiction.
                           </p>
                           <p>
                           <br/>
                           9. Changes to Terms and Conditions: We reserve the right to modify these terms and conditions at any time. Your continued use of our forum after any such changes shall constitute your acceptance of the modified terms and conditions.
                           </p>
                           <p>
                           <br/>
                           10. Entire Agreement: These terms and conditions constitute the entire agreement between you and us regarding your use of our forum, and supersede all prior agreements and understandings, whether written or oral.
                           </p>
                        </>}
                handleClose = {togglePopup}
              />}

              {isOpenPrivacy && <Popup
                content = {<>
                        <h2 style={{textAlign: "center"}}>Privacy Policy</h2>
                        <p>
                            Gettr  is committed to protecting the privacy of our users, including students and faculty members. This privacy policy explains how we collect, use, and protect your personal information when you use our website.
                        </p>
                        <p>
                        <br/>
                        <b>   Information We Collect: </b>
                        </p>
                        <p>
                           When you register for our forum posting website, we collect personal information such as your name, email address, and university affiliation. We also collect information about your posts, comments, and other contributions to the website.
                        </p>
                        <p>
                           We may also collect information about your device and internet connection, including your IP address, browser type, and operating system.
                        </p>
                        <p>
                        <br/>
                        <b>   How We Use Your Information: </b>
                        </p>
                        <p>
                           We use your personal information to identify you as a user of our website, to provide you with access to our forums, and to communicate with you about your account and our services.


                           We may also use your information to analyze user behavior and improve our website and services. We will not share your personal information with third parties for marketing purposes.
                        </p>
                        <p>
                        <br/>
                          <b> Data Security: </b>
                        </p>
                           We take appropriate measures to protect your personal information from unauthorized access, disclosure, or alteration. We use industry-standard security technologies and procedures to safeguard your information.

                           However, no data transmission over the internet can be guaranteed to be 100% secure. Therefore, while we strive to protect your personal information, we cannot guarantee the security of any information you transmit to us.
                        <p>
                        <br/>
                           <b>Cookies:</b>
                        </p>
                           We use cookies on our website to improve your user experience. Cookies are small text files that are placed on your device by a website. We use cookies to remember your preferences, to analyze user behavior, and to provide personalized content and ads.

                           You can control the use of cookies through your browser settings. However, if you disable cookies, some features of our website may not function properly.
                        <p>
                        <br/>
                          <b> Third-Party Links: </b>
                        </p>
                           Our website may contain links to third-party websites that are not under our control. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of these websites before using them.
                        <p>
                        <br/>
                          <b> Changes to This Policy: </b>
                        </p>
                           We reserve the right to modify this privacy policy at any time. We will notify you of any significant changes by posting a notice on our website or by sending you an email.
                        <p>
                        <br/>
                           <b> Contact Us: </b>
                        </p>
                           If you have any questions or concerns about our privacy policy or our use of your personal information, please contact us at 678-999-8212
                </>}
                handleClose = {togglePopup2}
              />}
            </Grid>
            <Button
              //button is disabled until valid input of a valid email and valid password
              disabled = {!validEmail || !validPwd || !validUser ? true : false}
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