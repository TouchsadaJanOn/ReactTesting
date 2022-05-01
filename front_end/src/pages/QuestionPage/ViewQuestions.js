import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";
import './ViewQuestion.css'

export default function ViewQuestions(){

    const [questions, setQuestions] = useState([]);
    const [update, setUpdate] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetch('http://localhost:9001/users/viewQuestion')  
          .then(res => res.json())
          .then(data => setQuestions(data))
      }, [update])

      const question_vote = (id, votes) =>{

        var newVotes = votes == null ? 1 : votes + 1;

        var updatequestion = {'id': id, 'votes': newVotes}
        
        fetch('http://localhost:9001/users/viewQuestion', 
            {
                method:'PATCH', 
                body: JSON.stringify(updatequestion),
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                }
            })  
          .then(res => res.json())
          .then(setUpdate(update + 1))
          .then(console.log("Vote count completed"))
    }

    const submitComment = (questionID) =>{
        var id = uuidv4();
        var qID = questionID;
        var addComment = {
            'id': id, 
            'qID': qID, 
            'comment': comment
        }

        fetch('http://localhost:9001/comment/question_comment', 
            {
                method:'POST', 
                body: JSON.stringify(addComment),
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                }
            })  
          .then(res => res.json())
          .then(data => console.log(data))
      }

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
                            <div class="accordion-item">
                                    {questions.map(q =>
                                    <div class="accordion-item">
                                        <div className='title-color' key={q.id}>{q.asker == null ? "Unknown":q.asker}</div>
                                            <div className="question-style" key={q.id}>{q.question}</div>
                                            <button className="btn bg-danger font-weight-bold text-white text-center m-4" value="Vote" onClick={() => question_vote(q.id, q.votes)}>Votes Count: {q.votes == null ? "0":q.votes}</button>
                                            <div>
                                                <form className='form-style'>
                                                    <textarea value={comment} className="textarea-style2" onChange={(e)=>setComment(e.target.value)}></textarea>
                                                    <button value="Submit A Comment" className="btn btn-success m-3 " onClick={() => submitComment(q.id)}>Submit A Comment</button>
                                                </form>
                                        </div>
                                  </div>)}
                                  </div>
                      </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}