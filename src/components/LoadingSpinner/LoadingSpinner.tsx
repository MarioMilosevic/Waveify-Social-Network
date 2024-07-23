import styles from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
   <div className={styles.container}>
    <span className={styles.loader}></span>;
   </div> 
  )
};

export default LoadingSpinner;
