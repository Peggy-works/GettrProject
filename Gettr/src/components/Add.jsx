import { Box, Button, Fab, Modal, TextField, Tooltip, Typography, styled } from '@mui/material'
import { Add as AddIcon } from "@mui/icons-material"

import React, { useState } from 'react'

/* Custom Modal Styling (centers modal) */
const StyledModal = styled(Modal) ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
})
 
const Add = () => {

    /* Toggle Add */
    const [open, setOpen] = useState(false)

    return (
        <>
        <Tooltip onClick={(e)=>setOpen(true)}
            title="Add" 
            sx={{ position: "fixed", bottom: 20, left:{xs:"calc(50% - 25px)", sm:30}}}> 
            <Fab color="primary" aria-label="add">
                <AddIcon/>
            </Fab>
        </Tooltip>

        <StyledModal
            open={open}
            onClose={(e)=>setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box width={400} height={250} bgcolor="white" p={3} borderRadius={5}>
            <Typography variant='h6' color="gray" textAlign="center">
                Create Post
            </Typography>

        <TextField
            sx={{width:"100%"}}
            id="standard-multiline-static"
            rows={1}
            placeholder="Project Idea?"
            variant="standard"
        />

        <TextField
            sx={{width:"100%"}}
            id="standard-multiline-static"
            multiline
            rows={6}
            placeholder="Description"
            variant="standard"
        />

        <Button sx={{left:160, top: 10}}> Post</Button>

        </Box>
        </StyledModal>
    </>
  )
}

export default Add