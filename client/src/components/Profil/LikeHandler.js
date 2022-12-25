import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePattern, unlikePattern } from "../../actions/patternActions";
import { isEmpty } from "../Utils";

const LikeHandler = ({ idPattern }) => {
  const memberData = useSelector((state) => state.memberReducer);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likePattern(memberData._id, idPattern))
    setIsLiked(true)
  };

  const handleUnlike = () => {
    dispatch(unlikePattern(memberData._id, idPattern))
    setIsLiked(false)
  };

  useEffect(() => {
    if (!isEmpty(memberData.patternLikes)) {
      if (memberData.patternLikes.includes(idPattern)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [memberData, idPattern]);

  return (
    <>
      {isLiked && !isEmpty(memberData) && (
        <span onClick={handleUnlike}>
          <button className="unlike-btn">Supprimer des favoris</button>
        </span>
      )}

      {isLiked === false && !isEmpty(memberData) && (
        <span onClick={handleLike}>
          <button className="like-btn">Mettre en favori</button>
        </span>
      )}
    </>
  );
};

export default LikeHandler;
