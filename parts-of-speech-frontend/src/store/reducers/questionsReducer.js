import { createSlice } from '@reduxjs/toolkit'
const initialState=
{
    questions:[], //store all questions after fetching from backend
    result:0,   //store current result of the quiz 
    currentQuestionIndex:0, //store current question of the quiz 
    numberOfQuestions:0 //store number of questions of the quiz
}
const questionsSlice=createSlice(
    {
        name:'questions',
        initialState,
        reducers:
        {
            //store all questions after fetching from backend
            loadQuestions(state,action) 
            {
                state.questions=action.payload
                state.numberOfQuestions=action.payload.length

            },
            //increase result by 1 when answering right question
            increamentResult(state) 
            {
                state.result+=1;
            },
            //move to next question
            increamentCurrentQuestionIndex(state)
            {
                state.currentQuestionIndex+=1;
            },
            //reset result when starting quiz again
            resetResult(state)
            {
                state.result=0;
            },
            //start from 1st question when starting quiz again
            resetCurrentQuestionIndex(state)
            {
                state.currentQuestionIndex=0;
            }
        }
    }
)

export const questionsActions=questionsSlice.actions;
export default questionsSlice.reducer