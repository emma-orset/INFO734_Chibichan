import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { getMember } from "../../actions/memberActions";
import { deletePattern, getPatterns } from "../../actions/patternActions";
import { MidContext } from "../AppContext";

const DeleteCard = ({ pattern }) => {
  const mid = useContext(MidContext);
  const dispatch = useDispatch();
  const deleteQuote = async () => {
    await dispatch(deletePattern(pattern._id));
    dispatch(getPatterns());
    dispatch(getMember(mid));
  };
  return (
    <div
      className="deleteImg"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce patron ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./images/icons/trash.svg" alt="poubelle" />
    </div>
  );
};

export default DeleteCard;
