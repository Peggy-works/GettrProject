import React from 'react';
import ResponsiveAppBar from './Nav'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'

const About =()=> {
    return(
        <>
        <ResponsiveAppBar/>
<Box
          sx={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <Typography component="h1" variant="h4">
            About GETTR
         </Typography>
          <Typography component="subtitle1">
            <p>
            Gettr is a web forum app to help facilitate project collaboration between students and faculty at different universities.
            <br/>
            Developed by "THE ELITE 4", our team strives to make quality software that bridges the communication gap
            <br/>
            for our clients and serves as a place where they can easily discuss what projects they wish to create,
            <br/>
            but also find others who will aid them in turning those ideas into actual projects.

            </p>
          </Typography>
         </Box>
         </>);
}

export default About;