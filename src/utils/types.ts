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
  full_name: string;
  picture: string;
  username: string;
  posts:PostType[]
}

export type PostType = {
  audio: null;
  comments: number;
  created_at: string;
  image: string;
  liked: boolean;
  likes: number;
  post_id: string;
  text: string;
  user: {
    full_name: string;
    picture: string;
    username: string;
  },
  user_id:string
}

