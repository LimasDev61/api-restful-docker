import { Request, Response } from "express";
import { gerarDescricao } from "../util/gerar-descricao";
import pool from "../conexaoBd";

export class ResumoControl {
    private async buscarMateria(materiaId: number) {
      const query = "SELECT id, nome FROM materias WHERE id = $1";
      const { rows } = await pool.query(query, [materiaId]);
      return rows[0]; 
    }
  
    public async criarResumo(req: Request, res: Response): Promise<Response> {
      const { materiaId, titulo, topicos } = req.body;
      const usuarioId = req.query.usuario_id; // Obtendo o ID do usuário da validação do token.
  
      if (!materiaId || !titulo || !topicos) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
      }
  
      const materia = await this.buscarMateria(materiaId);
  
      if (!materia) {
        return res.status(404).json({ mensagem: "Matéria não encontrada" });
      }
  
      const tituloFinal = titulo || "Sem título";
      const topicosString = topicos.join(", ");
      
      let descricao = "";
      try {
        descricao = await gerarDescricao(topicosString);
      } catch (error) {
        console.error("Erro ao gerar descrição:", error);
        descricao = ""; // Caso ocorra erro ao gerar a descrição, deixamos vazio
      }
  
      const { rows } = await pool.query(
        `INSERT INTO resumos (materias_id, usuarios_id, titulo, topicos, descricao) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [materiaId, usuarioId, tituloFinal, topicosString, descricao]
      );
  
      const resumoCriado = rows[0];
  
      const resumoResponse = {
        id: resumoCriado.id,
        usuarioId: resumoCriado.usuarios_id,
        materiaId: resumoCriado.materias_id,
        titulo: resumoCriado.titulo,
        topicos: resumoCriado.topicos,
        descricao: resumoCriado.descricao,
        criado: resumoCriado.criado,
      };
  
      return res.status(201).json(resumoResponse);
    }
  }

