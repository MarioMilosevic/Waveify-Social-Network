// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { authenticationSchema, FormValues } from "../../utils/zod";
// import { useState, useEffect } from "react";
// import { initialUserState } from "../../utils/constants";
// import { UserType } from "../../utils/types";
// import { login } from "../../utils/helperFunction";
// import logo from "../../assets/logo.png";
// import styles from "./LogIn.module.css";
// import Input from "../Input/Input";
// import Button from "../Button/Button";

// const LogIn = () => {
//   const [user, setUser] = useState<UserType>(initialUserState);
//   const [loginError, setLoginError] = useState<string>("");
//   const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { isValid },
//     watch,
//     reset,
//   } = useForm<FormValues>({
//     defaultValues: {
//       email: user.email,
//       password: user.password,
//     },
//     resolver: zodResolver(authenticationSchema),
//   });

//   const emailWatch = watch("email");
//   const passwordWatch = watch("password");

//   useEffect(() => {
//     setLoginError("");
//   }, [emailWatch, passwordWatch]);

//   useEffect(() => {
//     setIsButtonActive(isValid);
//   }, [isValid]);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       login(data.email, data.password)
//       // if (data.email !== "mariomilosevic887@gmail.com") {
//       //   setLoginError("Account not found.");
//       //   return;
//       // }
//       // if (data.password !== "123456789") {
//       //   setLoginError("Incorrect password");
//       //   return;
//       // } else {
//       //   setLoginError("");
//       //   reset()
//       // }
//     } catch (error) {
//       setLoginError("An error occurred during login")
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <img src={logo} alt="Logo" className={styles.logo} />
//       <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           placeholder="Enter your email here"
//           title="Email"
//           type="text"
//           value={user.email}
//           changeHandler={(e) =>
//             setUser((prev) => ({
//               ...prev,
//               email: e.target.value,
//             }))
//           }
//           zod={{ ...register("email") }}
//         />
//         <Input
//           placeholder="Enter your password here"
//           title="Password"
//           type="password"
//           value={user.password}
//           changeHandler={(e) =>
//             setUser((prev) => ({
//               ...prev,
//               password: e.target.value,
//             }))
//           }
//           zod={{ ...register("password") }}
//         />
//         {loginError && <div className={styles.error}>{loginError}</div>}

//         <Button text="Confirm" isActive={isButtonActive} />
//       </form>
//     </div>
//   );
// };

// export default LogIn;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticationSchema, FormValues } from "../../utils/zod";
import { useState, useEffect } from "react";
import { initialUserState } from "../../utils/constants";
import { UserType } from "../../utils/types";
import { login } from "../../utils/helperFunction";
import logo from "../../assets/logo.png";
import styles from "./LogIn.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

const LogIn = () => {
  const [user, setUser] = useState<UserType>(initialUserState);
  const [loginError, setLoginError] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      password: user.password,
    },
    resolver: zodResolver(authenticationSchema),
  });

  const emailWatch = watch("email");
  const passwordWatch = watch("password");

  useEffect(() => {
    setLoginError("");
  }, [emailWatch, passwordWatch]);

  useEffect(() => {
    setIsButtonActive(isValid);
  }, [isValid]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login(data.email, data.password);
      // Handle successful login
      console.log("Login successful:", response);
      reset();
    } catch (error) {
      setLoginError(error.message);
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
        {loginError && <div className={styles.error}>{loginError}</div>}

        <Button text="Confirm" isActive={isButtonActive} />
      </form>
    </div>
  );
};

export default LogIn;
