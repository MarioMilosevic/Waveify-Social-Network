import marioPicture from "../assets/mariomilosevic.jpg";
import { UserType } from "./types";

export const updateUser = (user: UserType) => {
  return {
    ...user,
    full_name: "Mario Milosevic",
    picture: marioPicture,
  };
};

export const formatDate = (date: string) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  return formattedDate;
};

export const formatTime =  (timeInSeconds: number): string => {
  const minutes =  Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
