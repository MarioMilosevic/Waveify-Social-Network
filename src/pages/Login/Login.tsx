import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticationSchema, FormValues } from "../../utils/zod";
import { useState, useEffect } from "react";
import { fetchData } from "../../utils/api";
import { useNavigate } from "react-router";
import { useUserSlice } from "../../hooks/useUserSlice";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png"
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import styles from "./LogIn.module.css";
import { showToast } from "../../utils/toasts";

const LogIn = () => {
  const { user } = useUserSlice();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      navigate("/home");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authenticationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetchData("login", "POST", {
        email: data.email,
        password: data.password,
      });
      if (response) {
        localStorage.setItem("jwt", response.token);
        navigate("/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };

  const updateCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setUser({
        ...user,
        [name]: value,
      })
    );
    if (value === "") setLoginError("");
  };
  const logInAsTestUser = async () => {
    try {
      const testCredentials = {
        email: "malesija.nemanja@gmail.com",
        password: "He5r4dOVdy9x6IT",
      };
      await onSubmit(testCredentials);
    } catch (error) {
      showToast("Error logging in", "error");
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
          value={user.email || ""}
          changeHandler={updateCredentials}
          zod={{ ...register("email") }}
        />
        <Input
          placeholder="Enter your password here"
          title="Password"
          type="password"
          value={user.password || ""}
          changeHandler={updateCredentials}
          zod={{ ...register("password") }}
        />
        {loginError && <div className={styles.error}>{loginError}</div>}
        <Button
          text="Confirm"
          isActive={isValid}
          clickHandler={handleSubmit(onSubmit)}
        />
        <Button
          text="Log in as test user"
          isActive={true}
          clickHandler={logInAsTestUser}
        />
      </form>
    </div>
  );
};

export default LogIn;
