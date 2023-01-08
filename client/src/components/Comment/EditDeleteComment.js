import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/commentActions";
import { getPatterns } from "../../actions/patternActions";

const EditDeleteComment = ({ comment, pattern }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editComment(comment._id, text));
    setText("");
    setEdit(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteComment(comment._id, pattern._id));
    dispatch(getPatterns());
  };

  const handleCancel = () => {
    setText("")
    setEdit(false);
  };

  return (
    <>
      <div class="edit">
        {edit && (
          <>
            <textarea
              type="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
            ></textarea>
            <div class="comment-button">
              <button onClick={handleCancel}>Annuler</button>
              <button onClick={handleEdit}>Valider</button>
            </div>
          </>
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
        class="delete-comment"
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
