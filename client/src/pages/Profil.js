import React, { useContext } from "react";
import Log from "../components/Log";
import { MidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const mid = useContext(MidContext)
  return (

    <div className="profil-page">
      {mid ? (
        <UpdateProfil/>
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
