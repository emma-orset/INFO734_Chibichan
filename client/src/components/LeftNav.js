import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
    return(
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <Link exact to="/"  activeClassName="active-left-nav">
                        <img src="./images/icons/home.svg" alt="home"/>
                    </Link>
                    <br/>
                    <Link exact to="/profil"  activeClassName="active-left-nav">
                        <img src="./images/icons/member.svg" alt="member"/>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default LeftNav;
