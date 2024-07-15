// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { authenticationSchema, FormValues } from "../../utils/zod";
// import { useState } from "react";
// import logo from "../../assets/logo.png";
// import styles from "./LogIn.module.css";
// import Input from "../Input/Input";
// import Button from "../Button/Button";
// import { initialUserState } from "../../utils/constants";
// import { UserType } from "../../utils/types";

// const LogIn = () => {
//   const [user, setUser] = useState<UserType>(initialUserState);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       email: user.email,
//       password: user.password,
//     },
//     resolver: zodResolver(authenticationSchema),
//   });

//   const watchEmail = watch('email')
//   const watchPassword = watch("password")

//   console.log(watchEmail)

//   const onSubmit = async (data: FormValues) => {
//     console.log(data)
//     try {
//       if (
//         user.email === "mariomilosevic888@gmail.com" &&
//         user.password === "123456789"
//       )
//         console.log("tacno");
//     } catch (error) {
//       console.log("netacno");
//       console.log(errors)
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <img src={logo} alt={logo} className={styles.logo} />
//       <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           placeholder={"Enter your email here"}
//           title={"Email"}
//           type={"text"}
//           value={watchEmail}
//           changeHandler={(e) =>
//             setUser((prev) => ({
//               ...prev,
//               email: e.target.value,
//             }))
//           }
//           zod={{
//             ...register("email", {
//               required: {
//                 value: true,
//                 // message:""
//               },
//             }),
//           }}
//         />
//         <Input
//           placeholder={"Enter your password here"}
//           title={"Password"}
//           type={"password"}
//           value={watchPassword}
//           changeHandler={(e) =>
//             setUser((prev) => ({
//               ...prev,
//               password: e.target.value,
//             }))
//           }
//           zod={{
//             ...register("password", {
//               required: {
//                 value: true,
//               },
//             }),
//           }}
//         />

//         <Button text="Confirm" />
//       </form>
//     </div>
//   );
// };

// export default LogIn;

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      password: user.password,
    },
    resolver: zodResolver(authenticationSchema),
  });

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      if (
        data.email === "mariomilosevic888@gmail.com" &&
        data.password === "123456789"
      ) {
        console.log("Login successful");
      } else {
        console.log("Invalid credentials");
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
          value={watchEmail}
          changeHandler={(e) =>
            setUser((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          zod={{
            ...register("email", {
              required: "Email is required",
            }),
          }}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
        <Input
          placeholder="Enter your password here"
          title="Password"
          type="password"
          value={watchPassword}
          changeHandler={(e) =>
            setUser((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          zod={{
            ...register("password", {
              required: "Password is required",
            }),
          }}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}

        <Button text="Confirm" />
      </form>
    </div>
  );
};

export default LogIn;
