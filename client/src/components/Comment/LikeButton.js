import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likeComment, unlikeComment } from "../../actions/commentActions";
import { isEmpty } from "../Utils";

const LikeButton = ({ comment, member }) => {
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const like = () => {
    dispatch(likeComment(comment._id, member._id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikeComment(comment._id, member._id));
    setLiked(false);
  };

  useEffect(() => {
    if (comment.likers.includes(member._id)) setLiked(true);
    else setLiked(false);
  }, [member._id, comment.likers, liked]);

  return (
    <div className="like-container">
      {isEmpty(member._id) && (
        <Popup
          trigger={<img src="./images/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer ce commentaire !</div>
        </Popup>
      )}
      {member._id && liked === false && (
        <img src="./images/icons/heart.svg" alt="like" onClick={like} />
      )}

      {member._id && liked === true && (
        <img
          src="./images/icons/heart-filled.svg"
          alt="unlike"
          onClick={unlike}
        />
      )}
      <span>{comment.likers.length ?? 0}</span>
    </div>
  );
};

export default LikeButton;
