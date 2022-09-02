import { useEffect, useState } from "react";
import Choice from "./Choice";
import styles from "./Question.module.css"
import { questionsActions } from "../../store/reducers/questionsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Question({questionItem,questionIndex}) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //will have 3 Values to detrmine if question not answered yet "NO" , or answered correctly "CORRECT" or answered wrong "WRONG"
    const [isQuestionAnswered,setIsQuestionAnswered]=useState('NO'); 
    const [disableChoiceBtn,setDisableChoiceButton]=useState(false)
    const [dynamicOpacity,setDynamicOpacity]=useState('0')
    const choices=['noun','adverb','verb','adjective']
    const HandleAnsweringQuestion=(isAnswerCorrect)=>
    {
        //if Answer is correct we will incremant result
        if(isAnswerCorrect=='CORRECT') dispatch(questionsActions.increamentResult())
        //when answering last question we will navigate to ranking screen
        if(questionIndex>=9)
        {
            //reset current question Indext and result in case this is rerun of the test
            dispatch(questionsActions.resetCurrentQuestionIndex())
            dispatch(questionsActions.loadQuestions([]))
            setDynamicOpacity(1)
            navigate('/rank')
        }
        //when answering question we will go to the next question 
        else 
        {       
            dispatch(questionsActions.increamentCurrentQuestionIndex())
            setDynamicOpacity(1)
            //reset isQuestionAnswered when get to the next question
            setIsQuestionAnswered("NO")
        }
        let timer=setTimeout(()=>setDisableChoiceButton(false),1000)
        return ()=>clearTimeout(timer);
    }
    useEffect(()=>
    {
        
        //when question answered we will give user  0.5 second to see feedback if he answered right or wrong then we will call the HandleAnsweringQuestion function
        if(isQuestionAnswered!='NO')
            {
                setDynamicOpacity(0)
                setDisableChoiceButton(true);
                let timer = setTimeout(() => {HandleAnsweringQuestion(isQuestionAnswered)
                    }, 1000);
                    return () => clearTimeout(timer);
                
            }
        setDynamicOpacity(1)
    },[isQuestionAnswered])
    // callback function to set weather question answered or not from inside the Choice Component
    const setQuestionAnswered=(value)=>
    {
        setIsQuestionAnswered(value)
    }
    return (
      <div style={{opacity:`${dynamicOpacity}`}} className={styles.Question}>
            <p className={styles.QuestionHead}>{`Which Part of Speech this word is considered : '${questionItem.word}' ?`}</p>
            {
                choices.map((choice)=>
                    <Choice 
                        key={choice}
                        choiceWord={choice} 
                        isQuestionAnswered={isQuestionAnswered} 
                        rightAnswer={questionItem.pos}
                        setQuestionAnswered={setQuestionAnswered}
                        disableChoiceBtn={disableChoiceBtn}
                    />
                )
            }
            
            {
                isQuestionAnswered=='WRONG' &&
                <p className={`${styles.Feedback} ${styles.Wrong}`}>Wrong Answer !</p>
            }
            {
                isQuestionAnswered=='CORRECT' &&
                <p className={`${styles.Feedback} ${styles.Correct}`}>Correct Answer Keep going!</p>
            }

      </div>
    );
  }
  
  export default Question;
  