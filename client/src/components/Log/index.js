import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = ( props ) => {
  const [signUpModal, setSignUpModal] = useState(props.signUp);
  const [signInModal, setSignInModal] = useState(props.signIn);

  const handleModals = (e) => {
    if (e.target.id === "signUp") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "signIn") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="signUp"
            className={signUpModal ? "active-btn" : null}
          >
            S'incrire
          </li>
          <li
            onClick={handleModals}
            id="signIn"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
