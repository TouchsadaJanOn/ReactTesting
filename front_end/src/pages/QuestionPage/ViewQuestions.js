import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import './ViewQuestion.css'

export default function ViewQuestions(){

    const [questions, setQuestions] = useState([]);
    const [update, setUpdate] = useState(0);
    const [comment, setComment] = useState("");
    const [showComment, setshowComment] = useState("");

    useEffect(() => {
        fetch('http://localhost:9001/users/viewQuestion')  
          .then(res => res.json())
          .then(data => setQuestions(data))
      }, [update])


      const question_vote = (id, votes) =>{

        var newVotes = votes == null ? 1 : votes + 1;

        console.log(newVotes);

        var updatequestion = {
            'id': id, 
            'votes': newVotes
        }

        axios.patch('http://localhost:9001/users/viewQuestion', updatequestion
        ).then(console.log("axios testing"))
        .then(setUpdate(update + 1))

        
    }

    const submitComment = (questionID) =>{
        var id = uuidv4();
        var qID = questionID;
        var addComment = {
            'id': id, 
            'qID': qID, 
            'comment': comment
        }

          axios.post('http://localhost:9001/comment/responses', addComment
        ).then(console.log("axios testing"))

        


      }
      
      axios.get('http://localhost:9001/comment/responses')
        .then((response) => {setshowComment(response.data[0].comment);});
      

      

    return(
        <div>
            <div class = "header">
                <div class = "column-text">
                    <h1>
                        View All Questions
                        </h1>
                    <div class="element">
                            <div className="card bg-primary">
                                <div className="card-body">
                                        {questions.map(q =>
                                        <div class="accordion-item">
                                            <div className='title-color' key={q.id}>{q.asker == null ? "Unknown":q.asker}</div>
                                                <div className="question-style" key={q.id}>{q.question}</div>
                                                    <p className="m-3 font-weight-bold text-danger ">Likes: {q.votes == null ? "0":q.votes} </p>
                                                    <button className="btn bg-danger font-weight-bold text-white text-center m-4" value="Vote" onClick={() => question_vote(q.id, q.votes)}> Double Click to Like</button> 
                                                        <div className='container'>
                                                            <form className='form-style'>
                                                                <textarea 
                                                                className="textarea-style2 form-control form-control-lg" 
                                                                onChange={(e)=>setComment(e.target.value)}></textarea>
                                                                <button value="Submit A Comment" className="btn btn-success m-3 " onClick={() => submitComment(q.id)}>Submit A Comment</button>
                                                            </form>
                                                        </div>
                                                            <p className='comment-style'>Comments: </p>
                                                            <p className='border m-3 p-2'>  {showComment} </p> 
                                                            <p className='border m-3 p-2 text-danger'> Please check the database for further comment analysis</p> 
                                        </div>)}
                                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}