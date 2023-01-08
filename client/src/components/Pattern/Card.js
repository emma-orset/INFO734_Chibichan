import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { getPatterns, updatePattern } from "../../actions/patternActions";
import DeleteCard from "./DeleteCard";
import Comments from "../Comment/Comments";

const Card = ({ pattern }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const membersData = useSelector((state) => state.membersReducer);
  const memberData = useSelector((state) => state.memberReducer);
  const dispatch = useDispatch();

  const pdfPath = `./uploads/patternPDF/${pattern.pdf}`;
  const wordPath = `./uploads/patternWord/${pattern.word}`;
  const picturePath = `./uploads/patternPicture/${pattern.picture}`;

  const [idCustom, setIdCustom] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPDF] = useState(null);
  const [picture, setPicture] = useState(null);
  const [word, setWord] = useState(null);
  const [pdfFile, setpdfFile] = useState();
  const [wordFile, setWordFile] = useState();
  const [pictureFile, setPictureFile] = useState();
  const [deleteWord, setDeleteWord] = useState("no");

  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setPictureFile(e.target.files[0]);
  };
  const handlePDF = (e) => {
    setPDF(URL.createObjectURL(e.target.files[0]));
    setpdfFile(e.target.files[0]);
  };
  const handleWord = (e) => {
    setWord(URL.createObjectURL(e.target.files[0]));
    setWordFile(e.target.files[0]);
  };

  const handleUpdatePattern = async () => {
    if (!idCustom) {
      setIdCustom(pattern.idCustom);
    }

    if (!title) {
      setTitle(pattern.title);
    }

    if (!tags) {
      setTags(pattern.tags);
    }

    if (!type) {
      setType(pattern.type);
    }

    if (!pdfFile) {
      setpdfFile(pattern.pdf);
    }

    if (!wordFile) {
      setWordFile(pattern.word);
    }

    if (!pictureFile) {
      setPictureFile(pattern.picture);
    }

    const data = new FormData();
    data.append("idCustom", idCustom);
    data.append("title", title);
    data.append("tags", tags);
    data.append("type", type);
    data.append("description", description);
    data.append("deleteWord", deleteWord);
    data.append("pdf", pdfFile);
    data.append("picture", pictureFile);
    data.append("word", wordFile);

    await dispatch(updatePattern(pattern._id, data));
    dispatch(getPatterns());

    handleCancel();
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <li className="card-container" key={pattern?._id}>
      {isLoading && <i className="fas fa-spinner fa-spin"></i>}
      {isLoading === false && isEdit === false && (
        <>
          <div className="card-head">
            <h3>{pattern?.title}</h3>
            {memberData.admin === true && (
              <span onClick={() => setIsEdit(true)}>
                <img alt="edition" src="./images/icons/edit.svg" />
              </span>
            )}
          </div>

          <div className="card-img">
            {!isEmpty(picturePath) && (
              <img src={picturePath} alt="patron" className="image" />
            )}
          </div>

          <div className="card-files">
            <a href={pdfPath} target="_blank" rel="noreferrer">
              <img
                src="./images/icons/pdf.svg"
                alt="pdf-download"
                className="card-pdf"
              />
            </a>

            {!isEmpty(memberData._id) && pattern.word !== "" && (
              <a href={wordPath}>
                <img
                  src="./images/icons/doc.svg"
                  alt="word-download"
                  className="card-word"
                />
              </a>
            )}
          </div>

          <div className="card-footer">
            {!isEmpty(pattern.description) && (
              <div>
                <img
                  onClick={() => {
                    setShowDescription(!showDescription);
                    setShowComments(false);
                  }}
                  src="./images/icons/description.svg"
                  alt="description"
                />
              </div>
            )}

            <div className="comment-icon">
              <img
                onClick={() => {
                  setShowComments(!showComments);
                  setShowDescription(false);
                }}
                src="./images/icons/message1.svg"
                alt="comment"
              />
              <span>{pattern?.comments?.length ?? 0}</span>
            </div>
            {/* <span>{dateParser(pattern.createdAt)}</span> */}

            <div>
              <LikeButton pattern={pattern} member={memberData} />
            </div>
            <img src="./images/icons/share.svg" alt="share" />

            {memberData.admin === true && <DeleteCard pattern={pattern} />}
          </div>

          {showComments && !showDescription && <Comments pattern={pattern} />}

          {showDescription && !showComments && (
            <p className="desc-p">{pattern.description}</p>
          )}
        </>
      )}

      {isLoading === false && isEdit === true && (
        <div className="form-update">
          <label>Modifier l'ID custom</label>
          <textarea
            name="idCustom"
            id="idCustom"
            defaultValue={pattern.idCustom}
            onChange={(e) => setIdCustom(e.target.value)}
          />
          <br />
          <label>Modifier le titre</label>
          <textarea
            name="title"
            id="title"
            defaultValue={pattern.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Modifier les tags (exemple : noël,chien,amigurumi)</label>
          <textarea
            name="tags"
            id="tags"
            defaultValue={pattern.tags}
            onChange={(e) => setTags(e.target.value.toLowerCase())}
          />
          <br />
          <label>Modifier la description</label>
          <textarea
            name="description"
            id="description"
            defaultValue={pattern.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Modifier le type</label>
          <select
            name="type"
            id="type"
            onChange={(e) => setType(e.target.value)}
          >
            {pattern.type === "Crochet" && (
              <option value="Crochet" selected>
                Crochet
              </option>
            )}
            {pattern.type !== "Crochet" && (
              <option value="Crochet">Crochet</option>
            )}

            {pattern.type === "Tricot" && (
              <option value="Tricot" selected>
                Tricot
              </option>
            )}
            {pattern.type !== "Tricot" && (
              <option value="Tricot">Tricot</option>
            )}

            {pattern.type === "Broderie" && (
              <option value="Broderie" selected>
                Broderie
              </option>
            )}
            {pattern.type !== "Broderie" && (
              <option value="Broderie">Broderie</option>
            )}

            {pattern.type === "Point De Croix" && (
              <option value="Point De Croix" selected>
                Point De Croix
              </option>
            )}
            {pattern.type !== "Point De Croix" && (
              <option value="Point De Croix">Point De Croix</option>
            )}

{pattern.type === "Couture" && (
              <option value="Couture" selected>
                Couture
              </option>
            )}
            {pattern.type !== "Couture" && (
              <option value="Couture">Point De Croix</option>
            )}

            {pattern.type === "Bracelet Brésilien" && (
              <option value="Bracelet Brésilien" selected>
                Bracelet Brésilien
              </option>
            )}
            {pattern.type !== "Bracelet Brésilien" && (
              <option value="Bracelet Brésilien">Bracelet Brésilien</option>
            )}
          </select>

          <br />

          <label>Modifier l'image et les fichiers</label>
          <div className="file">
            <img src="./images/icons/picture.svg" alt="patron" />
            <input
              type="file"
              id="picture"
              name="picture"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </div>
          <br />

          <div className="file">
            <img src="./images/icons/pdf.svg" alt="patron" />
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept=".pdf"
              onChange={(e) => handlePDF(e)}
            />
          </div>
          <br />

          <div className="file">
            <img src="./images/icons/doc.svg" alt="patron" />
            <input
              type="file"
              id="word"
              name="word"
              accept=".doc, .docx"
              onChange={(e) => handleWord(e)}
            />
          </div>
          <br />

          <div className="select-button">
            <label htmlFor="deleteWord" className="deleteWord">
              Supprimer le document Word
            </label>
            <input
              type="radio"
              id="deleteWord"
              name="deleteWord"
              value="yes"
              onChange={(e) => setDeleteWord(e.target.value)}
            />
          </div>
          <br />

          <div className="btn-send">
            <button className="cancel" onClick={handleCancel}>
              Annuler
            </button>

            <button className="send" onClick={handleUpdatePattern}>
              Modifier
            </button>
          </div>
          <DeleteCard pattern={pattern} />
        </div>
      )}
    </li>
  );
};

export default Card;
