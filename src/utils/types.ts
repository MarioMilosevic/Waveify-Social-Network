import { ReactNode } from "react";
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
  isActive: boolean;
};

export type UserType = {
  email: string;
  password: string;
  full_name: string;
  picture: string;
  username: string;
  posts: PostType[];
};

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
  };
  user_id: string;
};

export type PostProps = {
  post:PostType
}

export type CommentType = {
  comment_id: string;
  created_at: string;
  full_name: string;
  picture: string;
  text: string;
  username: string;
};

export type CommentProps = {
  comment: CommentType;
  postId: string;
  removeUserCommentHandler:(commentId:string) => void
};

export type PostButtonProps = {
  likes: number;
  comments: number;
  liked: boolean;
  likeHandler: () => void;
  commentHandler:() => void
};

export type PostResponseType = {
  post: PostType;
  comments: CommentType[];
};

export type UserHeaderProps = {
  user: { picture: string; full_name: string; username: string };
  formattedDate: string;
};

export type SinglePostProps = {
  postId: string;
}

export type DeleteButtonProps = {
  removeHandler:() => void
}

export type PostsProps = {
  children:ReactNode
}

export type MainContainerProps = {
  children:ReactNode
}

// export type ModalProps = {
//   modalHandler:() => void
// }