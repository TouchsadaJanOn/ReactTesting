import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState(null);
  const [loginSuccess, setloginSuccess] = useState(null);
  const [checkPass, setcheckPass] = useState("");
  const [checkEmail, setcheckEmail] = useState("");

    const handleOnSubmit = (e) => {

      e.preventDefault();

    const user_data = {
      email
    };

      axios.patch('http://localhost:9001/users/login', user_data)
      .then(res=>setcheckEmail(res.data[0].email));

      axios.patch('http://localhost:9001/users/login', user_data)
      .then(res=>setcheckPass(res.data[0].password));

      console.log(checkEmail, checkPass);

      if(email === checkEmail && password === checkPass){
        //add forum here
        setloginSuccess(true);
        setloginError(false);
      }
      else{
        setloginSuccess(false);
        setloginError(true);
      }
      
    
  };

  const setError = () => {
    return (
      <div style={{
        display: loginError ? " ":"none",
      }}>
        <p className='error_style'> Wrong Email or Password </p>
      </div>
    );
  };
  const setSuccess = () => {
    return (
      <div style={{
        display: loginSuccess ? " ":"none",
      }}>
        <p className='success_style'> You are in the Database </p>
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
          Sign in
        </Typography>

        <div>

          {setSuccess()}
          {setError()}
            
          </div>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}