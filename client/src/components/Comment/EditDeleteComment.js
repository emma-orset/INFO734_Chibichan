import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  editComment,
  getComments,
} from "../../actions/commentActions";
import { getPattern, getPatterns } from "../../actions/patternActions";
import { MidContext } from "../AppContext";

const EditDeleteComment = ({ comment }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editComment(comment._id, text));
    setText("");
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment._id))
    dispatch(getComments())
    dispatch(getPattern(comment.idPattern))
  };
  return (
    <>
      <div>
        {edit && (
          <form action="" onSubmit={handleEdit} className="edit-comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
            />
            <br />
            <input type="submit" value="Valider Modification" />
          </form>
        )}

        {!edit && (
          <img
            onClick={() => {
              setEdit(!edit);
            }}
            src="./images/icons/edit.svg"
            alt="editer"
          />
        )}
      </div>

      <div
        onClick={() => {
          if (window.confirm(`Voulez-vous supprimer ce commentaire ?`)) {
            handleDelete();
          }
        }}
      >
        <img src="./images/icons/trash.svg" alt="poubelle" />
      </div>
    </>
  );
};

export default EditDeleteComment;
