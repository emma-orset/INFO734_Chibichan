import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpdatePicture from "./UpdatePicture";
import UpdateBio from "./UpdateBio";
import UpdatePseudo from "./UpdatePseudo";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import DeletePicture from "./DeletePicture";
import { dateParser } from "../Utils";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

const UpdateProfil = () => {
  const memberData = useSelector((state) => state.memberReducer);
  const image = `./uploads/memberPicture/${memberData.picture}`;

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const handleDelete = async () => {
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
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {memberData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={image} alt="member" />
          <DeletePicture />
          <br />
          <br />
          <UpdatePicture />
          <h4>Membre depuis le : {dateParser(memberData.createdAt)}</h4>
          <Link exact="true" to="/patternLikes">
            <h5>
              Patrons favoris :{" "}
              {memberData.patternLikes ? memberData.patternLikes.length : "0"}
            </h5>
          </Link>
        </div>
        <div className="right-part">
          <UpdatePseudo />
          <br />
          <br />
          <br />
          <UpdateBio />
          <br />
          <br />
          <br />
          <UpdateEmail />
          <br />
          <br />
          <br />
          <UpdatePassword />
          <br />
          <br />
          <br />

          <div className="bio-update">
            <button
              onClick={() => {
                if (window.confirm(`Etes-vous sûr de vouloir supprimer votre profil ?`)) {
                  handleDelete();
                }
              }}
            >
              Supprimer Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
