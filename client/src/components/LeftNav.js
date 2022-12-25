import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
    return(
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    {/* activeClassName="active-left-nav" */}
                    <Link exact="true" to="/" >
                        <img src="./images/icons/home.svg" alt="home"/>
                    </Link>
                    <br/>
                    <Link exact="true" to="/profil" >
                        <img src="./images/icons/member.svg" alt="member"/>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default LeftNav;
