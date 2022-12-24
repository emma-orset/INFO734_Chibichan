import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const SignOut = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const signOut = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/member/signOut`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/"
  };

  return (
    <li onClick={signOut}>
      <img src="./images/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default SignOut;
