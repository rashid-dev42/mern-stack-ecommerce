const crypto = require("crypto");

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return salt + key;
};

const verifyPassword = (userPassword, storedPassword) => {
  const storedSalt = storedPassword.slice(0, 32);
  const key = crypto.pbkdf2Sync(userPassword, storedSalt, 100000, 64, "sha512").toString("hex");
  const passwordData = storedSalt + key;

  if (passwordData === storedPassword) {
    return true;
  } else {
    return false;
  }
};

module.exports = { hashPassword, verifyPassword };