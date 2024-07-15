import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticationSchema, FormValues } from "../../utils/zod";
import { useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./LogIn.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { initialUserState } from "../../utils/constants";
import { UserType } from "../../utils/types";

const LogIn = () => {
  const [user, setUser] = useState<UserType>(initialUserState);
  const [loginError, setLoginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      password: user.password,
    },
    resolver: zodResolver(authenticationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      if (data.email === "mariomilosevic887@gmail.com") {
        console.log("tacan email");
      } else {
        console.log("Email nije dobar");
        setLoginError("Email nije dobar");
      }
      if (data.password === "123456789") {
        console.log("tacan pasvord");
      } else {
        console.log("Pasvord nije dobar");
        setLoginError("Pasvord nije dobar");
      }
    } catch (error) {
      console.log("An error occurred during login");
      console.log(errors);
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter your email here"
          title="Email"
          type="text"
          value={user.email}
          changeHandler={(e) =>
            setUser((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          zod={{ ...register("email") }}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <Input
          placeholder="Enter your password here"
          title="Password"
          type="password"
          value={user.password}
          changeHandler={(e) =>
            setUser((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          zod={{ ...register("password") }}
        />
        {errors.password && <span>{errors.password.message}</span>}
        {loginError && <div className={styles.error}>{loginError}</div>}

        <Button text="Confirm" />
      </form>
    </div>
  );
};

export default LogIn;
