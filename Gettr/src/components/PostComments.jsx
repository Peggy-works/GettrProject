import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CommentIcon from '@mui/icons-material/Comment';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { Delete } from '@mui/icons-material';
import { ThemeProvider, Tooltip, createTheme} from '@mui/material';
import { addComment, deleteComment} from '../api/PostingsApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
  commentArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

export default function PostComments({post}) {

  const [open, setOpen] = React.useState(false);  // hook for tracking if comment page is opened or not

  const[comments, setComments] = React.useState([]);  // hook for holding all comments for a given post
  const[commentValue, setCommentValue] = React.useState("");  // hook for holding current comment value in the textbox

  React.useEffect(()=>{
    // initial grab of all post comments
    setComments([]);
    for(let i = 0; i < post.usernames.length; i++){
      comments.push({
        comment: post.comments[i],
        username: post.usernames[i],
        userId: post.userIds[i],
        commentId: post.commentIds[i]
      });
    }
    setComments(comments);
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValue =(event)=>{
    const {value} = event.target;
    setCommentValue(value);
  }

  const sendComment =async()=>{
    if(commentValue != ""){
      
      let cId = await addComment(post.id,commentValue);
      comments.push({
        comment:commentValue,
        username:JSON.parse(localStorage.getItem('user')).username,
        userId:JSON.parse(localStorage.getItem('user')).id,
        commentId: cId.data
      });
      setComments(comments);
      setCommentValue("");
    }
  }

const removeComment =async(index)=>{
  const id = comments[comments.length-1-index].commentId;                // the comment to be deleted
  await deleteComment(comments[comments.length-1-index].commentId); // deletes from database
  const newArr = [];                                                // new array for comments use state
  for(let i = 0; i < comments.length; i++){
    if(comments[i].commentId != id){
      newArr.push(comments[i]);
    }
  }
  setComments(newArr);
}

  return (
    <div>
      <ThemeProvider theme = {theme}>

      <Tooltip title="Comments">
        <IconButton onClick={handleClickOpen}>
          <CommentIcon/>
        </IconButton>
      </Tooltip>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Comments
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>

        <Grid item xs={9}>
        { comments.length !== 0 &&
          

          
          <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={theme.commentArea}>
          {
          comments.map((comment,index,arr)=>(
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                    fontWeight={'bold'}
                  >
                    {arr[arr.length-1-index].username}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {arr[arr.length-1-index].comment}
                  </Typography>
                </React.Fragment>
              }
            />
            { arr[arr.length-1-index].userId === JSON.parse(localStorage.getItem('user')).id &&
            <div>
            <Tooltip title="Delete">
                <IconButton onClick={()=>{removeComment(index)}}>
                    <Delete/>
                </IconButton>
            </Tooltip>
            </div>
            }
            </ListItem>
          ))
          }
          <Divider />
          </List>
        }

        </Grid>

          <Grid container style={{padding: '10px'}}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Leave a comment" fullWidth name = 'message' value={commentValue} onChange={handleValue}/>
            </Grid>
            <Grid item xs={1} align="right">
              <Fab color="primary" aria-label="add" ><SendIcon onClick = {()=>{sendComment()}}/></Fab>
            </Grid>
          </Grid>
      </Dialog>

      </ThemeProvider>
    </div>
  );

}