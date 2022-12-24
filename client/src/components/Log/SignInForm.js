import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");

     await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/member/signIn`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.textContent = res.data.errors.email;
          passwordError.textContent = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleSignIn} id="sign-in-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div id="emailError" className="email error"></div>
      <br />

      <label htmlFor="password">Mot de Passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div id="passwordError" className="password error"></div>

      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
