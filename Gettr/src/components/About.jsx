import { Box, ThemeProvider, Typography, createTheme, responsiveFontSizes } from '@mui/material'
import React from 'react'

function About() {

  /* Responsive Fonts that Adjust w/Screen Size */
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Box padding={10}>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" fontFamily="Georgia"> 🐾 Need a Helping Hand? </Typography>
        <Typography variant="h6" fontFamily="Georgia" align="justify">
          Gettr is a forum web application exclusively made for CSUSM students and faculty to communicate with one another on their school and/or 
          personal projects outside of school. This forum was created by four Computer Science students at CSUSM who thought it would be a good idea
          to have a platform that bridges the communication gap for our both students and faculty and serves as a place where they can easily discuss 
          what projects they wish to create, but also find others who will aid them in turning those ideas into actual realized projects. To naviage
          the site, a user must first create an account, which will then redirect them to the main dashboard, which is where all the forum posts will
          be displayed. If you wish to join in on the conversation, simply click the message button under the post. You also have the ability to like 
          the post if you desire. To create a post, click on the bottom left corner (or middle on mobile) where the blue plus button is. Clicking it 
          will allow you to create your own post to the forum by specifying the project name and giving a description of what project entails. Unsatisfied 
          with your post? Click the trash can button on the post to delete it from the forum. There is also a messaging tab which allows users to directly 
          message other users and chat with them. All done? Simply click the top right if you wish to logout of your account.
        </Typography>
      </ThemeProvider>
    </Box>
  )
}

export default About