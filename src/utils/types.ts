import { UseFormRegisterReturn } from "react-hook-form";
export type InputProps = {
  title: string;
  placeholder: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  zod: UseFormRegisterReturn;
};

export type ButtonProps = {
  text: string;
  isActive:boolean
}

export type UserType = {
    email: string;
    password: string;
}