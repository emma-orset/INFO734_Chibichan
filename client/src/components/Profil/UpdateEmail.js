import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../actions/memberActions";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [updateEmailForm, setUpdateEmailForm] = useState(false);
  const memberData = useSelector((state) => state.memberReducer);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateEmail(email, memberData._id));

    setUpdateEmailForm(false);
  };

  return (
    <div className="bio-update">
      <h3>Email</h3>
      {updateEmailForm === false && (
        <>
          <p onClick={() => setUpdateEmailForm(!updateEmailForm)}>
            {memberData.email}
          </p>
          <button onClick={() => setUpdateEmailForm(!updateEmailForm)}>
            Modifier email
          </button>
        </>
      )}
      {updateEmailForm && (
        <>
          <textarea
            type="text"
            defaultValue={memberData.email}
            onChange={(e) => setEmail(e.target.value)}
          ></textarea>

          <button onClick={handleUpdate}>Valider modification</button>
        </>
      )}
    </div>
  );
};

export default UpdateEmail;
