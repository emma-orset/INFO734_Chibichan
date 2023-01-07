import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MidContext } from "./AppContext";
import { isEmpty } from "./Utils";

const LeftNav = () => {
  const mid = useContext(MidContext);

  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          {/* activeClassName="active-left-nav" */}
          <Link exact="true" to="/">
            <img src="./images/icons/home.svg" alt="home" />
          </Link>
          <br />
          {!isEmpty(mid) && (
            <>
              <Link exact="true" to="/patternLikes">
                <img src="./images/icons/heart.svg" alt="patternLikes" />
              </Link>
              <br />
            </>
          )}
          <Link exact="true" to="/profil">
            <img src="./images/icons/member.svg" alt="member" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
