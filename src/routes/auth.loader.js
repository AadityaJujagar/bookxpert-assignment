// 1
import { redirect } from "react-router-dom";

export const authLoader = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    throw redirect("/login");
  }

  return null;
};
