import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPattern, getPatterns } from "../../actions/patternActions";
import { isEmpty } from "../Utils";

const AddPattern = () => {
  const member = useSelector((state) => state.memberReducer);
  const pattern = useSelector((state) => state.patternReducer);
  const dispatch = useDispatch()

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

  const handleAddPattern = async () => {
    if (idCustom && title && tags && type && pdfFile && pictureFile){
       const data = new FormData()
       data.append("idCustom", idCustom)
       data.append("title", title)
       data.append("tags", tags)
       data.append("type", type)
       data.append("description", description)
       if (pdfFile) data.append("pdf", pdfFile)
       if (pictureFile) data.append("picture", pictureFile)
       if (wordFile) data.append("word", wordFile)

       await dispatch(addPattern(data))
       handleCancelPattern()
       dispatch(getPatterns())

       
    }else {
        alert("Informations requises : idCustom, titre, tags, type, pdf, picture")
    }
  };

  const handleCancelPattern = () => {
    setIdCustom("");
    setTitle("");
    setTags("");
    setType("");
    setDescription("");
    setPicture("");
    setPDF("");
    setWord("");
    setpdfFile("");
    setWordFile("");
    setPictureFile("");
    setPDF(null)
    setWord(null)
    setPicture(null)
  };

  return (
    <div className="post-container">
      <div className="post-form">
        <textarea
          name="idCustom"
          id="idCustom"
          placeholder="Identifiant customisé"
          value={idCustom}
          onChange={(e) => setIdCustom(e.target.value)}
        />
        <br />
        <textarea
          name="title"
          id="title"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          name="tags"
          id="tags"
          placeholder="Tags (exemple : amigurumi,chien,noël)"
          value={tags}
          onChange={(e) => setTags(e.target.value.toLowerCase())}
        />
        <br />
        <textarea
          name="description"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
          {type === "" ? (
            <option value="" selected>
              --Type--
            </option>
          ) : (
            <option value="">--Type--</option>
          )}

          <option value="Crochet">Crochet</option>

          <option value="Tricot">Tricot</option>

          <option value="Broderie">Broderie</option>

          <option value="Point De Croix">Point De Croix</option>

          <option value="Couture">Couture</option>

          <option value="Bracelet Brésilien">Bracelet Brésilien</option>
        </select>

        <br/>



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

        <div className="btn-send">
          {idCustom || title || tags || type || description ? (
            <button className="cancel" onClick={handleCancelPattern}>
              Annuler
            </button>
          ) : null}

          <button className="send" onClick={handleAddPattern}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPattern;
