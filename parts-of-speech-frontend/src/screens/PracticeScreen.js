import styles from "./PracticeScreen.module.css"
import Introduction from "../components/Practice/Introduction";
import ProgressBar from "../components/Practice/ProgressBar";
import { questionsActions } from "../store/reducers/questionsReducer";
import Button from "../components/UI/Button";
import { getWordsApi } from "../services/api";
import { useDispatch, useSelector } from "react-redux";

import Question from "../components/Practice/Question";
import { useEffect, useState } from "react";
import Loading from "../components/UI/Loading";
function PracticeScreen() {
    const dispatch=useDispatch()
    //get all questions and current question Index from store
    const [isLoading,setIsLoading]=useState(false)
    const [isError,setIsError]=useState(false)
    const questions=useSelector(state=>state.questionsReducer.questions)
    const currentQuestionIndex=useSelector(state=>state.questionsReducer.currentQuestionIndex)
    const StartQuizHandler=async()=>
    {
        //get words from backend and save them in the store 
        setIsLoading(true)
        setIsError(false)
        let timer 
        try{
            const response=await getWordsApi();
            timer= setTimeout(() => {setIsLoading(false)
                }, 500);
        
            dispatch(questionsActions.loadQuestions(response.data))
            //reset current question Index and result in case this is rerun of the test
            dispatch(questionsActions.resetCurrentQuestionIndex())
            dispatch(questionsActions.resetResult());
            return () => clearTimeout(timer);
        }
        catch
        {
            
            timer = setTimeout(() => {setIsError(true)
            }, 500);
            return () => clearTimeout(timer);
        }
    }
    //Intro  when no questions is loaded yet with the start Quiz Button 
 if(questions.length==0)
        return(
            <div className={styles.PracticeScreen}>
                {isLoading && <Loading/>}
                {!isLoading && <Introduction/>}
                {!isLoading && <Button onClick={StartQuizHandler}name={"Start Quiz"}/>}
                {isError &&<p className={styles.error}>Something Went wrong please try again later</p>}
            </div>
        )
    else 
    //Question View when start Quiz is clicked until quiz is finished 
        return (
        <div className={styles.PracticeScreen}>
            {isLoading && <Loading/>}
            {!isLoading &&<Question questionIndex={currentQuestionIndex}questionItem={questions[currentQuestionIndex]}/>}
            {!isLoading &&<ProgressBar questionIndex={currentQuestionIndex}/>}
        </div>
        )
  }
  
export default PracticeScreen;
  