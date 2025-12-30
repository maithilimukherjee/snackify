import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../config/mailer.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generate2FACode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, food_pref } = req.body;

    if (!name || !email || !password || !food_pref) {
      return res.status(400).json({ message: "fields cannot be empty" });
    }

    const existing = await pool.query(
      "select id from users where email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const code = generate2FACode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      `insert into users 
      (id, name, email, password, food_pref, twofa_code, twofa_expiry) 
      values ($1,$2,$3,$4,$5,$6,$7)`,
      [id, name, email, hashed, food_pref, code, expiry]
    );

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "verify your 2fa",
      text: `your 2fa code is ${code}. it expires in 10 minutes.`,
    });

    console.log(
      "ethereal preview url:",
      nodemailer.getTestMessageUrl(info)
    );

    res.status(201).json({
      message: "verify your 2FA",
    });

  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ message: "server error" });
  }
};

/* ================= LOGIN (NO 2FA) ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const existing = await pool.query(
      "select * from users where email=$1",
      [email]
    );

    if (existing.rows.length === 0) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const user = existing.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.status(200).json({
      message: "login successful",
      token,
    });

  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ message: "server error" });
  }
};

/* ================= VERIFY 2FA ================= */
export const verify2FA = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "email and code required" });
    }

    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length === 0) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const user = existing.rows[0];

    if (user.twofa_code !== code) {
      return res.status(400).json({ message: "invalid 2fa code" });
    }

    if (new Date() > new Date(user.twofa_expiry)) {
      return res.status(400).json({ message: "2fa code expired" });
    }

    await pool.query(
      "UPDATE users SET twofa_code=NULL, twofa_expiry=NULL, is_verified=true WHERE id=$1",
      [user.id]
    );

    res.status(200).json({
      message: "verification successful"
    });
  } catch (error) {
    console.error("verify2FA error:", error);
    res.status(500).json({ message: "server error" });
  }
};

/* ================= AUTH MIDDLEWARE ================= */
export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
