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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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


    await pool.query(
      `insert into users 
      (id, name, email, password) 
      values ($1,$2,$3,$4)`,
      [id, name, email, hashed]
    );
    res.status(201).json({ message: "registration successful" });
  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ message: "server error" });
  }
};


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
  