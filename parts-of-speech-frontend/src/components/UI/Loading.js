import styles from "./Loading.module.css"
import { useNavigate } from "react-router-dom";
import logo from "../../imgs/loading.png"
function Loading() {
    return (
      <div>
              <img  className={styles.Logo} src={logo} alt={`Loading`}>
              </img>
      </div>
    );
  }
  
  export default Loading;
  