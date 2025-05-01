import { Request, Response } from "express";
import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";
import TMateria from "../tipos/TMateria";

export class CriarResumo {
  async criarResumo(req: Request, res: Response): Promise<void> {
    const { materiaId, titulo, topicos } = req.body;

    const usuarioId = (req as any).usuario.id;

    if (!materiaId || !topicos) {
      res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }
    try {
      const descricao = !titulo ? "Sem título" : titulo;

      const materia = await pool.query<TMateria>(
        `SELECT * FROM materias WHERE id = $1`,
        [materiaId]
      );

      if (materia.rows.length === 0) {
        res.status(404).json({ mensagem: "Matéria não encontrada" });
        return;
      }

      const topicosString = topicos.join(",");
      const query = `
        INSERT INTO resumos (usuario_id, materia_id, topicos, descricao) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, usuario_id, materia_id, topicos, descricao, criado
      `;

      const parametros = [usuarioId, materiaId, topicosString, descricao];
      const { rows } = await pool.query<TResumo>(query, parametros);

      const resumoCriado = rows[0];
      const topicosFormatados = (resumoCriado.topicos as string).split(",");

      res.status(201).json({
        id: resumoCriado.id,
        usuarioId,
        materiaId,
        titulo: descricao,
        topicos: topicosFormatados,
        descricao: resumoCriado.descricao,
        criado: resumoCriado.criado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro interno ao criar resumo" });
    }
  }
}
