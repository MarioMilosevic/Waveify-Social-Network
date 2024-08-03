import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ size }:{size:string}) => {
  console.log(size)
  const mario = size === "big" ? "100vh" : "100%";

  return (
    <div className={styles.container} style={{ minHeight: mario }}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingSpinner;
