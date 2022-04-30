import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import "./login.css"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [RegisterSuccess, setRegisterSuccess] = useState(false);


  const handleOnSubmit = async(event) => {
    event.preventDefault();
    const user_data = {
      name, 
      email,
      password
    };

    try{
      axios.post("http://localhost:9001/users/register", user_data)
      .then(res=>console.log("user created"))
      setRegisterSuccess(true);
      
    }catch(e){
      const message = e.response.data.message;
      if (message === "user email exists"){
        setEmailError("User email already exists");
      }
    }
  };

  const setSuccess = () => {
    return (
      <div style={{
        display: RegisterSuccess ? " ":"none",
      }}>
        <p className='success_style'> Register Process Successful </p>
      </div>
    );
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <div>
          {setSuccess()}
        </div>

        <form className={classes.form} onSubmit={handleOnSubmit}>
          <TextField
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            autoFocus
          />
          <TextField
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            error = {!!emailError}
            helperText={emailError}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}