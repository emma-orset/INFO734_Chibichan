import React, { useState } from "react";
import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UpdatePicture from "./UpdatePicture";
import UpdateBio from "./UpdateBio";
import UpdatePseudo from "./UpdatePseudo";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import DeletePicture from "./DeletePicture";
import { dateParser } from "../Utils";
import LikesPopup from "./LikesPopup";

const UpdateProfil = () => {
  const memberData = useSelector((state) => state.memberReducer);
  const image = `./uploads/memberPicture/${memberData.picture}`;
  

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {memberData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={image} alt="member" />
          <DeletePicture/>
          <br/>
          <br/>
          <UpdatePicture />
          <h4>Membre depuis le : {dateParser(memberData.createdAt)}</h4>
          <LikesPopup />
          
        </div>
        <div className="right-part">
          <UpdatePseudo />
          <br/>
          <br/>
          <br/>
          <UpdateBio />
          <br/>
          <br/>
          <br/>
          <UpdateEmail />
          <br/>
          <br/>
          <br/>
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
