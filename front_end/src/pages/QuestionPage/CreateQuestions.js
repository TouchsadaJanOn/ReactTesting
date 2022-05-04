import { Button, makeStyles } from '@material-ui/core';
import React , {useState} from 'react';
import './CreateQuestion.css'
import axios from "axios";
import { v4 as uuidv4 } from "uuid";



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      
    },
  }));
export default function CreateQuestions(){
    const classes = useStyles();

  const refresh = () =>{ 
    setTimeout(() => window.location.reload(), 2000);
  }

    const [asker, setAsker] = useState("");
    const [question, setQuestion] = useState("");
    const [QuestionSuccess, setQuestionSuccess] = useState(false);

    const handleOnSubmit = async(event) => {
        event.preventDefault();
        var id = uuidv4();

        const question_data = {
          asker, 
          id,
          question
        };

        try{
            axios.post("http://localhost:9001/users/createQuestion", question_data)
            .then(res=>console.log("Question created"))
            setQuestionSuccess(true);
            
          }catch(e){
            console.log("Question failed to create")
          }
        };

        const setSuccess = () => {
            return (
              <div style={{
                display: QuestionSuccess ? " ":"none",
              }}>
                <p className='success_style'> Question Successfully Submitted!! Please wait!! </p>
              </div>
            );
          };

         
    
    return(
        <div>
            
    <form className={classes.form} onSubmit={handleOnSubmit}>
            <div class = "header">
            <div class = "column-text">
        <h1>
            Ask a Question
            </h1>
            <div class="element">
            <p class='p-style'>
                    Your name
                </p>
                <input class ="name-style" value={asker} onChange = {(e)=>setAsker(e.target.value)} placeholder='Type your name here...'>
                </input>
                <p class='p-style'>
                    Enter your question below
                </p>
                <textarea class ="textarea-style" value={question} onChange = {(e)=>setQuestion(e.target.value)} placeholder='Type your question here...'>
                </textarea>
            <Button
                variant="contained"
                type="submit"
                color="secondary"
                className={classes.button}
                onClick={refresh}
            >
                Send Question
            </Button>
            </div>
            <div>
            {setSuccess()}
            </div>
            </div>
            </div>
            </form>
        </div>
    );
}