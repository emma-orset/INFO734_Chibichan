import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePicture } from "../../actions/memberActions";

const DeletePicture = () => {
  const memberData = useSelector((state) => state.memberReducer);

  const dispatch = useDispatch();

  const handlePicture = (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append("deletePicture", "yes");
    data.append("memberId", memberData._id);

    dispatch(deletePicture(data, memberData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      
      <br />
      <input type="submit" value="Supprimer la photo" />
    </form>
  );
};

export default DeletePicture;
