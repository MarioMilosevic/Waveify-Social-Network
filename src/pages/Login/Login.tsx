import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticationSchema, FormValues } from "../../utils/zod";
import { useState } from "react";
import { login, getCurrentUser ,getPosts } from "../../utils/helperFunction";
import { useNavigate } from "react-router";
import { useUserSlice } from "../../hooks/useUserSlice";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import styles from "./LogIn.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import marioPicture from "../../assets/mariomilosevic.jpg";

const LogIn = () => {
  const { user } = useUserSlice();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      password: user.password,
    },
    resolver: zodResolver(authenticationSchema),
  });


  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login(data.email, data.password);
      if (response) {
        localStorage.setItem("jwt", response.token);
        const currentUser = await getCurrentUser();
        const posts = await getPosts()
        console.log(posts)
        const updatedUser = {
          ...currentUser,
          full_name: "Mario Milosevic",
          picture: marioPicture, // username:"MarioMilosevic"
        };
        dispatch(setUser(updatedUser));
        // navigate("/home");
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
        <Button text="Confirm" isActive={isValid} />
        <p>malesija.nemanja@gmail.com</p>
        <p>He5r4dOVdy9x6IT</p>
      </form>
    </div>
  );
};

export default LogIn;
