import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/memberActions";

const UpdateBio = () => {
  const [bio, setBio] = useState("");
  const [updateBioForm, setUpdateBioForm] = useState(false);
  const memberData = useSelector((state) => state.memberReducer);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(bio, memberData._id));

    setUpdateBioForm(false);
  };

  return (
    <div className="bio-update">
      <h3>Bio</h3>
      {updateBioForm === false && (
        <>
          <p onClick={() => setUpdateBioForm(!updateBioForm)}>
            {memberData.bio}
          </p>
          <button onClick={() => setUpdateBioForm(!updateBioForm)}>
            Modifier bio
          </button>
        </>
      )}
      {updateBioForm && (
        <>
          <textarea
            type="text"
            defaultValue={memberData.bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <button onClick={handleUpdate}>Valider modification</button>
        </>
      )}
    </div>
  );
};

export default UpdateBio;
