import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../actions/memberActions";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [updatePasswordForm, setUpdatePasswordForm] = useState(false);
  const memberData = useSelector((state) => state.memberReducer);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePassword(password, memberData._id));

    setUpdatePasswordForm(false);
  };

  return (
    <div className="bio-update">
      <h3>Mot de passe</h3>
      {updatePasswordForm === false && (
        <>
          <p onClick={() => setUpdatePasswordForm(!updatePasswordForm)}>
            *********
          </p>
          <button onClick={() => setUpdatePasswordForm(!updatePasswordForm)}>
            Modifier mot de passe
          </button>
        </>
      )}
      {updatePasswordForm && (
        <>
          <input
            type="password"
            defaultValue={memberData.password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button onClick={handleUpdate}>Valider modification</button>
        </>
      )}
    </div>
  );
};

export default UpdatePassword;
