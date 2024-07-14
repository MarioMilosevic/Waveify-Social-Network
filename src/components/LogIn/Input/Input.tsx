import styles from "./Input.module.css";
const Input = ({ title, placeholder }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <input type="text" placeholder={placeholder}/>
    </div>
  );
};

export default Input;
