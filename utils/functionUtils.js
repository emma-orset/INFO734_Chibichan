const { uploadErrors } = require("../utils/errorsUtils");

module.exports.getDate = () => {
  const today = new Date(Date.now());
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${year}${month}${day}`;
};

module.exports.getDateSpe = function (date) {
  // Date de type : '01 Jan 1970 00:00:01'
  const today = new Date(Date.parse(date));
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

module.exports.verifPicture = function (file, res) {
  try {
    if (file.size > 1000000000) throw Error("max size");

    if (
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg"
    ) {
      throw Error("invalid file");
    }
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(500).json({ errors });
  }
};

module.exports.isEmpty = function (value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};