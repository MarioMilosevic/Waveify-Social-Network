import marioPicture from "../assets/mariomilosevic.jpg";
import { UserType } from "./types";

export const updateUser = (user: UserType) => {
  return {
    ...user,
    full_name: "Mario Milosevic",
    picture: marioPicture,
    // username: "mario_milosevic",
  };
};

export const formatDate = (date: string) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  return formattedDate;
};
