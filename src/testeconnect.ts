import "dotenv/config";
import pool from "./conexaoBd";

const testarConexaoDB = async () => {
  console.log("Tentando conectar ao banco de dados...");

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Conexão ao banco de dados bem-sucedida:", result.rows);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } finally {
    console.log("Fechando a conexão com o banco...");
    pool.end();
  }
};

testarConexaoDB();
