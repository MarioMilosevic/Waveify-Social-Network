import React, { ReactNode } from "react";
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


export type UserState = {
  user: UserType;
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

export type PostsState = {
  posts: PostType[];
};

export type CommentActionPayload = {
  postId: string;
  action: "increment" | "decrement";
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

export type ButtonWrapperProps = {
  children:ReactNode
}

export type LikeButtonProps = {
  likes: number;
  liked: boolean;
  onClick: () => void;
}

export type CommentButtonProps = {
  onClick: () => void;
  comments: number;
}

export type ModalProps = {
  closeModal: () => void;
  children:ReactNode
}

export type LogOutProps = {
  logOut: () => void
}

export type PostInfoProps = {
  children?: ReactNode;
  text: string;
  image: string;
}

export type AudioPlayerProps = {
  audio: string | null;
  isRecording: boolean;
  newPostAudioHandler:(newAudio:string) => void
}

export type AudioVisualiserProps = {
  startRecording:() => void
}

export type NewPostDetails = {
  audio: string | null;
  text: string;
}