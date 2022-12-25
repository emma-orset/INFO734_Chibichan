module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "Pseudo incorrect";
  }

  if (err.message.includes("email") || err.message.includes("not good email")) {
    errors.email = "Email incorrect";
  }

  if (err.message.includes("password") || err.message.includes("password inf 6")) {
    errors.password = "Le mot de passe doit faire 6 caractères minimum";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "Pseudo déjà utilisé";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "Email déjà utilisé";
  }
  

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("Incorrect password")) {
    errors.password = "Le mot de passe ne correspond pas";
  }

  if (err.message.includes("Incorrect email")) {
    errors.email = "Email inconnu";
  }

  return errors;
};

module.exports.addPatternErrors = (err) => {
  let errors = {
    idCustom: "",
    title: "",
    type: "",
    tags: "",
    file: "",
    error: "",
  };

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("idCustom")) {
    errors.idCustom = "idCustom déjà utilisé";
  }

  if (err.message.includes("idCustom")) {
    errors.idCustom = "idCustom incorrecte";
  }

  if (err.message.includes("title")) {
    errors.title = "Titre incorrecte";
  }

  if (err.message.includes("tags")) {
    errors.tags = "tag(s) incorrect(s)";
  }

  if (err.message.includes("type")) {
    errors.type = "Type incorrect";
  }

  if (err.message.includes("not good type")) {
    errors.type = "Type incorrect";
  }

  if (err.message.includes("miss arg"))
    errors.error =
      "Un argument requis est manquant (idCustom ? title ? type ? picture ? pdf ? tags ?";

  if (err.message.includes("tags required"))
    errors.tags = "Merci de mettre au moins un tag";

  if (err.message.includes("max size"))
    errors.file = "Un des fichiers est trop volumineux (>1Go)";

  if (err.message.includes("invalid file"))
    errors.file = "Un fichier n'est pas du bon type";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "", error: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 1Mo";

  if (err.message.includes("miss arg"))
    errors.error =
      "Un argument requis est manquant (idCustom ? title ? type ? picture ? pdf ? tags ?";

  return errors;
};
