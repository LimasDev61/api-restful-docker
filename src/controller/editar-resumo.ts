import { Request, Response } from "express";
import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";

export class EditarResumo {
  async editar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { materiaId, titulo } = req.body;
    const usuarioId = (req as any).usuario.id;

    if (!materiaId || !titulo) {
      res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      return;
    }

    try {
      const queryMateria = `SELECT id FROM materias WHERE id = $1;`;
      const materia = await pool.query<TResumo>(queryMateria, [materiaId]);

      if (!materia.rows.length) {
        res.status(404).json({ mensagem: "Matéria não encontrada" });
        return;
      }

      const queryResumo = `SELECT * FROM resumos WHERE id = $1 AND usuario_id = $2;`;
      const resumo = await pool.query<TResumo>(queryResumo, [id, usuarioId]);

      if (!resumo.rows.length) {
        res.status(404).json({ mensagem: "Resumo não encontrado" });
        return;
      }

      const resumosExistentes = resumo.rows[0];

      const queryUpdate = `
            UPDATE resumos
            SET materia_id = $1, descricao = $2
            WHERE id = $3 AND usuario_id = $4;
            `;

      await pool.query(queryUpdate, [materiaId, titulo, id, usuarioId]);

      const topicos = Array.isArray(resumosExistentes.topicos)
        ? resumosExistentes.topicos
        : resumosExistentes.topicos.split(",");

      res.status(200).json({
        id: resumosExistentes.id,
        usuarioId,
        materiaId,
        titulo,
        topicos,
        descricao: resumosExistentes.descricao,
        criado: resumosExistentes.criado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro ao editar resumo" });
    }
  }
}
