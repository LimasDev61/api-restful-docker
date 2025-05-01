import { Request, Response } from "express";
import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";

export class ListarResumos {
  async listar(req: Request, res: Response): Promise<void> {
    const usuarioId = (req as any).usuario.id;
    const { materia } = req.query;

    try {
      let query = `
        SELECT 
          r.id, 
          r.usuario_id, 
          r.materia_id, 
          r.topicos, 
          r.descricao, 
          r.criado, 
          m.nome AS materia_nome
        FROM resumos r
        JOIN materias m ON r.materia_id = m.id
        WHERE r.usuario_id = $1
      `;
      const parametros: string[] = [usuarioId];

      if (materia) {
        query += ` AND m.nome ILIKE $2`;
        parametros.push(`%${materia}%`);
      }

      const { rows } = await pool.query<TResumo>(query, parametros);

      const resumosFormatados = rows.map((resumo) => ({
        id: resumo.id,
        usuarioId,
        materiaId: materia ? resumo.materiaId : undefined,
        materia: (resumo as any).materia_nome,
        titulo: resumo.descricao,
        topicos: resumo.topicos,
        descricao: resumo.descricao,
        criado: resumo.criado,
      }));

      res.status(200).json(resumosFormatados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar resumos" });
    }
  }
}
