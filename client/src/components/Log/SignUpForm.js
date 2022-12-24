import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const terms = document.querySelector("#terms");
    const pseudoError = document.querySelector("#pseudoError");
    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");
    const passwordConfirmError = document.querySelector(
      "#passwordConfirmError"
    );
    const termsError = document.querySelector("#termsError");

    passwordConfirmError.textContent = "";
    termsError.textContent = "";

    if (password !== controlPassword) {
      passwordConfirmError.textContent =
        "Les mots de passe ne correspondent pas";
    } else if (!terms.checked) {
      termsError.textContent = "Veuillez valider les conditions générales";
    }
    else{
      await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/member/signUp`,
      withCredentials: true,
      data: {
        email,
        pseudo,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          pseudoError.textContent = res.data.errors.pseudo;
          emailError.textContent = res.data.errors.email;
          passwordError.textContent = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <br />
          <h4 className="success">
            Enregistrement réussi, vous pouvez vous connecter
          </h4>
        </>
      ) : (
        <>
          <form action="" onSubmit={handleSignUp} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div id="pseudoError" className="pseudo error"></div>

            <br />

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

            <label htmlFor="password-conf">Confirmer le Mot de Passe</label>
            <br />
            <input
              type="password"
              name="password"
              id="password-conf"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div
              id="passwordConfirmError"
              className="password-confirm error"
            ></div>

            <br />

            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J'accepte les{" "}
              <a href="/" target="_blank" rel="noopener noreferer">
                conditions générales
              </a>
            </label>
            <div id="termsError" className="terms error"></div>

            <br />

            <input type="submit" value="S'inscrire" />
          </form>
        </>
      )}
    </>
  );
};

export default SignUpForm;
