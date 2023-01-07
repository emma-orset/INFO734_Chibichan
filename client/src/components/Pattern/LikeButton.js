import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePattern, unlikePattern } from "../../actions/patternActions";
import { isEmpty } from "../Utils";

const LikeButton = ({ pattern, member }) => {
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePattern(pattern._id, member._id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePattern(pattern._id, member._id));
    setLiked(false);
  };

  useEffect(() => {
    if (pattern.likers.includes(member._id)) setLiked(true);
    else setLiked(false);
  }, [member._id, pattern.likers, liked]);

  return (
    <div className="like-container">
      {isEmpty(member._id) && (
        <Popup
          trigger={<img src="./images/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour mettre un patron en favori !</div>
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
      <span>{pattern?.likers.length}</span>
    </div>
  );
};

export default LikeButton;
