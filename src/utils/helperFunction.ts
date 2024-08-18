import marioPicture from "../assets/images/mariomilosevic.jpg"
import { CommentType, PostType, UserType } from "./types";

export const updateUser = (user: UserType) => {
  return {
    ...user,
    full_name: "Mario Milosevic",
    picture: marioPicture,
  };
};

export const updateUserFromComment = (comment: CommentType) => {
  return {
    ...comment,
    full_name: "Mario Milosevic",
    picture: marioPicture,
  };
};

export const updateUserFromPost = (post: PostType) => {
  return {
    ...post,
    user: {
      ...post.user,
      full_name: "Mario Milosevic",
      picture: marioPicture,
    },
  };
};

export const formatDate = (date: string) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  return formattedDate;
};

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
