import { Request, Response } from "express";
import pool from "../conexaoBd";
import { criptografarSenha } from "../util/criptografar";
import bcrypt from "bcrypt";
import { gerarToken } from "../util/gerarToken";


export class UsuarioControl {
  private async usuarioExistente(email: string): Promise<boolean> {
    const query = "select * from usuarios where email = $1;";
    const { rowCount } = await pool.query(query, [email]);
    return rowCount !== 0;
  }

  
  private async criarUsuario(nome: string, email: string, senha: string) {
    const criptografar = await criptografarSenha(senha);
    const query = `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email;
    `;
    const { rows } = await pool.query(query, [nome, email, criptografar]);
    return rows[0];
  }

  private async buscarEmail(email: string) {
    const query = "select * from usuarios where email = $1;";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  public async cadastrar(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }

    try {
      if (await this.usuarioExistente(email)) {
        res.status(400).json({ mensagem: "E-mail já cadastrado" });
        return;
      }

      const usuario = await this.criarUsuario(nome, email, senha);
      res.status(201).json(usuario);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }

    try {
      const usuario = await this.buscarEmail(email);
      if (!usuario) {
        res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
        return;
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
        return;
      }

      const token = gerarToken(usuario.id);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }
}
