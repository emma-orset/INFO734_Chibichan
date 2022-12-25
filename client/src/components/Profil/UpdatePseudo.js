import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePseudo } from "../../actions/memberActions";

const UpdatePseudo = () => {
  const [pseudo, setPseudo] = useState("");
  const [updatePseudoForm, setUpdatePseudoForm] = useState(false);
  const memberData = useSelector((state) => state.memberReducer);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePseudo(pseudo, memberData._id));

    setUpdatePseudoForm(false);
  };

  return (
    <div className="bio-update">
      <h3>Pseudo</h3>
      {updatePseudoForm === false && (
        <>
          <p onClick={() => setUpdatePseudoForm(!updatePseudoForm)}>
            {memberData.pseudo}
          </p>
          <button onClick={() => setUpdatePseudoForm(!updatePseudoForm)}>
            Modifier pseudo
          </button>
        </>
      )}
      {updatePseudoForm && (
        <>
          <textarea
            type="text"
            defaultValue={memberData.pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          ></textarea>

          <button onClick={handleUpdate}>Valider modification</button>
        </>
      )}
    </div>
  );
};

export default UpdatePseudo;
