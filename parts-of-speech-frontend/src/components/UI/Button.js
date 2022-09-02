import styles from "./Button.module.css"
function Button(props) {
    return (
      <button style={props.style} onClick={props.onClick}type={props.type}className={styles.Button}>
            {props.name}
      </button>
    );
  }
  
  export default Button;
  