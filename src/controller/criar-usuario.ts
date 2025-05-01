import { Response, Request } from "express";
import pool from "../conexaoBd";
import { criptografarSenha } from "../util/criptografar-senha";
import TUsuario from "../tipos/TUsuario";

export class CriarUsuario {
  async criar(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }

    try {
      const emailExistente = await pool.query(
        `SELECT * FROM usuarios WHERE email = $1`,
        [email]
      );

      if (emailExistente.rows.length > 0) {
        res.status(400).json({
          mensagem: "E-mail já cadastrado",
        });
        return;
      }
      const senhaHash = await criptografarSenha(String(senha));
      const query = await pool.query<TUsuario>(
        `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email`,
        [nome, email, senhaHash]
      );

      const { id, nome: nomeUsuario, email: emailUsuario } = query.rows[0];

      res.status(201).json({
        id,
        nome: nomeUsuario,
        email: emailUsuario,
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensagem: "Erro ao cadastrar o usuário",
      });
    }
  }
}
