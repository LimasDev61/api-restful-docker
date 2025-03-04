import { Request, Response } from "express";
import pool from "../conexaoBd";

export class MateriasControl {
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const materias = await this.buscarMaterias();
      res.status(200).json(materias);
    } catch (error) {
      console.error("Erro ao listar matérias:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }

  private async buscarMaterias() {
    const query = "select id, nome from materias;";
    const { rows } = await pool.query(query);
    return rows;
  }
}
