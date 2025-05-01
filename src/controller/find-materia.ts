import { Request, Response } from "express";
import pool from "../conexaoBd";
import TMateria from "../tipos/TMateria";

export class FindMateria {
  async find(req: Request, res: Response): Promise<void> {
    try {
      const query = `SELECT id, nome FROM materias;`;
      const { rows } = await pool.query<TMateria>(query);

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar matérias" });
    }
  }
}
