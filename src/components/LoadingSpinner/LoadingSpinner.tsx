import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ size }:{size:string}) => {
  console.log(size)
  const height = size === "big" ? "100vh" : size === "normal" ? "100%" : 0;


  return (
    <div className={styles.container} style={{ minHeight: height }}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingSpinner;
