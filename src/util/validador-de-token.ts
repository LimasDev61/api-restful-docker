import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../conexaoBd";

export async function validarToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const autenticar = req.headers.authorization;
  const token = autenticar?.startsWith("Bearer ")
    ? autenticar.split(" ")[1].trim()
    : null;

  if (!token || !(await tokenValido(token))) {
    res.status(401).json({ mensagem: "Falha na autenticação" });
    return;
  }

  next();
}

async function tokenValido(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET || "default-secret";
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    if (!decoded.id) return false;

    const query = "select id from usuarios where id = $1;";
    const { rowCount } = await pool.query(query, [decoded.id]);
    return (rowCount ?? 0) > 0;
  } catch (error) {
    return false;
  }
}
