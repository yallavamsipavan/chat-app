import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [userid, setUserid] = useState('');
    const [questions, setQuestions] = useState(null);
    const [answers, setAnswers] = useState(['', '', '']);
    const navigate = useNavigate();

    const loadQuestions = async () => {
        const res = await axios.post(`http://localhost:5000/api/users/get-questions`, { userid });
        setQuestions(res.data);
    };

    const verifyAnswers = async () => {
        try {
            await axios.post(`http://localhost:5000/api/users/verify-answers`, {
                userid: questions.userid,
                answers
            });
            localStorage.setItem('resetUserid', questions.userid);
            navigate('/change-password');
        } catch {
            alert('Incorrect answers');
        }
    };

    return (
        <div>
            <input placeholder="User ID" onChange={e => setUserid(e.target.value)} />
            <button onClick={loadQuestions}>Load Questions</button>
            {questions && (
                <div>
                    {[1, 2, 3].map((num, i) => (
                        <div key={i}>
                            <p>{ questions[`question${num}`] }</p>
                            <input placeholder="Answer" onChange={e => {
                                const newAns = [ ...answers ];
                                newAns[i] = e.target.value;
                                setAnswers(newAns);
                            }} />
                        </div>
                    ))}
                    <button onClick={verifyAnswers}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;