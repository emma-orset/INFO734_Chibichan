import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePicture } from "../../actions/memberActions";

const UpdatePicture = () => {
  const [picture, setPicture] = useState();
  const dispatch = useDispatch();
  const memberData = useSelector((state) => state.memberReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("pseudo", memberData.pseudo);
    data.append("memberId", memberData._id);
    data.append("picture", picture);

    dispatch(updatePicture(data, memberData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="picture">Changer la photo</label>
      <input
        type="file"
        id="picture"
        name="picture"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      
      <br />
      <input type="submit" value="Valider la nouvelle photo" />
    </form>
  );
};

export default UpdatePicture;
