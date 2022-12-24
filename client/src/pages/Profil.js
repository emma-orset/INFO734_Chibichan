import React, { useContext } from "react";
import Log from "../components/Log";
import { MidContext } from "../components/AppContext";

const Profil = () => {
  const mid = useContext(MidContext)
  return (
    <div className="profil-page">
      {mid ? (
        <h1>INFORMATIONS DU MEMBRE</h1>
      ) : (
        <div className="log-container">
        <Log signIn={false} signUp={true}/>
        <div className="img-container">
            <img src="./images/log.svg" alt="Log" />
        </div>
      </div>
      )}
      
    </div>
  );
};

export default Profil;
