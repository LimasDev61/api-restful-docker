import { Request, Response, NextFunction } from "express";
import { TokenAuxiliar } from "../auxiliar/token-auxiliar";
import pool from "../conexaoBd";
import TUsuario from "../tipos/TUsuario";
import jwt from "jsonwebtoken";

const tokenAuxiliar = new TokenAuxiliar();

export async function validarToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();

    const token = authorization.split(" ")[1];
    const idUsuarioLogado = tokenAuxiliar.extrairId(token);

    const { rows } = await pool.query<TUsuario>(
      `SELECT * FROM usuarios WHERE id = $1`,
      [idUsuarioLogado]
    );

    if (!rows.length) throw new Error();

    (req as any).usuario = rows[0];

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ mensagem: "Token expirado" });
    }

    return res.status(401).json({ mensagem: "Falha na autenticação" });
  }
}
