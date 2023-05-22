const bcrypt = require("bcrypt");
require("dotenv").config();
const dbc = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { user_password: user_password } = req.body;
    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user_password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };

    const sql = "INSERT INTO user SET ?";
    const db = dbc.getDB();
    db.query(sql, user, (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email ou numéro de téléphone déjà enregistré" });
      } else {
        res.status(201).json({ message: "User created !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Failed registration", err });
  }
};

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { user_email, user_password: clearPassword } = req.body;

  const sql = `SELECT * FROM user WHERE user_email=?`;
  const db = dbc.getDB();
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err, data: req.body });
    }
    // ===== Verify password with hash in DB ======
    if (results[0]) {
      try {
        const { user_password: hashedPassword } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // remove the password key of the response
          delete results[0].password;
          res.status(200).json({
            user: results[0]
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (!results[0]) {
      res.status(200).json({
        error: true,
        message: "Mauvaise combinaison email / mot de passe"
      })
    }
  });
};