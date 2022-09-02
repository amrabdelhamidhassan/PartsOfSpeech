import { useSelector } from "react-redux";
import styles from "./ProgressBar.module.css"

function ProgressBar({questionIndex}) {
    let numberOfQuestions=useSelector(state=>state.questionsReducer.numberOfQuestions)
    // calculating width depending on the number of questions answered until now 
    let dynamicWidth=Math.round(questionIndex/10*100);
    return (
      <div className={styles.ProgressBar}>
            <div className={styles.ProgressBarBox}>
                <div style={{width:`${dynamicWidth}%`}} className={styles.Highlighted}>
                    <span className={styles.percentageSpan}>{`${Math.round(questionIndex/10*100)}%`}</span>
                </div>
            </div>
            <p className={styles.ProgressBarLabel}>{`${questionIndex} out of ${numberOfQuestions} questions Answered`}</p>
      </div>
    );
  }
  
  export default ProgressBar;
  