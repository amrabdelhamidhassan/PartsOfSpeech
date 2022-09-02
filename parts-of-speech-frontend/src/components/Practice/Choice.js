import { useEffect, useState } from "react";
import styles from "./Choice.module.css"

function Choice({choiceWord,isQuestionAnswered,rightAnswer,disableChoiceBtn,setQuestionAnswered=()=>{}}) {
    
    //dynamic styling for wrong and correct choices
    const [ChoiceHeadStyle,setChoiceHeadStyle]=useState(`${styles.ChoiceHead}`)
    const AnswerQuestionHandler=(e)=>
    {
        //if still question not answered check if answered correctly or wrong and set styling of choice and questionanswered state
        if(isQuestionAnswered=='NO' && !disableChoiceBtn)
        {                
            if(rightAnswer==choiceWord) 
                {
                    setQuestionAnswered('CORRECT')
                    setChoiceHeadStyle((previousState)=>`${previousState} ${styles.rightSelected}`)
                }
            else 
                {  
                    setQuestionAnswered('WRONG')
                    setChoiceHeadStyle((previousState)=>`${previousState} ${styles.wrongSelected}`)

                }

        }
    }
    useEffect(()=>
    {
        //to handle when get to the next question to remove correct or wrong choice styling
        if(isQuestionAnswered=='NO')
        {
            setChoiceHeadStyle(`${styles.ChoiceHead}`)
        }
    },[isQuestionAnswered])
    return (
      <div className={styles.Choice}>
            <p  className={ChoiceHeadStyle} onClick={AnswerQuestionHandler}>{choiceWord} </p>
      </div>
    );
  }
  
  export default Choice;
  