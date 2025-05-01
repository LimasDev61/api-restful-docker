import { Request, Response } from "express";
import pool from "../conexaoBd";
import bcrypt from "bcrypt";
import TUsuario from "../tipos/TUsuario";
import { gerarToken } from "../util/gerarToken";

export class LoginUsuario {
  async login(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }

    try {
      const query = await pool.query<TUsuario>(
        `SELECT * FROM usuarios WHERE email = $1`,
        [email]
      );

      if (!query.rows.length) {
        res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
        return;
      }

      const usuario = query.rows[0];

      const senhaCorreta = await bcrypt.compare(String(senha), usuario.senha);

      if (!senhaCorreta) {
        res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
        return;
      }

      const token = gerarToken(String(usuario.id));

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }
}
