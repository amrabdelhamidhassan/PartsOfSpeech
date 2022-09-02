import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom";
import logo from "../../imgs/favicon.png"
function Header() {
    const navigate=useNavigate();
    const RefreshHandler=()=>
    {
      navigate('/practice')
    }
    return (
      <div className={styles.Header}>
            <div onClick={RefreshHandler}  className={styles.HeaderTitle}>
              <img  className={styles.Logo} src={logo} alt={`Parts Of Speech`}>
              </img>
            </div>
      </div>
    );
  }
  
  export default Header;
  