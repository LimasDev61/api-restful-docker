import { Request, Response } from "express";
import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";

export class DeletarResumo {
  async deletar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const usuarioId = (req as any).usuario.id;
    try {
      const query = `DELETE FROM resumos WHERE id = $1 AND usuario_id = $2`;
      const resultado = await pool.query<TResumo>(query, [id, usuarioId]);

      if (resultado.rowCount === 0) {
        res.status(404).json({ mensagem: "Resumo não encontrado" });
        return;
      }
      res.status(204).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Erro ao deletar resumo" });
    }
  }
}
