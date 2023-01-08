import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/commentActions";
import { getPatterns } from "../../actions/patternActions";
import { dateParser, isEmpty } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import LikeButton from "./LikeButton";

const Comments = ({ pattern }) => {
  const commentsData = useSelector((state) => state.commentReducer);
  const membersData = useSelector((state) => state.membersReducer);
  const memberData = useSelector((state) => state.memberReducer);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  // const [pictureFiles, setPictureFiles] = useState([]);

  // const date = new Date();

  // const handlePictures = (e) => {
  //   setPictureFiles(e.target.files);
  // };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(pattern._id, memberData._id, text))
        .then(() => {
          dispatch(getComments()).then(() => {
            dispatch(getPatterns());
          });
        })
        .then(() => {
          setText("");
        });
    } else {
      alert("Entrez un commentaire");
    }
  };

  return (
    <div className="comments-container">
      {!isEmpty(commentsData) &&
        commentsData.map((comment) => {
          if (pattern.comments.includes(comment._id)) {
            return (
              <div
                className={
                  memberData._id === comment.writer
                    ? "comment-container client"
                    : "comment-container"
                }
                key={comment._id}
              >
                <div className="head">
                  <div className="left-part">
                    <img
                      src={
                        !isEmpty(membersData[0]) &&
                        membersData
                          .map((member) => {
                            if (member._id === comment.writer)
                              return `./uploads/memberPicture/${member.picture}`;
                            else return null;
                          })
                          .join("")
                      }
                      alt="membre"
                    />
                  </div>

                  <div className="right-part">
                    <div className="comment-header">
                      <div className="pseudo">
                        <h3>
                          {!isEmpty(membersData[0]) &&
                            membersData
                              .map((member) => {
                                if (member._id === comment.writer) {
                                  return member.pseudo;
                                } else return null;
                              })
                              .join("")}
                        </h3>
                      </div>
                      <span>{dateParser(comment.createdAt)}</span>
                    </div>

                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
                {/* <div className="comment-pictures">
                  {!isEmpty(comment.pictures) &&
                    comment.pictures.map((picture) => {
                      const path = `./uploads/commentPicture/${picture}`;

                      return <img key={picture} src={path} alt={picture} />;
                    })}
                </div> */}
                <div className="end-comment">
                  {!isEmpty(memberData._id) &&
                    (comment.writer === memberData._id ||
                      memberData.admin) && (
                      <EditDeleteComment comment={comment} pattern={pattern} />
                    )}
                  {!isEmpty(memberData._id) &&
                    comment.writer !== memberData._id && (
                      <LikeButton comment={comment} member={memberData} />
                    )}
                </div>
              </div>
            );
          }
        })}

      {!isEmpty(memberData._id) && (
        <div className="comment-form">
          <textarea
            name="text"
            id="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <div className="file">
            {/* <img src="./images/icons/picture.svg" alt="comment" />
            <input
              type="file"
              id="pictures"
              name="pictures"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePictures(e)}
              multiple
            /> */}
            <button className="send-button" onClick={handleAddComment}>
              Envoyer
            </button>
          </div>
        </div>
      )}

      {isEmpty(memberData._id) && (
        <p className="connect-to-add-comment">
          Connectez-vous pour ajouter un commentaire
        </p>
      )}
    </div>
  );
};

export default Comments;
