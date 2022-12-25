import React, { useState } from "react";
import { useSelector } from "react-redux";
import LikeHandler from "./LikeHandler";

const LikesPopup = () => {
  const memberData = useSelector((state) => state.memberReducer);
  const patternsData = useSelector((state) => state.patternsReducer);
  const [likesPopup, setLikesPopup] = useState(false)

  return (
    <>
      <h5 onClick={() => setLikesPopup(true)}>Patrons favoris : {memberData.patternLikes ? memberData.patternLikes.length : "0"}</h5>
      {likesPopup && (
        <div className="popup-profil-container">
        <div className="modal">
            <h3>Patrons favoris</h3>
            <span className="cross" onClick={() => setLikesPopup(false)}>&#10005;</span>
            <ul>
                {patternsData.map((pattern) => {
                    for (let i = 0; i < memberData.patternLikes.length; i++){
                        if (pattern._id === memberData.patternLikes[i]) {
                            const picture = `./uploads/patternPicture/${pattern.picture}`;
                            return (
                                <li key={pattern._id}>
                                    <img src={picture} alt="patron"/>
                                    <h4>{pattern.title}</h4>
                                    <div className="like-handler">
                                        <LikeHandler idPattern={pattern._id}/>
                                    </div>
                                    
                                </li>
                            )
                        }
                    }
                })}
            </ul>
        </div>
      </div>
      )
      
      }
      
    </>
  );
};

export default LikesPopup;
