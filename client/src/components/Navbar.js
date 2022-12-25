import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";

import { MidContext } from "./AppContext";
import SignOut from "./Log/SignOut";

const Navbar = () => {
  const mid = useContext(MidContext);

  const memberData = useSelector((state) => state.memberReducer)

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
        
            <Link exact="true" to="/">
            <div className="logo">
              <img src="./images/icon.png" alt="icon" />
              <h3>Chibichan</h3>
              </div>
            </Link>
          
        </div>
        {mid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <Link exact="true" to="/profil">
                <h5>Bienvenue {memberData.pseudo}</h5>
              </Link>
            </li>
            <SignOut />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <Link exact="true" to="/profil">
                <img src="./images/icons/login.svg" alt="login" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
