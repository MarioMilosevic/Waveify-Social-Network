import styles from "./Input.module.css";
import { InputProps } from "../../utils/types";
const Input = ({
  title,
  placeholder,
  value,
  changeHandler,
  type,
  zod,
}: InputProps) => {
  const { onChange: zodOnChange, ...restZodProps } = zod;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(e);
    if (zodOnChange) {
      zodOnChange(e);
    }
  };

  return (
    <div className={styles.container}>
      {title && <p>{title}</p>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...restZodProps}
      />
    </div>
  );
};

export default Input;
