import styles from "./RankScreen.module.css"
import { getRankApi } from "../services/api";
import { questionsActions } from "../store/reducers/questionsReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Loading from "../components/UI/Loading";
function RankScreen() {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [isLoading,setIsLoading]=useState(false)
  const [isError,setIsError]=useState(false)
  //get questions,result  from store
  const questions=useSelector(state=>state.questionsReducer.questions)
  const result=useSelector(state=>state.questionsReducer.result)
  //initialize rank 
  const [rank,setRank]=useState(0);
  const getRank=async()=>
  {
    setIsLoading(true)
    setIsError(false)
    let timer
    //calculate score and sent it to the rank api and then get the rank and set it in the state
    try
    {
      let score=result/10*100
      const response=await getRankApi(score);
      timer = setTimeout(() => {setIsLoading(false)
      }, 500);
      setRank(response.data);
      return () => clearTimeout(timer);
    }
    catch
    {
        
        timer = setTimeout(() => {setIsError(true)
        }, 500);
        return () => clearTimeout(timer);
    }
  }
  const TryAgainHandler=()=>
  {
    // we will reset the questions index and the questions array and the result and then navigate to practice screen again
    dispatch(questionsActions.resetCurrentQuestionIndex())
    dispatch(questionsActions.loadQuestions([]))
    dispatch(questionsActions.resetResult())
    navigate('/practice')
  }
  useEffect(()=>
  {
    //checking if quiz is undergoing so use cannot navigate manually to the rank screen and will re direct back to practice screen until he finsih the quiz
    if(questions.length!=0 &&result==0) navigate('/practice')
    else 
    {
      getRank();
    }
  },[])
    return (
      <div className={styles.RankScreen}>
            {isLoading && !isError && <Loading/>}
            {!isLoading && !isError && <p className={styles.RankText}>{`Your Rank with other students who took the test is ${rank}%`}</p>}
            {rank==100 &&!isLoading && !isError && 
                <p>{`Congratulations you finished at the top !`}</p>
            }
            {rank!=100 &&!isLoading && !isError && 
                <p className={styles.RankText}>{`You Can try again until you get 100% `}</p>
            }
            {rank!=100 &&!isLoading && !isError && 
            <Button name={"Try Again"} onClick={TryAgainHandler}/>
            }
            {!isLoading && isError && 
              <p className={styles.error}>{`Something went wrong refresh the page and try again`}</p>
            }

      </div>
    );
  }
  
  export default RankScreen;
  