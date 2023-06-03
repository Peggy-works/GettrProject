import { Box, Button, Fab, Modal, TextField, Tooltip, Typography, styled } from '@mui/material'
import { Add as AddIcon } from "@mui/icons-material"
import { newPost } from '../api/PostingsApi.js';
import React, { useReducer, useState } from 'react'
import { usePostsDispatch } from './PostsContext'

/* Custom Modal Styling (centers popup) */
const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

// Clear Form on Submit + Return Values
const formReducer = (state, event) => {
    if (event.reset) {
        return {
            title: "",
            description: ""
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}


/*  Add Function Contains:
        - Add Button Functionality
        - Form Info (values) + Handles Submission       */
export default function Add() {

    /* useState Hooks for Popup, Form Submission, Form Data, Disable */
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useReducer(formReducer, {})
    const [disable, setDisable] = useState(false)
    const dispatch = usePostsDispatch()

    /*  onSubmit
            - Prevent Browser from Reloading Page
            - Notify User Post is Submit
            - Reset Form + Close Popup
            - Send Data to Local Database      */
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        setDisable(true)

        setTimeout(() => {
            setSubmitting(false)
            setOpen(false)
            setDisable(false)
            setFormData({
                reset: true
            })
        }, 2000)

        //Make Form Object w/Post Info
        const form = e.target
        const formData = new FormData(form)

        // Work with Data as Plain Object
        const formJson = Object.fromEntries(formData.entries())
        console.log(formJson)
        console.log(e.target.title.value);
        newPost(e.target.title.value, e.target.description.value, JSON.parse(localStorage.getItem('user')).username, JSON.parse(localStorage.getItem('user')).token);
        window.location.reload(false);

    }

    /* Pulls Data from event.target + passes object to setFormData */
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    return (
        <>
            <Tooltip onClick={(e) => setOpen(true)}
                title="Add"
                sx={{ position: "fixed", bottom: 20, left: { xs: "calc(50% - 25px)", sm: 30 } }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
            >
                <form
                    method='post'
                    onSubmit={handleSubmit}>
                    <Box width={400} height={250} bgcolor="white" p={3} borderRadius={5}>
                        <Typography variant='h6' color="gray" textAlign="center">
                            Create Post
                        </Typography>

                        <TextField
                            name='title'
                            onChange={handleChange}
                            value={formData.title || ""}

                            sx={{ width: "100%" }}
                            rows={1}
                            placeholder="Project Idea"
                            variant="standard"
                            required
                            disabled={submitting}
                        />

                        <TextField
                            name='description'
                            onChange={handleChange}
                            value={formData.description || ""}

                            sx={{ width: "100%" }}
                            multiline
                            rows={6}
                            placeholder="Description"
                            variant="standard"
                            required
                            disabled={submitting}
                        />

                        <Button

                            onClick={() => {
                                if (formData.title !== undefined && formData.description !== undefined) {
                                    // dispatch({
                                    //     type: 'added',
                                    //     id: formData.id,
                                    //     title: formData.title,
                                    //     description: formData.description,
                                    //     likes: formData.likes,
                                    //     poster_id: formData.poster_id,
                                    //     poster_name: formData.poster_name,
                                    //     usernames: formData.usernames,
                                    //     comments: formData.comments
                                    // })
                                }
                            }}

                            type='submit'
                            disabled={disable}
                            sx={{ left: 160, top: 10 }}>
                            Post
                        </Button>
                    </Box>
                </form>
            </StyledModal>
        </>
    )
}
